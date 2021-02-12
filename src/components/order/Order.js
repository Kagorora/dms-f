import React, { useState, useEffect } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Button, Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../reusable/Message.js";
import {
  getOrderDetails,
  payOrder,
  markOrderAsDelivered,
} from "../../store/actions/orderActions.js";
import Loader from "../reusable/Loader.js";
import { ORDER_PAY_RESET } from "../../store/types/types";

const Order = ({ match }) => {
  const orderId = match.params.id;

  const [sdkReady, setSdkReady] = useState(false);

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

  const orderPay = useSelector((state) => state.orderPay);
  const { success: successPay, loading: loadingPay } = orderPay;

  const deliverOrder = useSelector((state) => state.deliverOrder);
  const {
    success: successDelivered,
    loading: loadingDelivered,
    error: errorDelivered,
  } = deliverOrder;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  if (!loading) {
    // Calculate prices
    const addDecimals = (num) => {
      return (Math.round(num * 100) / 100).toFixed(2);
    };

    order.itemsPrice = addDecimals(
      order.orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)
    );
  }

  useEffect(() => {
    if (successDelivered) {
      dispatch(getOrderDetails(orderId));
    }
  }, [successDelivered]);

  useEffect(() => {
    if (order && orderId !== order._id) {
      dispatch(getOrderDetails(orderId));
    } else {
      const addPayPalScript = async () => {
        const { data: clientId } = await axios.get("/api/config/paypal");
        const script = document.createElement("script");
        script.type = "text/javascript";
        script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
        script.async = true;
        script.onload = () => {
          setSdkReady(true);
        };
        document.body.appendChild(script);
      };

      if (!order || successPay) {
        dispatch({ type: ORDER_PAY_RESET });
        dispatch(getOrderDetails(orderId));
      } else if (!order.isPaid) {
        if (!window.paypal) {
          addPayPalScript();
        } else {
          setSdkReady(true);
        }
      }
    }
  }, [dispatch, orderId, successPay, order]);

  const successPaymentHandler = (paymentResult) => {
    dispatch(payOrder(orderId, paymentResult));
  };

  const deliverHandler = () => {
    dispatch(markOrderAsDelivered(orderId));
  };

  return loading ? (
    <Loader />
  ) : loadingDelivered ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
  ) : errorDelivered ? (
    <Message variant='danger'>{errorDelivered}</Message>
  ) : (
    <>
      <h1 className='mt-4'>Order: {order._id}</h1>
      <>
        <Row>
          <Col md={8}>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <h2>Destination</h2>
                <p>
                  <strong>Name: </strong>
                  {order.user.name}
                </p>
                <p>
                  <strong>Email: </strong>
                  <a href={`mailto:${order.user.email}`}>{order.user.email}</a>
                </p>
                <p>
                  <strong>Address: </strong>
                  {order.orderAddress.Province}, {order.orderAddress.District},{" "}
                  {order.orderAddress.Sector}, {order.orderAddress.cell},{" "}
                  {order.orderAddress.city}, {order.orderAddress.streetNumber}
                </p>
              </ListGroup.Item>

              {!order.isDelivered ? (
                <Message variant='danger'>Not Delivered</Message>
              ) : (
                <Message variant='success'>
                  delivered on {order.deliveredAt}
                </Message>
              )}

              <ListGroup.Item>
                <h2>Payment Method</h2>
                <p>
                  <strong>Method: </strong>
                  {order.paymentMethod}
                </p>
              </ListGroup.Item>

              {!order.isPaid ? (
                <Message variant='danger'>Not Paid</Message>
              ) : (
                <Message variant='success'>Paid on {order.paidAt}</Message>
              )}

              <ListGroup.Item>
                <h2>Order Items</h2>
                {order.orderItems.length === 0 ? (
                  <Message>Order is Empty</Message>
                ) : (
                  <ListGroup variant='flush'>
                    {order.orderItems.map((item, index) => (
                      <ListGroup.Item key={index}>
                        <Row>
                          <Col md={1}>
                            <Image
                              src={item.image}
                              alt={item.name}
                              fluid
                              rounded
                            />
                          </Col>
                          <Col>
                            <Link to={`/product/${item.product}`}>
                              {item.name}
                            </Link>
                          </Col>
                          <Col md={4}>
                            {item.qty} * {item.price} = FRW
                            {item.qty * item.price}
                          </Col>
                        </Row>
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </ListGroup.Item>
            </ListGroup>
          </Col>

          <Col md={4} className='justify-content-center ml-0.5 mt-5'>
            <Card>
              <ListGroup variant='flush'>
                <ListGroup.Item>
                  <h2>Order Summary</h2>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Items</Col>
                    <Col>FRW {order.itemsPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Transport</Col>
                    <Col>FRW {order.deliveryPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Tax</Col>
                    <Col>FRW {order.taxPrice}</Col>
                  </Row>
                </ListGroup.Item>
                <ListGroup.Item>
                  <Row>
                    <Col>Total Amount</Col>
                    <Col>FRW {order.totalPrice}</Col>
                  </Row>
                </ListGroup.Item>
                {!order.isPaid && (
                  <ListGroup.Item>
                    {loadingPay && <Loader />}
                    {!sdkReady ? (
                      <Loader />
                    ) : (
                      <PayPalButton
                        amount={order.totalPrice}
                        onSuccess={successPaymentHandler}
                      />
                    )}
                  </ListGroup.Item>
                )}
                {!successDelivered &&
                  userInfo &&
                  userInfo.userType === "admin" && (
                    <ListGroup.Item>
                      <Button
                        type='button'
                        className='btn btn-block rounded'
                        onClick={deliverHandler}
                      >
                        Mark as Delivered
                      </Button>
                    </ListGroup.Item>
                  )}
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    </>
  );
};

export default Order;

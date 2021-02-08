import React, { useEffect } from "react";
import { Button, Col, Row, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import Message from "../reusable/Message.js";
import { getOrderDetails } from "../../store/actions/orderActions.js";
import Loader from "../reusable/Loader.js";

const Order = ({ match }) => {
  const orderId = match.params.id;

  const dispatch = useDispatch();

  const orderDetails = useSelector((state) => state.orderDetails);
  const { order, loading, error } = orderDetails;

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
    dispatch(getOrderDetails(orderId));
  }, [dispatch, orderId]);

  return loading ? (
    <Loader />
  ) : error ? (
    <Message variant='danger'>{error}</Message>
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
                <Message variant='success'>Delivered</Message>
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
                <Message variant='success'>Paid</Message>
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
              </ListGroup>
            </Card>
          </Col>
        </Row>
      </>
    </>
  );
};

export default Order;

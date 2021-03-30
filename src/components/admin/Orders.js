import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../reusable/Message.js";
import Loader from "../reusable/Loader.js";
import { listOrders, filterOrdersByDate } from "../../store/actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";

const Orders = ({ history }) => {

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [list, setList] = useState([]);

  const dispatch = useDispatch();

  const adminOrder = useSelector((state) => state.adminOrder);
  const { loading, error, orders } = adminOrder;




  const orderFilterByDate = useSelector((state) => state.orderFilterByDate);
  const { orders: filteredOrders, loading: filterLoader }  = orderFilterByDate;

  useEffect(() => {
    if(orders){
      setList(orders);
    }
  }, [orders]);

  const userLogin = useSelector((state) => state.userLogin);

  let { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.userType === "admin") {
      dispatch(listOrders());
    } else {
      history.push("/login");
    }
  }, [dispatch, history, userInfo]);

  const submitHandler = (e) => {
    e.preventDefault();
    if(fromDate && toDate){
      dispatch(filterOrdersByDate(fromDate, toDate));
    }
  }

  useEffect(() => {
    if(filteredOrders){
      setList(filteredOrders);
    }
  }, [filteredOrders])


  return (
    <div className='justify-content-center'>
      <Row>
        <Col>
          <h2>All Orders</h2>

          <Form onSubmit={submitHandler} className="mt-3 mb-3">
            <Row>
              <Col md={4}>
                <Form.Group controlId='fromDate'>
                  <Form.Label>From</Form.Label>
                  <Form.Control type='date' value={fromDate} onChange={(e) => setFromDate(e.target.value)}>
                  </Form.Control>
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group controlId='toDate'>
                  <Form.Label>To</Form.Label>
                  <Form.Control type='date' value={toDate} onChange={(e) => setToDate(e.target.value)}></Form.Control>
                </Form.Group>
              </Col>
              <Col md={4}>
                <Button type='submit' variant='primary' className='btn-block mb-0 mt-4 rounded'>
                  Search
          </Button>
              </Col>
            </Row>

          </Form>

          {loading || filterLoader ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table stripped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>User</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {
                 list.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
                    <td>
                      <p>{order.user.name}</p>
                    </td>
                    <td>
                      <p>
                        {order.paidAt ? order.paidAt.substring(0, 10) : "N/A"}
                      </p>
                    </td>
                    <td>FRW {order.totalPrice}</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times fa-fw'
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className='fas fa-times fa-fw'
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant='light' className='btn-sm'>
                          Details
                        </Button>
                      </LinkContainer>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Orders;

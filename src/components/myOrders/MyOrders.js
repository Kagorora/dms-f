import React, { useEffect } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../reusable/Message.js";
import Loader from "../reusable/Loader.js";
import { listMyOrders } from "../../store/actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";
import { ExportCSV } from "../admin/exportCvs.js";

const MyOrders = ({ history }) => {
  const dispatch = useDispatch();

  const orderMyList = useSelector((state) => state.orderMyList);
  const { loading: loadingOrders, error: errorOrders, orders } = orderMyList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

  useEffect(() => {
    dispatch(listMyOrders());
  }, [dispatch]);

  return (
    <div className='justify-content-center'>
      <Row>
        <Col>
          <h2>Products</h2>
          {loadingOrders ? (
            <Loader />
          ) : errorOrders ? (
            <Message variant='danger'>{errorOrders}</Message>
          ) : (
            <Table stripped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Date</th>
                  <th>Total</th>
                  <th>Paid</th>
                  <th>Delivered</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order._id}>
                    <td>{order._id}</td>
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
            {orders && orders.length > 0 ? (
              <ExportCSV csvData={orders} fileName={"Report"} />
            ) : (
              ""
            )}
    </div>
  );
};

export default MyOrders;

import React, { useEffect, useState } from "react";
import { Button, Row, Col, Table, Form, FormGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../reusable/Message.js";
import Loader from "../reusable/Loader.js";
import { listOrders, filterOrdersByDate, filterOrdersPaymentMethod, filterOrdersIsPaid, filterOrdersProvince } from "../../store/actions/orderActions";
import { LinkContainer } from "react-router-bootstrap";
import { ExportCSV } from "./exportCvs";
import Logo from "../../assets/images/mainlogo.png";


const printOrdersReport = (title) => {
  var myWindow = window.open("", "PRINT", "height=1000,width=1500");
  // Prepare the document body
  // Hacks hacks hacks
  document.getElementById("table-orders-form").hidden = true;
  document.getElementById("table-title").hidden = true;
  document.getElementById("details-col-header").hidden = true;
  document.getElementsByClassName("navbar")[0].hidden = true;
  document.getElementById("footer-element").hidden = true;
  Array.from(document.getElementsByClassName("details-row-item")).forEach(
    (element) => { element.hidden = true; }
  );
  myWindow.document.head.innerHTML = document.head.innerHTML;
  myWindow.document.body.innerHTML = `
  <div style="margin-left:45px;">
    <h3 style="text-align: center;">Trust Plus Company LTD</h3>
    <img src=${Logo} alt="logo" style="height:80px; width: 160px; margin-bottom:20px"/>
    <ul style="list-style: none">
    <li>Trust Plus Company LTD</li>
    <li>Tel: 0785832353</li>
    <li>Email: trustplus@gmail.com</li>
    </ul>
    <h1 style="text-align: center; text-decoration: underline;"> ${title || "Retrieved Orders Report"}</h1>
    <div>
      <h4>From: ${document.getElementById("from-date").value || "oldest"}</h4>
      <h4>To: ${document.getElementById("to-date").value ||
    new Date().toISOString().split("T").join(" ").slice(0, -5)
    }</h4>
    </div>
  </div>
  ${document.body.innerHTML}
  <div style="margin-left:45px;">
  <h4>Date retrieved: ${new Date().toISOString().split("T").join(" ").slice(0, -5)}  Location: .......................</h4>
  <h4>Approved By: ....................................</h4>
  <h4>Signature & Stamp:....................................</h4>
  </div>
  
  `;
  // myWindow.document.body.getElementById("") = document.getElementById("orders-table").innerHTML;

  myWindow.document.close(); // necessary for IE >= 10
  myWindow.focus(); // necessary for IE >= 10*/

  myWindow.print();
  document.getElementById("table-orders-form").hidden = false;
  document.getElementById("table-title").hidden = false;
  document.getElementsByClassName("navbar")[0].hidden = false;
  document.getElementById("details-col-header").hidden = false;
  document.getElementById("footer-element").hidden = false;
  Array.from(document.getElementsByClassName("details-row-item")).forEach(
    (element) => {
      element.hidden = false;
    }
  );
  // alert("Close popup window")
  // myWindow.close();
  return true;
};

const Orders = ({ history }) => {

  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const [paymentMethod, setPaymentMethod] = useState('');

  const [list, setList] = useState([]);

  const [isPaid, setIsPaid] = useState(Boolean);
  const [isWeeklyReportLoaded, setIsWeeklyReportLoaded] = useState(Boolean);

  const [Province, setProvince] = useState('');

  const dispatch = useDispatch();

  const adminOrder = useSelector((state) => state.adminOrder);
  const { loading, error, orders } = adminOrder;


  const orderFilterByDate = useSelector((state) => state.orderFilterByDate);
  const { orders: filteredOrders, loading: filterLoader } = orderFilterByDate;

  const orderFilterByPaymentMethod = useSelector((state) => state.orderFilterByPaymentMethod);
  const { orders: OrdersfilteredByPaymentMethod } = orderFilterByPaymentMethod;

  const orderFilterByIsPaid = useSelector((state) => state.orderFilterByIsPaid);
  const { orders: OrdersfilteredByIsPaid } = orderFilterByIsPaid;

  const orderFilterByProvince = useSelector((state) => state.orderFilterByProvince);
  const { orders: OrdersfilteredByProvince } = orderFilterByProvince;

  const addDecimals = (num) => {
    return (Math.round(num * 100) / 100).toFixed(2);
  };

  useEffect(() => {
    if (orders) {
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
    if (fromDate && toDate) {
      dispatch(filterOrdersByDate(fromDate, toDate));
    }
  }

  useEffect(() => {
    if (filteredOrders) {
      setList(filteredOrders);
    }
  }, [filteredOrders])

  useEffect(() => {
    dispatch(filterOrdersPaymentMethod(paymentMethod))
  }, [paymentMethod])

  useEffect(() => {
    if (OrdersfilteredByPaymentMethod) {
      setList(OrdersfilteredByPaymentMethod)
    }
  }, [OrdersfilteredByPaymentMethod])

  useEffect(() => {
    if (isPaid) {
      dispatch(filterOrdersIsPaid(isPaid))
    }
  }, [isPaid])

  useEffect(() => {
    if (OrdersfilteredByIsPaid) {
      setList(OrdersfilteredByIsPaid)
    }
  }, [OrdersfilteredByIsPaid])

  useEffect(() => {
    if (Province) {
      dispatch(filterOrdersProvince(Province))
    }
  }, [Province])


  useEffect(() => {
    if (OrdersfilteredByProvince) {
      setList(OrdersfilteredByProvince)
    }
  }, [OrdersfilteredByProvince])


  return (
    <div className="justify-content-center">
      <Row>
        <Col>
          <h2 id="table-title">All Orders</h2>

          <Form
            id="table-orders-form"
            onSubmit={submitHandler}
            className="mt-3 mb-3"
          >
     
            <Row>
   
              <Col md={2}>
                <FormGroup controlId="toDate">
                  <Form.Label>Payment Method</Form.Label>
                  <Form.Control
                    as="select"
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  >
                    <option>LOAN</option>
                    <option>PayPal</option>
                  </Form.Control>
                </FormGroup>
              </Col>

              <Col md={2}>
                <FormGroup controlId="toDate">
                  <Form.Label>Paid Orders</Form.Label>
                  <Form.Control
                    as="select"
                    value={isPaid}
                    onChange={(e) => setIsPaid(e.target.value)}
                  >
                    <option value="true">Paid</option>
                    <option value="false">Not Paid</option>
                  </Form.Control>
                </FormGroup>
              </Col>

              <Col md={2}>
                <FormGroup controlId="toDate">
                  <Form.Label>Province</Form.Label>
                  <Form.Control
                    as="select"
                    value={Province}
                    onChange={(e) => setProvince(e.target.value)}
                  >
                    <option>Kigali</option>
                    <option>North</option>
                    <option>East</option>
                    <option>West</option>
                    <option>South</option>
                  </Form.Control>
                </FormGroup>
              </Col>
 
              <Col md={2}>
                <Form.Group controlId="fromDate">
                  <Form.Label>From</Form.Label>
                  <Form.Control
                    id="from-date"
                    type="date"
                    value={fromDate}
                    onChange={(e) => setFromDate(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>

              <Col md={2}>
                <Form.Group controlId="toDate">
                  <Form.Label>To</Form.Label>
                  <Form.Control
                    id="to-date"
                    type="date"
                    value={toDate}
                    onChange={(e) => setToDate(e.target.value)}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={2}>
                <Button
                  type="submit"
                  variant="primary"
                  className="btn mb-0 mt-4 rounded"
                  style={{ backgroundColor: "#44bb86", color: "#ffffff", textAlign: "center" }}
                >
                  Search
                </Button>
              </Col>

            </Row>

            <Row>
              <Col>
                <FormGroup controlId="toDate">
                  {list && list.length > 0 ? (
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      {/* <ExportCSV csvData={list} fileName={"Report"} /> */}
                      <Button onClick={() => printOrdersReport()} className="rounded">
                        Print report
                      </Button>
                      <Button
                        onClick={() => {
                          var todayTs = Date.now();
                          var lastWeekAgoDayTs =
                            todayTs - 7 * 24 * 60 * 60 * 1000;
                          setFromDate(
                            new Date(lastWeekAgoDayTs)
                              .toISOString()
                              .split("T")[0]
                          );
                          setToDate(
                            new Date(todayTs).toISOString().split("T")[0]
                          );
                          submitHandler(new Event("click"));
                          // It's a hack :)
                          setTimeout(() => setIsWeeklyReportLoaded(true), 3000);
                        }}
                        className="rounded"
                      >
                        Retrieve weekly report
                      </Button>
                      {isWeeklyReportLoaded ? (
                        <Button
                          onClick={() => {
                            printOrdersReport("Weekly Orders Report");
                          }}
                          className="rounded"
                        >
                          Print weekly report
                        </Button>
                      ) : null}
                    </div>
                  ) : (
                    ""
                  )}
                </FormGroup>
              </Col>
            </Row>
          </Form>

          {loading || filterLoader ? (
            <Loader />
          ) : error ? (
            <Message variant="danger">{error}</Message>
          ) : (
            <Table
              stripped
              bordered
              hover
              responsive
              className="table-sm"
              id="orders-table"
            >
              <thead style={{ backgroundColor: "#44bb86", color: "#ffffff", textAlign: "center" }}>
                <tr>
                  <th>Payment Method</th>
                  <th>User</th>
                  <th>Total</th>
                  <th>Payment Date</th>
                  <th>Delivered Date</th>
                  <th>Products</th>
                  <th id="details-col-header"></th>
                </tr>
              </thead>
              <tbody style={{ textAlign: "center" }}>
                {list.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <p>{order.paymentMethod}</p>
                    </td>
                    <td>
                      <p>{order.user.name}</p>
                    </td>
                    <td>{new Intl.NumberFormat().format(order.totalPrice)} {'   '} FRW</td>
                    <td>
                      {order.isPaid ? (
                        order.paidAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times fa-fw"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.isDelivered ? (
                        order.deliveredAt.substring(0, 10)
                      ) : (
                        <i
                          className="fas fa-times fa-fw"
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      {order.orderItems.length > 1
                        ? order.orderItems.reduce((prevValue, orderItem) =>
                          prevValue.name
                              ? prevValue.name.length > 13 ? prevValue.name.substr(0, 13) : prevValue.name
                              : prevValue.length > 13 ? prevValue.substr(0, 13) : prevValue + "--" + orderItem.name.length > 13 ? orderItem.name.substr(0, 13) : orderItem.name
                          )
                        : order.orderItems.length == 1
                          ? order.orderItems[0].name.length > 13 ? order.orderItems[0].name.substr(0, 13) : order.orderItems[0].name
                          : "N/A"}
                    </td>
                    <td className="details-row-item">
                      <LinkContainer to={`/order/${order._id}`}>
                        <Button variant="dark" className="btn-sm rounded">
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

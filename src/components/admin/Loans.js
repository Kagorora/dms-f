import React, { useEffect, history, useState } from 'react';
import { Button, Row, Col, Table, Form, FormGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../reusable/Message.js";
import Loader from "../reusable/Loader.js";
import { getAllLoan, loanApprovers, filterByLoanStatus } from "../../store/actions/orderActions.js";

const Loans = ({ history }) => {

  const [orderId, setOrderId] = useState('');

  const [loanStatus, setLoanStatus] = useState('');

  const [ordersAndLoans, setOrdersAndLoans] = useState([]);

  const dispatch = useDispatch();

  const getAllLoans = useSelector((state) => state.getAllLoans);
  const { loans, loading, error } = getAllLoans;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const approveLoans = useSelector((state) => state.ApproveLoan);
  const { orders: approvedLoans, loading: approvedLoansLoading, error: approvedLoansError, success } = approveLoans;

  const orderFilterByLoanStatus = useSelector((state) => state.orderFilterByLoanStatus);
  const { orders: orderFilterByLoanStatusLoans, loading: orderFilterByLoanStatusLoansLoading, error: orderFilterByLoanStatusLoansError, success: orderFilterByLoanStatusLoanSuccess } = orderFilterByLoanStatus;

  useEffect(() => {
    if (userInfo && userInfo.userType === "admin" || success) {
      dispatch(getAllLoan());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, success]);

  const handleApprove = () => {
    if (orderId) {
      dispatch(loanApprovers(orderId))
    }
  }


  useEffect(() => {
    if (approvedLoans) {
      dispatch(getAllLoan());
    }
  }, [approvedLoans])

  useEffect(() => {
    if(loanStatus.length > 1) {
      dispatch(filterByLoanStatus(loanStatus));
    }
  }, [loanStatus, dispatch])

  useEffect(() => {
    if(orderFilterByLoanStatusLoans && orderFilterByLoanStatusLoans.length > 0){
      setOrdersAndLoans(orderFilterByLoanStatusLoans);
    } else {
      setOrdersAndLoans(loans);
    }
    
  }, [orderFilterByLoanStatusLoans, loans])

  return (
    <div className='justify-content-center'>
      <Row>
        <Col>
          <h2 className="my-4">Loans</h2>

          <Form>
            <Row md={12}>
              <Col >
                <FormGroup style={{
                  float: "right",
                  marginTop: "10px",
                  marginLeft: "5px",
                }}>
                  <Form.Control
                    as="select"
                    value={loanStatus}
                    onChange={(e) => setLoanStatus(e.target.value)}
                  >
                    <option default>Select Status</option>
                    <option value="true">Approved</option>
                    <option value="false">Pending</option>
                  </Form.Control>
                </FormGroup>
              </Col>
            </Row>
          </Form>

          <Table striped bordered hover responsive className='table-sm'>
            <thead className="rounded" style={{ backgroundColor: "#44bb86", color: "#ffffff", textAlign: "center" }}>
              <tr>
                <th>Email</th>
                <th>Items</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Requested Date</th>
                <th></th>
              </tr>
            </thead>
            <tbody className="justify-content-center">
              {ordersAndLoans && ordersAndLoans.map((loan) => (
                <tr key={loan._id}>
                  <td>{loan.user.email ? loan.user.email : 'N/A'}</td>
                  <td>
                    {loan.orderItems.length > 1
                      ? loan.orderItems.reduce((prevValue, orderItem) =>
                        prevValue.name
                          ? prevValue.name.length > 13 ? prevValue.name.substr(0, 13) : prevValue.name
                          : prevValue.length > 13 ? prevValue.substr(0, 13) : prevValue + "--" + orderItem.name.length > 13 ? orderItem.name.substr(0, 13) : orderItem.name
                      )
                      : loan.orderItems.length == 1
                        ? loan.orderItems[0].name.length > 13 ? loan.orderItems[0].name.substr(0, 13) : loan.orderItems[0].name
                        : "N/A"}
                  </td>
                  <td>{loan.totalPrice ? loan.totalPrice : 'N/A'} FRW</td>
                  <td>{loan.isLoanApproved ? <p className="loan-approved-approved">Approved</p> : <p className="loan-approved-pending">Pending</p>}</td>
                  <td>{loan.createdAt.substring(0, 10) ? loan.createdAt.substring(0, 10) : 'N/A'}</td>
                  <td>
                    {
                      !loan.isLoanApproved && (

                        <button
                          className="approve-btn"
                          onClick={() => {
                            setOrderId(loan._id);
                            handleApprove()
                          }}
                          style={{ backgroundColor: "#44bb86", color: "#ffffff", textAlign: "center" }}
                        >
                          Approve
                        </button>

                      )
                    }
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          {/* )} */}
        </Col>
      </Row>
    </div>
  )
}

export default Loans;
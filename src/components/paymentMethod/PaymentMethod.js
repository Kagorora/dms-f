import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../reusable/FormContainer.js";
import { savePaymentMethod } from "../../store/actions/cartsActions";
import CheckoutSteps from "../reusable/CheckoutSteps/CheckoutSteps.js";

const Payment = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  if (!shippingAddress) {
    history.push("/shipping");
  }

  const dispatch = useDispatch();

  const [paymentMethod, setPaymentMethod] = useState("PayPal");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(paymentMethod);
    dispatch(savePaymentMethod({ paymentMethod }));
    history.push("/placeorders");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 step3 />
      <h1>Payment Method</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label as='legend'> Select Payment Method </Form.Label>

          <Col>
            <Form.Check
              type='radio'
              label='PayPal'
              name='paymentMethod'
              value='PayPal'
              id='PayPal'
              checked
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
          <Col>
            <Form.Check
              type='radio'
              label='MOMO'
              name='paymentMethod'
              value='MOMO'
              id='MOMO'
              onChange={(e) => setPaymentMethod(e.target.value)}
            ></Form.Check>
          </Col>
        </Form.Group>
        <Button variant='primary' type='Submit'>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Payment;

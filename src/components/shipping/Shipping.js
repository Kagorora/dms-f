import React, { useState } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../reusable/FormContainer.js";
import { saveShippingAddress } from "../../store/actions/cartsActions";
import CheckoutSteps from "../reusable/CheckoutSteps/CheckoutSteps.js";

const Shipping = ({ history }) => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;

  const dispatch = useDispatch();

  const [Province, setProvince] = useState(shippingAddress.Province);
  const [District, setDistrict] = useState(shippingAddress.District);
  const [Sector, setSector] = useState(shippingAddress.Sector);
  const [cell, setCell] = useState(shippingAddress.cell);
  const [city, setCity] = useState(shippingAddress.city);
  const [streetNumber, setStreetNumber] = useState(
    shippingAddress.streetNumber
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        Province,
        District,
        Sector,
        cell,
        city,
        streetNumber,
      })
    );
    history.push("/payment");
  };

  return (
    <FormContainer>
      <CheckoutSteps step1 step2 />
      <h1>Destination</h1>
      <Form onSubmit={handleSubmit}>
        <FormGroup>
          <Form.Label>Province</Form.Label>
          <Form.Control
            onChange={(e) => setProvince(e.target.value)}
            value={Province}
            placeholder='enter Province'
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>District</Form.Label>
          <Form.Control
            onChange={(e) => setDistrict(e.target.value)}
            value={District}
            placeholder='enter District'
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>Sector</Form.Label>
          <Form.Control
            onChange={(e) => setSector(e.target.value)}
            value={Sector}
            placeholder='enter Sector'
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>Cell</Form.Label>
          <Form.Control
            onChange={(e) => setCell(e.target.value)}
            value={cell}
            placeholder='enter Cell'
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>Village</Form.Label>
          <Form.Control
            onChange={(e) => setCity(e.target.value)}
            value={city}
            placeholder='enter Village'
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>StreetNumber</Form.Label>
          <Form.Control
            onChange={(e) => setStreetNumber(e.target.value)}
            value={streetNumber}
            placeholder='enter StreetNumber'
          ></Form.Control>
        </FormGroup>
        <Button variant='primary' type='Submit'>
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;

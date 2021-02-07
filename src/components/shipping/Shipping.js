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

  const [province, setProvince] = useState(shippingAddress.province);
  const [district, setDistrict] = useState(shippingAddress.district);
  const [sector, setSector] = useState(shippingAddress.sector);
  const [cell, setCell] = useState(shippingAddress.cell);
  const [village, setVillage] = useState(shippingAddress.village);
  const [streetNumber, setStreetNumber] = useState(
    shippingAddress.streetNumber
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      saveShippingAddress({
        province,
        district,
        sector,
        cell,
        village,
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
            value={province}
            placeholder='enter Province'
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>District</Form.Label>
          <Form.Control
            onChange={(e) => setDistrict(e.target.value)}
            value={district}
            placeholder='enter District'
          ></Form.Control>
        </FormGroup>
        <FormGroup>
          <Form.Label>Sector</Form.Label>
          <Form.Control
            onChange={(e) => setSector(e.target.value)}
            value={sector}
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
            onChange={(e) => setVillage(e.target.value)}
            value={village}
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

import React, { useState, useEffect } from "react";
import { Form, Button, FormGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../reusable/FormContainer.js";
import { saveShippingAddress } from "../../store/actions/cartsActions";
import CheckoutSteps from "../reusable/CheckoutSteps/CheckoutSteps.js";

const { Provinces, Districts, Sectors, Cells, Villages } = require("rwanda");

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

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    }
  }, [userInfo, history]);

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
            as='select'
            onChange={(e) => setProvince(e.target.value)}
            value={Province}
          >
            {Provinces().map((province) => (
              <option key={province} value={province}>
                {province}
              </option>
            ))}
          </Form.Control>
        </FormGroup>

        <FormGroup>
          <Form.Label>District</Form.Label>
          <Form.Control
            as='select'
            onChange={(e) => setDistrict(e.target.value)}
            value={District}
          >
            {Province && Districts(`${Province}`).map((district) => (
              <option key={district} value={district}>
                {district}
              </option>
            ))}
          </Form.Control>
        </FormGroup>

        <FormGroup>
          <Form.Label>Sector</Form.Label>
          <Form.Control
            as='select'
            onChange={(e) => setSector(e.target.value)}
            value={Sector}
          >
            {District && Sectors(`${Province}`,`${District}`).map((sector) => (
              <option key={sector} value={sector}>
                {sector}
              </option>
            ))}
          </Form.Control>
        </FormGroup>

        <FormGroup>
          <Form.Label>Cell</Form.Label>
          <Form.Control
            as='select'
            onChange={(e) => setCell(e.target.value)}
            value={cell}
          >
            {Sector && Cells(`${Province}`,`${District}`, `${Sector}`).map((cell) => (
              <option key={cell} value={cell}>
                {cell}
              </option>
            ))}
          </Form.Control>
        </FormGroup>

        <FormGroup>
          <Form.Label>Villages</Form.Label>
          <Form.Control
            as='select'
            onChange={(e) => setCity(e.target.value)}
            value={city}
          >
            {cell && Villages(`${Province}`,`${District}`, `${Sector}`, `${cell}`).map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </Form.Control>
        </FormGroup>

      
        <FormGroup>
          <Form.Label>StreetNumber</Form.Label>
          <Form.Control
            onChange={(e) => setStreetNumber(e.target.value)}
            value={streetNumber}
            placeholder='enter StreetNumber'
          ></Form.Control>
        </FormGroup>
        <Button
          variant='primary'
          type='Submit'
          className='btn btn-block rounded'
        >
          Submit
        </Button>
      </Form>
    </FormContainer>
  );
};

export default Shipping;

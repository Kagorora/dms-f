import React, { useEffect, useState } from "react";
import { FormGroup, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {
  getUserProfile,
  UpdateUserProfile,
} from "../../store/actions/usersActions.js";
import Message from "../reusable/Message.js";
import Loader from "../reusable/Loader.js";
import FormContainer from '../reusable/FormContainer.js';

const Profile = ({ history }) => {
  const dispatch = new useDispatch();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [address, setAddress] = useState("");
  const [userType, setUserType] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const userProfile = useSelector((state) => state.userProfile);
  const { user, loading, error } = userProfile;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const userProfileReset = useSelector((state) => state.userProfileReset);
  const { success } = userProfileReset;

  useEffect(() => {
    if (!userInfo) {
      history.push("/login");
    } else {
      if (!user.name) {
        dispatch(getUserProfile("profile"));
      } else {
        setName(user.name);
        setPhoneNumber(user.phoneNumber);
        setNationalId(user.nationalId);
        setEmail(user.email);
        setAddress(user.address);
        setUserType(user.userType);
        setMessage(user.message);
      }
    }
  }, [dispatch, history, userInfo, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password && confirmPassword && password !== confirmPassword) {
      setMessage("passwords are not matching!, try again");
    } else {
      dispatch(
        UpdateUserProfile({
          id: user._id,
          name,
          phoneNumber,
          nationalId,
          email,
          address,
          userType,
        })
      );
    }
  };

  return (
    <FormContainer>
      {/* <Col md={8}> */}
        <h2>User Profile</h2>
        {loading && <Loader />}
        {error && <Message variant='danger'>{error}</Message>}
        {success && <Message variant='success'>{"Profile Updated"}</Message>}
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='enter name'
            ></Form.Control>
          </FormGroup>
          <FormGroup>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              onChange={(e) => setPhoneNumber(e.target.value)}
              value={phoneNumber}
              placeholder='enter Phone Number'
            ></Form.Control>
          </FormGroup>
          <FormGroup>
            <Form.Label>nationalId</Form.Label>
            <Form.Control
              onChange={(e) => setNationalId(e.target.value)}
              value={nationalId}
              placeholder='enter NationalId'
            ></Form.Control>
          </FormGroup>
          <FormGroup>
            <Form.Label>email</Form.Label>
            <Form.Control
              type='email'
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              placeholder='enter email'
            ></Form.Control>
          </FormGroup>

          <FormGroup>
            <Form.Label>location</Form.Label>
            <Form.Control
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              placeholder='enter Location'
            ></Form.Control>
          </FormGroup>

          <FormGroup>
            <Form.Label>user Type</Form.Label>
            <Form.Control
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              disabled='disabled'
            ></Form.Control>
          </FormGroup>
          <FormGroup>
            <Form.Label>password</Form.Label>
            <Form.Control
              type='password'
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              placeholder='enter password'
            ></Form.Control>
          </FormGroup>
          <FormGroup>
            <Form.Label>comfirm password</Form.Label>
            <Form.Control
              type='password'
              onChange={(e) => setConfirmPassword(e.target.value)}
              value={confirmPassword}
              placeholder='confirm password'
            ></Form.Control>
          </FormGroup>
          <Button type='submit' variant='primary' className='btn-block rounded'>
            Update
          </Button>
        </Form>
      {/* </Col> */}
    </FormContainer>
  );
};

export default Profile;

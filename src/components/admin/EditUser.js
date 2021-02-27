import React, { useEffect, useState } from "react";
import { FormGroup, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../reusable/FormContainer.js";
import { getUserProfile, editUser } from "../../store/actions/usersActions.js";
import {
  ADMIN_UPDATE_USER_RESET,
  USER_PROFILE_RESET,
} from "../../store/types/types.js";
import Message from "../reusable/Message.js";
import Loader from "../reusable/Loader.js";

const EditUserInfo = ({ match, history }) => {
  const userId = match.params.id;

  const dispatch = new useDispatch();

  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [nationalId, setNationalId] = useState("");
  const [location, setLocation] = useState("");
  const [userType, setUserType] = useState("");
  const [message] = useState("");

  const userProfile = useSelector((state) => state.userProfile);
  const { loading, error, user } = userProfile;

  const updateUser = useSelector((state) => state.updateUser);
  const { success: successUpdate } = updateUser;

  useEffect(() => {
    if (!user.name || user._id !== userId) {
      dispatch(getUserProfile(userId));
    } else {
      setName(user.name);
      setPhoneNumber(user.phoneNumber);
      setNationalId(user.nationalId);
      setEmail(user.email);
      setLocation(user.location);
      setUserType(user.userType);
    }
  }, [dispatch, history, user, userId, successUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      editUser({
        _id: userId,
        name,
        phoneNumber,
        nationalId,
        email,
        location,
        userType,
        message,
      })
    );
  };

  const resetUserResultHanlder = () => {
    dispatch({ type: USER_PROFILE_RESET });
    dispatch({ type: ADMIN_UPDATE_USER_RESET });
    history.push("/admin/users");
  };

  return (
    <>
      <Button onClick={resetUserResultHanlder} className='rounded'>
        <i className='fas fa-chevron-left fa-fw'></i> Go Back
      </Button>
      <FormContainer>
        <h1>UPDATE USER</h1>
        {loading ? (
          <Loader />
        ) : (
          error && <Message variant='danger'>{error}</Message>
        )}

        <Form onSubmit={handleSubmit}>
          {successUpdate && <Message variant='success'>User Updated</Message>}
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
              onChange={(e) => setLocation(e.target.value)}
              value={location}
              placeholder='enter Location'
            ></Form.Control>
          </FormGroup>
          <FormGroup>
            <Form.Label>user Type</Form.Label>
            <Form.Control
              as='select'
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option>buyer</option>
              <option>seller</option>
            </Form.Control>
          </FormGroup>
          <Button type='submit' variant='primary' className='btn-block rounded'>
            UPDATE
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default EditUserInfo;

import React, { useEffect, useState } from 'react';
import { Row, Col, Button, Form } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Message from '../reusable/Message.js';
import Loader from '../reusable/Loader.js';
import { login } from '../../store/actions/usersActions.js';
import FormContainer from '../reusable/FormContainer.js';

const Login = ({ history, location }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { loading, userInfo, error } = userLogin;

  const redirect = location.search ? location.search.split('=')[1] : '/';

  useEffect(() => {
    if (userInfo) {
      history.push(redirect);
    }
  }, [history, userInfo, redirect]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(login(email, password));
  };

  return (
    <FormContainer>
      <h1>Sign In</h1>
      {error && (
        <Message variant='danger' className=''>
          {error}
        </Message>
      )}
      {loading && <Loader></Loader>}
      <Form onSubmit={submitHandler}>
        <Form.Group controlId='email'>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='email'
            placeholder='enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
        </Form.Group>
        <Form.Group controlId='password'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
        </Form.Group>

        <Button type='submit' variant='primary' className='btn-block rounded '>
          Sign In
        </Button>
      </Form>
      <Row className='py-3'>
        <Col>
          New User?
          <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link>
        </Col>
      </Row>
    </FormContainer>
  );
};

export default Login;

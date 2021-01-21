import React, { useEffect, useState } from 'react';
import { FormGroup, Form, Button, Row, Col } from 'react-bootstrap';
import {useSelector, useDispatch} from 'react-redux';
import FormContainer from '../reusable/FormContainer.js';
import {register} from '../../store/actions/usersActions.js'
import Message from '../reusable/Message.js';
import Loader from '../reusable/Loader.js';

const Register = () => {

    const dispatch = new useDispatch();

    const [name, setName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [location, setLocation] = useState('');
    const [userType, setUserType] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const userRegister = useSelector(state => state.userRegister)

    const { userInfo , loading, error} = userRegister;


    const handleSubmit = (e) => {
        e.preventDefault();
        // if (password !== confirmPassword){
        //     error = 'passwords are not matching!, try again'
        // }
        dispatch(register(name, phoneNumber, email, location, userType, password))
    }

    return (
        <FormContainer >
            <h1>SIGN UP</h1>
            { loading && <Loader/>}
            {error && <Message variant='danger'>{error}</Message>}
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Form.Label>Name</Form.Label>
                    <Form.Control onChange={(e) => setName(e.target.value)} value={name} placeholder='enter name'></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control onChange={(e) => setPhoneNumber(e.target.value)} value={phoneNumber} placeholder='enter Phone Number'></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label type='email'>email</Form.Label>
                    <Form.Control onChange={(e) => setEmail(e.target.value)} value={email} placeholder='enter email'></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label>location</Form.Label>
                    <Form.Control onChange={(e) => setLocation(e.target.value)} value={location} placeholder='enter location'></Form.Control>
                </FormGroup>
                <FormGroup>
                <Form.Label>user Type</Form.Label>
                    <Form.Control
                        as='select'
                        value={userType}
                        onChange={(e) =>
                            setUserType(e.target.value)
                        }
                    >
                        <option>
                            buyer
                        </option>
                        <option>
                            seller
                        </option>
                    </Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label>password</Form.Label>
                    <Form.Control type='password' onChange={(e) => setPassword(e.target.value)} value={password} placeholder='enter password'></Form.Control>
                </FormGroup>
                <FormGroup>
                    <Form.Label >comfirm password</Form.Label>
                    <Form.Control type='password' onChange={(e) => setConfirmPassword(e.target.value)} value={confirmPassword} placeholder='confirm password'></Form.Control>
                </FormGroup>
                <Button type='submit' variant='primary' className='btn-block rounded'>SIGN UP</Button>
            </Form>
            <div className="my-3">
                {/* <a>have an account? <Link to='/login'>Sign Up</Link></a> */}
                <Row className='py-3'>
        <Col>
        have an account? 
          {/* <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
            Register
          </Link> */}
        </Col>
      </Row>
            </div>
        </FormContainer>
    )
}

export default Register

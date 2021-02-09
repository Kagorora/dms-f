import React, { useEffect } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../reusable/Message.js";
import Loader from "../reusable/Loader.js";
import { getAllUsers } from "../../store/actions/usersActions";
import { LinkContainer } from "react-router-bootstrap";

const Users = ({ history }) => {
  const dispatch = useDispatch();

  const listUsers = useSelector((state) => state.listUsers);
  const { users, loading, error } = listUsers;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  useEffect(() => {
    if (userInfo && userInfo.userType === "admin") {
      dispatch(getAllUsers());
    } else {
      history.push("/login");
    }
  }, [dispatch, getAllUsers, history]);

  const deleteHandler = (id) => {
    // delete
  };

  return (
    <div className='justify-content-center'>
      <Row>
        <Col>
          <h2>Users</h2>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : (
            <Table striped bordered hover responsive className='table-sm'>
              <thead>
                <tr>
                  <th>Id</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>UserType</th>
                  <th>Admin</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name ? user.name : "N/A"}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>{user.userType ? user.userType : "N/A"}</td>
                    <td>
                      {user.userType === "admin" ? (
                        <i
                          className='fas fa-check'
                          style={{ color: "green" }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: "red" }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <LinkContainer to={`user/${user._id}/edit`}>
                        <Button variant='light' className='btn-sm'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </LinkContainer>
                      <Button
                        variant='danger'
                        className='btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </Button>
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

export default Users;

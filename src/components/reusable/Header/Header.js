import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import logo from "../../../assets/images/mainlogo.png";
import "./Header.scss";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../../../store/actions/usersActions";

const Header = () => {
  const dispatch = new useDispatch();

  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const LogoutHandler = () => {
    dispatch(logout());
  };

  return (
    <header className='header'>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>
              <div className='logoContainer'>
                <img src={logo} alt='main logo' className='headerLogo' />
              </div>
            </Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              {userInfo && (
                <LinkContainer to='/myorders'>
                  <Nav.Link>
                    <i className='fas fa-folder'></i> Orders
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.userType === "admin" && (
                <LinkContainer to='/admin/products'>
                  <Nav.Link>
                    <i className='fas fa-tools'></i> Products
                  </Nav.Link>
                </LinkContainer>
              )}
              {userInfo && userInfo.userType === "admin" && (
                <LinkContainer to='/admin/users'>
                  <Nav.Link>
                    <i className='fas fa-user-friends'></i> Users
                  </Nav.Link>
                </LinkContainer>
              )}
              <LinkContainer to='/cart'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart'></i> Cart
                </Nav.Link>
              </LinkContainer>
              {userInfo ? (
                <NavDropdown title={userInfo.name}>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={LogoutHandler}>
                    <LinkContainer to='/'>
                      <NavDropdown.Item>Logout</NavDropdown.Item>
                    </LinkContainer>
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link>
                    <i className='fas fa-user'></i> Login
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

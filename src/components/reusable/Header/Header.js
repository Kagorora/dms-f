import React, { useEffect } from "react";
import { Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";
import { logout } from "../../../store/actions/usersActions";
import { CART_RESET, ORDER_DETAILS_RESET } from "../../../store/types/types.js";

const Header = () => {
  const dispatch = useDispatch();
  const userLogin = useSelector((state) => state.userLogin);

  const { userInfo } = userLogin;

  const logoutHandler = () => {
    dispatch(logout());
    dispatch({ type: { CART_RESET } });
    dispatch({ type: { ORDER_DETAILS_RESET } });
  };

  return (
    <header>
      <Navbar bg='dark' variant='dark' expand='lg' collapseOnSelect>
        <Container>
          <LinkContainer to='/'>
            <Navbar.Brand>ProShop</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            {/* <Route render={({ history }) => <SearchBox history={history} />} /> */}
            <Nav className='ml-auto'>
              <LinkContainer to='/cart' className='mr-2'>
                <Nav.Link>
                  <i className='fas fa-shopping-cart fa-fw'></i> Cart
                </Nav.Link>
              </LinkContainer>

              {userInfo && (
                <LinkContainer to='/myorders' className='mr-2'>
                  <Nav.Link>
                    <i className='fas fa-folder fa-fw'></i> My Orders
                  </Nav.Link>
                </LinkContainer>
              )}

              {userInfo && userInfo.userType === "admin" && (
                <NavDropdown title='Admin' id='adminmenu'>
                  <LinkContainer to='/admin/users'>
                    <NavDropdown.Item>
                      <i className='fas fa-user-friends fa-fw'></i> Users
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/products'>
                    <NavDropdown.Item>
                      <i className='fas fa-tools fa-fw'></i> Products
                    </NavDropdown.Item>
                  </LinkContainer>
                  <LinkContainer to='/admin/orders'>
                    <NavDropdown.Item>
                      <i className='fas fa-truck fa-fw'></i> Orders
                    </NavDropdown.Item>
                  </LinkContainer>
                </NavDropdown>
              )}

              {userInfo ? (
                <NavDropdown title={userInfo.name} id='username'>
                  <LinkContainer to='/profile'>
                    <NavDropdown.Item>Profile</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logoutHandler}>
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to='/login'>
                  <Nav.Link href='/login'>
                    <i className='fas fa-user fa-fw'></i> Sign In
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

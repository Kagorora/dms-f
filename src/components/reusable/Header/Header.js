import React from "react";
import { Navbar, Nav } from "react-bootstrap";
import { Container } from "react-bootstrap";
import logo from "../../../assets/images/mainlogo.png";
import "./Header.scss";

const Header = () => {
  return (
    <header className='header'>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container>
          <Navbar.Brand href='/'>
            <div className='logoContainer'>
              <img src={logo} alt='main logo' className='headerLogo' />
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='basic-navbar-nav' />
          <Navbar.Collapse id='basic-navbar-nav'>
            <Nav className='ml-auto'>
              <Nav.Link href='/cart'>
                <i class='fas fa-shopping-cart'></i> Cart
              </Nav.Link>
              <Nav.Link href='/login'>
                <i class='fas fa-user'></i> Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;

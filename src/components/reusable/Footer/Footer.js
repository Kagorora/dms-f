import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col id="footer-element" className='text-center'> Copyright &copy; DMS </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;

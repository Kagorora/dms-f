import React from "react";
import { Row, Col } from "react-bootstrap";
import products from "../../products";
import Product from "../reusable/Product/Product";

const Buyer = () => {
  return (
    <>
      <h1>Products</h1>
      <Row>
        {products.map((product) => (
          <Col sm={12} md={6} lg={4} xl={3}>
            <Product product={product} />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Buyer;

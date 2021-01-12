import React, { useEffect, useState } from "react";
import { Row, Col, ListGroup, Card, Image, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
import Ratings from "../reusable/Rating/Rating";

const ProductDetails = ({ match }) => {
  const [product, setProduct] = useState({});

  useEffect(() => {
    const fetchProduct = async () => {
      const { data } = await axios.get(`/api/products/${match.params.id}`);
      setProduct(data);
    };
    fetchProduct();
  }, [match]);

  return (
    <>
      <Link to='/'>
        <Button className='btn btn-light my-3'>Go back</Button>
      </Link>
      <Row>
        <Col md={6}>
          <Image src={product.image} alt={product.name} fluid></Image>
        </Col>
        <Col md={3}>
          <ListGroup variant='flush'>
            <ListGroup.Item>
              <h3>{product.name}</h3>
            </ListGroup.Item>
            <ListGroup.Item>
              <Ratings
                rating={product.rating}
                numReview={`| Reviews ${product.numReviews}`}
                color='#f8e825'
              />
            </ListGroup.Item>
            <ListGroup.Item>PRICE: RWF {product.price}</ListGroup.Item>
            <ListGroup.Item>{product.description}</ListGroup.Item>
          </ListGroup>
        </Col>
        <Col md={3}>
          <Card>
            <ListGroup variant='flush'>
              <ListGroup.Item>
                <Row>
                  <Col>Price:</Col>
                  <Col>
                    <strong>RWF {product.price}</strong>
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Row>
                  <Col>Status:</Col>
                  <Col>
                    {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                  </Col>
                </Row>
              </ListGroup.Item>
              <ListGroup.Item>
                <Button
                  className='btn-block rounded'
                  disabled={product.countInStock === 0}
                >
                  {product.countInStock > 0 ? "ADD TO CART" : "Out of stock"}
                </Button>
              </ListGroup.Item>
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetails;

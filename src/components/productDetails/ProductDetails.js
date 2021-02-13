import React, { useState, useEffect } from "react";
import {
  Row,
  Col,
  ListGroup,
  Card,
  Image,
  Button,
  Form,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Ratings from "../reusable/Rating/Rating";
import {
  listProductDetails,
  createReview,
} from "../../store/actions/productsActions";
import Message from "../reusable/Message.js";
import Loader from "../reusable/Loader.js";
import { CREATE_REVIEW_RESET } from "../../store/types/types.js";

const ProductDetails = ({ match, history }) => {
  const [qty, setQty] = useState(1);

  const [comment, setComment] = useState("");

  const [rating, setRating] = useState(0);

  const dispatch = useDispatch();

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const createProductReview = useSelector((state) => state.createProductReview);
  const {
    error: errorReview,
    loading: loadingReview,
    success: successReview,
  } = createProductReview;

  useEffect(() => {
    if (successReview) {
      setRating(0);
      setComment("");
      dispatch({ type: CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(match.params.id));
  }, [dispatch, match, successReview]);

  const AddProductOnCartHandler = () => {
    history.push(`/cart/${match.params.id}?$qty=${qty}`);
  };

  const reviewSubmitHandler = (e) => {
    e.preventDefault();
    dispatch(createReview(match.params.id, { rating, comment }));
  };

  return (
    <>
      <Link to='/'>
        <Button className='btn my-5 rounded'>
          <i className='fas fa-chevron-left fa-fw'></i> Go back
        </Button>
      </Link>

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
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
                    numReview={`| Reviews ${product.reviews.length}`}
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
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <Row>
                        <Col>Quantity</Col>
                        <Col>
                          <Form.Control
                            as='select'
                            value={qty}
                            onChange={(e) => setQty(e.target.value)}
                          >
                            {[...Array(product.countInStock).keys()].map(
                              (index) => (
                                <option key={index + 1} value={index + 1}>
                                  {index + 1}
                                </option>
                              )
                            )}
                          </Form.Control>
                        </Col>
                      </Row>
                    </ListGroup.Item>
                  )}
                  <ListGroup.Item>
                    <Button
                      className='btn-block rounded'
                      disabled={product.countInStock === 0}
                      onClick={AddProductOnCartHandler}
                    >
                      {product.countInStock > 0
                        ? "ADD TO CART"
                        : "Out of stock"}
                    </Button>
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col md={6}>
              <h2 className='my-3'>Reviews</h2>
              {product.reviews.length === 0 && <strong> No Review </strong>}
              <ListGroup variant='flush'>
                {product.reviews &&
                  product.reviews.map((review) => (
                    <ListGroup.Item key={review._id}>
                      <strong>{review.name}</strong>
                      <Ratings rating={review.rating} color='#f8e825' />
                      <p>{review.createdAt.substring(0, 10)}</p>
                      <p>{review.comment}</p>
                    </ListGroup.Item>
                  ))}

                <ListGroup.Item>
                  <h2>Add your review</h2>
                  {loadingReview && <Loader />}
                  {errorReview && (
                    <Message variant='danger'>{errorReview}</Message>
                  )}
                  {successReview && (
                    <Message variant='success'>Review Added</Message>
                  )}
                  {!userInfo && (
                    <Message>
                      <Link to='/login'>Please login, to add your review</Link>
                    </Message>
                  )}
                  {userInfo && (
                    <Form onSubmit={reviewSubmitHandler}>
                      <Form.Group controlId='rating'>
                        <Form.Label>Add Review</Form.Label>
                        <Form.Control
                          as='select'
                          value={rating}
                          onChange={(e) => setRating(e.target.value)}
                        >
                          <option value=''>... select</option>
                          <option value='1'>1 - poor</option>
                          <option value='2'>2 - fair</option>
                          <option value='3'>3 - good</option>
                          <option value='4'>4 - very good</option>
                          <option value='5'>5 - excellent</option>
                        </Form.Control>
                      </Form.Group>
                      <Form.Group controlId='comment'>
                        <Form.Label>Add Comment</Form.Label>
                        <Form.Control
                          as='textarea'
                          value={comment}
                          onChange={(e) => setComment(e.target.value)}
                        ></Form.Control>
                      </Form.Group>
                      <Button variant='primary' type='submit'>
                        Add review
                      </Button>
                    </Form>
                  )}
                </ListGroup.Item>
              </ListGroup>
            </Col>
          </Row>
        </>
      )}
    </>
  );
};

export default ProductDetails;

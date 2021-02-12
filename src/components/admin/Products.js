import React, { useEffect } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { LinkContainer } from "react-router-bootstrap";
import Message from "../reusable/Message.js";
import Loader from "../reusable/Loader.js";
import {
  listProducts,
  deleteProduct,
  createProduct,
} from "../../store/actions/productsActions";
import { CREATE_PRODUCT_RESET } from "../../store/types/types.js";

const Products = ({ history }) => {
  const dispatch = useDispatch();

  const productCreate = useSelector((state) => state.productCreate);
  const {
    success: successCreate,
    loading: loadingCreate,
    error: errorCreate,
    product: createdProduct,
  } = productCreate;

  const productsList = useSelector((state) => state.productsList);
  const { products, loading, error } = productsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  useEffect(() => {
    dispatch({ type: CREATE_PRODUCT_RESET });
    if (userInfo && userInfo.userType === "seller") {
      history.push("/login");
    }
    if (!userInfo) {
      history.push("/login");
    }
    if (successCreate) {
      history.push(`/product/${createdProduct._id}/edit`);
    } else {
      dispatch(listProducts());
    }
  }, [dispatch, userInfo, history, successDelete, successCreate]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    dispatch(createProduct());
  };

  return (
    <div className='justify-content-center'>
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : loadingCreate ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
          ) : errorCreate ? (
            <Message variant='danger'>{errorCreate}</Message>
          ) : (
            <>
              <Row className='align-items-center'>
                <Col>
                  <h2>Products</h2>
                </Col>
                <Col className='text-right'>
                  <Button
                    className='my-3 rounded'
                    onClick={createProductHandler}
                  >
                    <i className='fas fa-plus-circle fa-fw'></i> Add Products
                  </Button>
                </Col>
              </Row>
              <Table striped bordered hover responsive className='table-sm'>
                <thead>
                  <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Brand</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((product) => (
                    <tr key={product._id}>
                      <td>{product._id}</td>
                      <td>
                        <a href={`product/${product.name}`}>{product.name}</a>
                      </td>
                      <td>{product.price}</td>
                      <td>{product.category}</td>
                      <td>{product.brand}</td>
                      <td>
                        <LinkContainer to={`/product/${product._id}/edit`}>
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit fa-fw'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className='fas fa-trash fa-fw'></i>
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
};

export default Products;

import React, { useEffect } from "react";
import { Button, Row, Col, Table } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import Message from "../reusable/Message.js";
import Loader from "../reusable/Loader.js";
import {
  listProducts,
  deleteProduct,
} from "../../store/actions/productsActions";
import { LinkContainer } from "react-router-bootstrap";

const Products = ({ history }) => {
  const dispatch = useDispatch();

  const productsList = useSelector((state) => state.productsList);
  const { products, loading, error } = productsList;

  const userLogin = useSelector((state) => state.userLogin);
  const { userInfo } = userLogin;

  const productDelete = useSelector((state) => state.productDelete);
  const { success: successDelete } = productDelete;

  useEffect(() => {
    if (userInfo && userInfo.userType === "admin") {
      dispatch(listProducts());
    } else {
      history.push("/login");
    }
  }, [dispatch, userInfo, history, successDelete]);

  const deleteHandler = (id) => {
    if (window.confirm("Are you sure?")) {
      dispatch(deleteProduct(id));
    }
  };

  const createProductHandler = () => {
    //
  };

  return (
    <div className='justify-content-center'>
      <Row>
        <Col>
          {loading ? (
            <Loader />
          ) : error ? (
            <Message variant='danger'>{error}</Message>
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
                    <i className='fas fa-plus-circle'></i> Add Products
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
                        <LinkContainer
                          to={`/admin/product/${product._id}/edit`}
                        >
                          <Button variant='light' className='btn-sm'>
                            <i className='fas fa-edit'></i>
                          </Button>
                        </LinkContainer>
                        <Button
                          variant='danger'
                          className='btn-sm'
                          onClick={() => deleteHandler(product._id)}
                        >
                          <i className='fas fa-trash'></i>
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

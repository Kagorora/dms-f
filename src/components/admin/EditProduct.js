import React, { useEffect, useState } from "react";
import axios from "axios";
import { FormGroup, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import FormContainer from "../reusable/FormContainer.js";
import {
  listProductDetails,
  updateProduct,
} from "../../store/actions/productsActions.js";
import Message from "../reusable/Message.js";
import Loader from "../reusable/Loader.js";
import {
  UPDATE_PRODUCT_RESET,
  CREATE_PRODUCT_RESET,
  PRODUCT_DETAILS_RESET,
} from "../../store/types/types.js";

const EditProduct = ({ match, history }) => {
  const productId = match.params.id;

  const dispatch = new useDispatch();

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [countInStock, setCountInStock] = useState(0);
  const [image, setImage] = useState("");
  const [description, setDescription] = useState("");
  const [brand, setBrand] = useState("");
  const [category, setCategory] = useState("");

  const [uploading, setUploading] = useState(false);

  const productDetails = useSelector((state) => state.productDetails);
  const { loading, error, product } = productDetails;

  const productUpdate = useSelector((state) => state.productUpdate);
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = productUpdate;

  useEffect(() => {
    if (successUpdate) {
      dispatch(listProductDetails(productId));
    } else {
      if (!product.name || product._id !== productId) {
        dispatch(listProductDetails(productId));
      } else {
        setName(product.name);
        setPrice(product.price);
        setCountInStock(product.countInStock);
        setImage(product.image);
        setDescription(product.description);
        setBrand(product.brand);
        setCategory(product.category);
      }
    }
  }, [dispatch, history, product, productId, successUpdate]);

  const goBackHandler = () => {
    dispatch({ type: UPDATE_PRODUCT_RESET });
    dispatch({ type: CREATE_PRODUCT_RESET });
    dispatch({ type: PRODUCT_DETAILS_RESET });
    history.push("/admin/products");
  };

  const handleImageUpload = async (e) => {
    const { files } = e.target;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'miv0xetk');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/kagororacloud/image/upload',
      {
        method: 'POST',
        body: data,
      }
    );

    const file = await res.json();
    setImage(file.secure_url);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      updateProduct({
        _id: productId,
        name,
        price,
        countInStock,
        image,
        description,
        brand,
        category,
      })
    );
  };

  return (
    <>
      <Button onClick={goBackHandler} className='rounded'>
        <i className='fas fa-chevron-left fa-fw'></i> Go Back
      </Button>
      <FormContainer>
        <h1>UPDATE PRODUCT</h1>
        {loading ? (
          <Loader />
        ) : loadingUpdate ? (
          <Loader />
        ) : (
          error && <Message variant='danger'>{error}</Message>
        )}

        <Form onSubmit={handleSubmit}>
          {successUpdate && (
            <Message variant='success'>Product Updated</Message>
          )}
          {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
          <FormGroup>
            <Form.Label>Name</Form.Label>
            <Form.Control
              onChange={(e) => setName(e.target.value)}
              value={name}
              placeholder='enter name'
            ></Form.Control>
          </FormGroup>
          <FormGroup>
            <Form.Label>PRICE / FRW</Form.Label>
            <Form.Control
              onChange={(e) => setPrice(e.target.value)}
              value={price}
              placeholder='enter PRICE'
            ></Form.Control>
          </FormGroup>
          <FormGroup>
            <Form.Label>Image</Form.Label>
            <Form.Control
              onChange={(e) => setImage(e.target.value)}
              value={image}
              placeholder='enter Image'
            ></Form.Control>
            <Form.File
              id='image-file'
              label='Upload Image'
              custom
              onChange={handleImageUpload}
            >
              {uploading && <Loader />}
            </Form.File>
          </FormGroup>

          <FormGroup>
            <Form.Label>Brand</Form.Label>
            <Form.Control
              onChange={(e) => setBrand(e.target.value)}
              value={brand}
              placeholder='enter Brand'
            ></Form.Control>
          </FormGroup>

          <FormGroup>
            <Form.Label>countInStock</Form.Label>
            <Form.Control
              onChange={(e) => setCountInStock(e.target.value)}
              value={countInStock}
              placeholder='enter countInStock'
            ></Form.Control>
          </FormGroup>

          <FormGroup>
            <Form.Label>category</Form.Label>
            <Form.Control
              onChange={(e) => setCategory(e.target.value)}
              value={category}
              placeholder='enter category'
            ></Form.Control>
          </FormGroup>

          <FormGroup>
            <Form.Label>description</Form.Label>
            <Form.Control
              as='textarea'
              row='3'
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              placeholder='enter description'
            ></Form.Control>
          </FormGroup>

          <Button type='submit' variant='primary' className='btn-block rounded'>
            UPDATE
          </Button>
        </Form>
      </FormContainer>
    </>
  );
};

export default EditProduct;
import axios from "axios";
import { CART_ADD_PRODUCTS } from "../types/types";

export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`);

  dispatch({
    type: CART_ADD_PRODUCTS,
    payload: {
      product: data._id,
      name: data.name,
      price: data.price,
      countInStock: data.countInStock,
      image: data.image,
      qty,
    },
  });
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cartItems));
};

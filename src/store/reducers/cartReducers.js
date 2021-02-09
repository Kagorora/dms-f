import {
  CART_ADD_PAYMENT_METHOD,
  CART_ADD_PRODUCTS,
  CART_ADD_PRODUCTS_DESTINATION_SUCCESS,
  CART_REMOVE_PRODUCTS,
  CART_RESET,
} from "../types/types";

export const cartReducer = (
  state = { cartItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case CART_ADD_PRODUCTS:
      const item = action.payload;

      const existItem = state.cartItems.find((x) => x.product === item.product);

      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.product === existItem.product ? item : x
          ),
        };
      } else {
        return {
          ...state,
          cartItems: [...state.cartItems, item],
        };
      }

    case CART_REMOVE_PRODUCTS:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload),
      };

    case CART_ADD_PRODUCTS_DESTINATION_SUCCESS:
      return {
        ...state,
        shippingAddress: action.payload,
      };

    case CART_ADD_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload,
      };

    case CART_RESET:
      return {
        cartItems: [],
        shippingAddress: {},
        paymentMethod: "",
      };

    default:
      return state;
  }
};

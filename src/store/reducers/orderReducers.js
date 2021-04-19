import {
  ORDER_CREATE_FAIL,
  ORDER_CREATE_SUCCESS,
  ORDER_CREATE_REQUEST,
  ORDER_DETAILS_REQUEST,
  ORDER_DETAILS_SUCCESS,
  ORDER_DETAILS_FAIL,
  ORDER_PAY_REQUEST,
  ORDER_PAY_SUCCESS,
  ORDER_PAY_FAIL,
  ORDER_PAY_RESET,
  LIST_MY_ORDER_REQUEST,
  LIST_MY_ORDER_SUCCESS,
  LIST_MY_ORDER_FAIL,
  LIST_MY_ORDER_RESET,
  ADMIN_LIST_ORDERS_REQUEST,
  ADMIN_LIST_ORDERS_SUCCESS,
  ADMIN_LIST_ORDERS_FAIL,
  ADMIN_LIST_ORDERS_RESET,
  ORDER_DETAILS_RESET,
  MARK_ORDER_DELIVERED_REQUEST,
  MARK_ORDER_DELIVERED_SUCCESS,
  MARK_ORDER_DELIVERED_FAIL,
  MARK_ORDER_DELIVERED_RESET,
  ADMIN_FILTER_ORDERS_BY_DATES_SUCCESS,
  ADMIN_FILTER_ORDERS_BY_DATES_REQUEST,
  ADMIN_FILTER_ORDERS_BY_DATES_FAIL,
  ADMIN_FILTER_ORDERS_BY_PAYMENT_METHOD_SUCCESS,
  ADMIN_FILTER_ORDERS_BY_PAYMENT_METHOD_REQUEST,
  ADMIN_FILTER_ORDERS_BY_PAYMENT_METHOD_FAIL,
  ADMIN_FILTER_ORDERS_BY_IS_PAID_REQUEST,
  ADMIN_FILTER_ORDERS_BY_IS_PAID_SUCCESS,
  ADMIN_FILTER_ORDERS_BY_IS_PAID_FAIL,
  ADMIN_FILTER_ORDERS_BY_PROVINCE_REQUEST,
  ADMIN_FILTER_ORDERS_BY_PROVINCE_SUCCESS,
  ADMIN_FILTER_ORDERS_BY_PROVINCE_FAIL
} from "../types/types.js";

export const orderCreateReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_CREATE_REQUEST:
      return {
        loading: true,
      };
    case ORDER_CREATE_SUCCESS:
      return {
        loading: false,
        success: true,
        order: action.payload,
      };
    case ORDER_CREATE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderDetailsReducer = (
  state = { loading: true, orderItems: [], shippingAddress: {} },
  action
) => {
  switch (action.type) {
    case ORDER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_DETAILS_SUCCESS:
      return {
        loading: false,
        order: action.payload,
      };
    case ORDER_DETAILS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ORDER_DETAILS_RESET:
      return {
        orderItems: [],
        shippingAddress: {},
      };

    default:
      return state;
  }
};

export const orderPayReducer = (state = {}, action) => {
  switch (action.type) {
    case ORDER_PAY_REQUEST:
      return {
        loading: true,
      };
    case ORDER_PAY_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case ORDER_PAY_FAIL:
      return {
        loading: false,
        error: action.payload,
      };
    case ORDER_PAY_RESET:
      return {};

    default:
      return state;
  }
};

export const orderMyListReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case LIST_MY_ORDER_REQUEST:
      return {
        loading: true,
      };
    case LIST_MY_ORDER_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case LIST_MY_ORDER_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case LIST_MY_ORDER_RESET:
      return {
        orders: [],
      };

    default:
      return state;
  }
};

export const orderFilterByDateReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_FILTER_ORDERS_BY_DATES_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_FILTER_ORDERS_BY_DATES_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ADMIN_FILTER_ORDERS_BY_DATES_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderFilterByPaymentMethodReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_FILTER_ORDERS_BY_PAYMENT_METHOD_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_FILTER_ORDERS_BY_PAYMENT_METHOD_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ADMIN_FILTER_ORDERS_BY_PAYMENT_METHOD_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderFilterByIsPaidReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_FILTER_ORDERS_BY_IS_PAID_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_FILTER_ORDERS_BY_IS_PAID_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ADMIN_FILTER_ORDERS_BY_IS_PAID_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const orderFilterByProvinceReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_FILTER_ORDERS_BY_PROVINCE_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_FILTER_ORDERS_BY_PROVINCE_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ADMIN_FILTER_ORDERS_BY_PROVINCE_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const adminOrderReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case ADMIN_LIST_ORDERS_REQUEST:
      return {
        loading: true,
      };
    case ADMIN_LIST_ORDERS_SUCCESS:
      return {
        loading: false,
        orders: action.payload,
      };
    case ADMIN_LIST_ORDERS_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case ADMIN_LIST_ORDERS_RESET:
      return {
        orders: [],
      };

    default:
      return state;
  }
};

export const deliverOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case MARK_ORDER_DELIVERED_REQUEST:
      return {
        loading: true,
      };
    case MARK_ORDER_DELIVERED_SUCCESS:
      return {
        loading: false,
        success: true,
      };
    case MARK_ORDER_DELIVERED_FAIL:
      return {
        loading: false,
        error: action.payload,
      };

    case MARK_ORDER_DELIVERED_RESET:
      return {};

    default:
      return state;
  }
};

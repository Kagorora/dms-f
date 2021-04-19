import axios from "axios";
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
  LIST_MY_ORDER_REQUEST,
  LIST_MY_ORDER_SUCCESS,
  LIST_MY_ORDER_FAIL,
  ADMIN_LIST_ORDERS_REQUEST,
  ADMIN_LIST_ORDERS_SUCCESS,
  ADMIN_LIST_ORDERS_FAIL,
  MARK_ORDER_DELIVERED_REQUEST,
  MARK_ORDER_DELIVERED_SUCCESS,
  MARK_ORDER_DELIVERED_FAIL,
  ADMIN_FILTER_ORDERS_BY_DATES_REQUEST,
  ADMIN_FILTER_ORDERS_BY_DATES_SUCCESS,
  ADMIN_FILTER_ORDERS_BY_DATES_FAIL,
  ADMIN_FILTER_ORDERS_BY_PAYMENT_METHOD_REQUEST,
  ADMIN_FILTER_ORDERS_BY_PAYMENT_METHOD_SUCCESS,
  ADMIN_FILTER_ORDERS_BY_PAYMENT_METHOD_FAIL,
  ADMIN_FILTER_ORDERS_BY_IS_PAID_REQUEST,
  ADMIN_FILTER_ORDERS_BY_IS_PAID_SUCCESS,
  ADMIN_FILTER_ORDERS_BY_IS_PAID_FAIL,
  ADMIN_FILTER_ORDERS_BY_PROVINCE_REQUEST,
  ADMIN_FILTER_ORDERS_BY_PROVINCE_SUCCESS,
  ADMIN_FILTER_ORDERS_BY_PROVINCE_FAIL  
} from "../types/types.js";

export const createOrder = (order) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_CREATE_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.post(`/api/orders`, order, config);

    dispatch({
      type: ORDER_CREATE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_CREATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getOrderDetails = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ORDER_DETAILS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/${id}`, config);

    dispatch({
      type: ORDER_DETAILS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_DETAILS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const payOrder = (orderId, paymentResult) => async (
  dispatch,
  getState
) => {
  try {
    dispatch({
      type: ORDER_PAY_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.put(
      `/api/orders/${orderId}/pay`,
      paymentResult,
      config
    );

    dispatch({
      type: ORDER_PAY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ORDER_PAY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listMyOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: LIST_MY_ORDER_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders/myorders`, config);

    dispatch({
      type: LIST_MY_ORDER_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: LIST_MY_ORDER_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const listOrders = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_LIST_ORDERS_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };
    const { data } = await axios.get(`/api/orders`, config);

    dispatch({
      type: ADMIN_LIST_ORDERS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_LIST_ORDERS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const filterOrdersByDate = (fromDate, toDate) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_FILTER_ORDERS_BY_DATES_REQUEST,
    });
    
    const {
      userLogin: { userInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/timeframe/${fromDate}/${toDate}`, config);

    dispatch({
      type: ADMIN_FILTER_ORDERS_BY_DATES_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FILTER_ORDERS_BY_DATES_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const filterOrdersPaymentMethod = (paymentMethod) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_FILTER_ORDERS_BY_PAYMENT_METHOD_REQUEST,
    });
    
    const {
      userLogin: { userInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/sortOrdersByPaymentMethod/${paymentMethod}`, config);

    dispatch({
      type: ADMIN_FILTER_ORDERS_BY_PAYMENT_METHOD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FILTER_ORDERS_BY_PAYMENT_METHOD_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const filterOrdersIsPaid = (isPaid) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_FILTER_ORDERS_BY_IS_PAID_REQUEST,
    });
    
    const {
      userLogin: { userInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/sortOrdersByNonPaid/${isPaid}`, config);

    dispatch({
      type: ADMIN_FILTER_ORDERS_BY_IS_PAID_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FILTER_ORDERS_BY_IS_PAID_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};


export const filterOrdersProvince = (Province) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADMIN_FILTER_ORDERS_BY_PROVINCE_REQUEST,
    });
    
    const {
      userLogin: { userInfo },
    } = getState();
    
    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/orders/sortOrdersByProvince/${Province}`, config);

    dispatch({
      type: ADMIN_FILTER_ORDERS_BY_PROVINCE_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_FILTER_ORDERS_BY_PROVINCE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const markOrderAsDelivered = (id) => async (dispatch, getState) => {
  try {
    dispatch({
      type: MARK_ORDER_DELIVERED_REQUEST,
    });

    const {
      userLogin: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.put(`/api/orders/${id}/deliver`, {}, config);

    dispatch({
      type: MARK_ORDER_DELIVERED_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: MARK_ORDER_DELIVERED_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

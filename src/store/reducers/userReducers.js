import {
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
  USER_LOGOUT,
  USER_PROFILE_FAIL,
  USER_PROFILE_REQUEST,
  USER_PROFILE_RESET,
  USER_PROFILE_UPDATE_FAIL,
  USER_PROFILE_UPDATE_REQUEST,
  USER_PROFILE_UPDATE_SUCCESS,
  USER_PROFILE_SUCCESS,
  USER_REGISTER_FAIL,
  USER_REGISTER_REQUEST,
  USER_REGISTER_SUCCESS,
  ADMIN_USERS_LIST_REQUEST,
  ADMIN_USERS_LIST_FAIL,
  ADMIN_USERS_LIST_SUCCESS,
  ADMIN_USERS_LIST_RESET,
  ADMIN_UPDATE_USER_REQUEST,
  ADMIN_UPDATE_USER_SUCCESS,
  ADMIN_UPDATE_USER_FAIL,
  ADMIN_UPDATE_USER_RESET,
  USER_DELETE_REQUEST,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
} from "../types/types.js";

export const userLoginReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_LOGIN_REQUEST:
      return { loading: true };
    case USER_LOGIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_LOGIN_FAIL:
      return { loading: false, error: action.payload };
    case USER_LOGOUT:
      return {};
    default:
      return state;
  }
};

export const userSignUpReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_REGISTER_REQUEST:
      return { loading: true };
    case USER_REGISTER_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case USER_REGISTER_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const userProfileReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case USER_PROFILE_REQUEST:
      return { ...state, loading: true };
    case USER_PROFILE_SUCCESS:
      return { loading: false, user: action.payload };
    case USER_PROFILE_FAIL:
      return { loading: false, error: action.payload };
    case USER_PROFILE_RESET:
      return { user: {} };
    default:
      return state;
  }
};

export const userProfileResetReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_PROFILE_UPDATE_REQUEST:
      return { loading: true };
    case USER_PROFILE_UPDATE_SUCCESS:
      return { loading: false, success: true, userInfo: action.payload };
    case USER_PROFILE_UPDATE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const listUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case ADMIN_USERS_LIST_REQUEST:
      return { loading: true };
    case ADMIN_USERS_LIST_SUCCESS:
      return { loading: false, users: action.payload };
    case ADMIN_USERS_LIST_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_USERS_LIST_RESET:
      return { users: [] };
    default:
      return state;
  }
};

export const userDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case USER_DELETE_REQUEST:
      return { loading: true };
    case USER_DELETE_SUCCESS:
      return { loading: false, success: true };
    case USER_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const updateUserReducer = (state = { updatedUser: {} }, action) => {
  switch (action.type) {
    case ADMIN_UPDATE_USER_REQUEST:
      return { loading: true };
    case ADMIN_UPDATE_USER_SUCCESS:
      return { loading: false, success: true };
    case ADMIN_UPDATE_USER_FAIL:
      return { loading: false, error: action.payload };
    case ADMIN_UPDATE_USER_RESET:
      return { updatedUser: {} };
    default:
      return state;
  }
};

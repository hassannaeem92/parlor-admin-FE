import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_SUCCESS,
  LOGOUT,
  RESET_ERROR,
  RESET_SUCCESS,
  SET_LOADER,
  SET_VALIDATE_ERROR,
  RESET_VALIDATE_ERROR,
  SET_TOKEN,
} from "../Types/AuthTypes";
import { jwtDecode } from "jwt-decode";

const initialState = {
  loading: false,
  user: {},
  token: "",
  validateErrors: null,
  success: "",
  error: "",
};

const verifyToken = (token) => {
  const decodeToken = jwtDecode(token);
  const expireIn = new Date(decodeToken.exp * 1000);
  if (new Date() > expireIn) {
    localStorage.removeItem("myToken");
    return null;
  } else {
    return decodeToken;
  }
};

const token = localStorage.getItem("myToken");
if (token) {
  try {
    const decoded = verifyToken(token);
    initialState.token = token;

    if (decoded && decoded.user) {
      const { user } = decoded;
      initialState.user = user;
    }
  } catch (error) {
    // Handle token verification error, if any
    console.error("Error verifying token:", error);
    // Optionally, you may want to clear the token or take other actions
    // localStorage.removeItem("myToken");
  }
}

const AuthReducer = (state = initialState, action) => {
  if (action.type === SET_LOADER) {
    return { ...state, loading: true };
  } else if (action.type === CLOSE_LOADER) {
    return { ...state, loading: false };
  } else if (action.type === SET_VALIDATE_ERROR) {
    return { ...state, validateErrors: action.payLoad };
  } else if (action.type === RESET_VALIDATE_ERROR) {
    return { ...state, validateErrors: null };
  } else if (action.type === SET_SUCCESS) {
    return { ...state, success: action.payLoad };
  } else if (action.type === RESET_SUCCESS) {
    return { ...state, success: "" };
  } else if (action.type === SET_ERROR) {
    return { ...state, error: action.payLoad };
  } else if (action.type === RESET_ERROR) {
    return { ...state, error: "" };
  } else if (action.type === LOGOUT) {
    return { ...state, token: "", user: {} };
  } else if (action.type === SET_TOKEN) {
    const decoded = verifyToken(action.payLoad);
    const { user } = decoded;
    return { ...state, token: action.payLoad, user: user };
  } else {
    return state;
  }
};

export default AuthReducer;

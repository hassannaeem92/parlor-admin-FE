import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
} from "../Types/AuthTypes";
import backendVerifiedUser from "../../api/backendVerifiedUser";
import { SET_CUSTOMERS, SET_SPECIFIC_CUSTOMERS } from "../Types/CustomerTypes";

export const getCustomers = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get("/get-customers");

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_CUSTOMERS, payLoad: response.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
  };
};

export const addCustomers = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post("/add-customer", data);
      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });

      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
      return false;
    }
  };
};

export const deleteMultipleCustomers = (customerIds) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/delete-multiple-customers`,
        customerIds
      );
      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
    return false;
  };
};

export const getspecificCustomer = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(
        `/get-specific-customer/${id}`
      );

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SPECIFIC_CUSTOMERS, payLoad: response.data });
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
  };
};

export const updateCustomer = (data, id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/update-customer/${id}`,
        data
      );
      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });
      return true;
    } catch (err) {
      dispatch({ type: CLOSE_LOADER });
      console.log(err);
      dispatch({
        type: SET_ERROR,
        payLoad: err.response?.data?.error?.msg,
      });
    }
    return false;
  };
};

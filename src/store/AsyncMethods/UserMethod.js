import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
} from "../Types/AuthTypes";
import backendVerifiedUser from "../../api/backendVerifiedUser";
import { SET_SPECIFIC_USERS, SET_USERS } from "../Types/UserTypes";

export const addUser = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post("/add-user", data);
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

export const getUsers = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get("/get-users");

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_USERS, payLoad: response.data });
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

export const deleteMultipleUsers = (userIds) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/delete-multiple-users`,
        userIds
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

export const getspecificUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(
        `/get-specific-user/${id}`
      );

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SPECIFIC_USERS, payLoad: response.data });
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

export const updateUser = (data, id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/update-user/${id}`,
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

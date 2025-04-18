import backendVerifiedUser from "../../api/backendVerifiedUser";
import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
} from "../Types/AuthTypes";
import { SET_FAQS, SET_SPECIFIC_FAQS } from "../Types/FAQsTypes";

export const addFAQs = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post("/add-faqs", data);
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

export const getFAQs = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get("/get-faqs");

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_FAQS, payLoad: response.data });
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

export const deleteFAQs = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(`/delete-faqs/${id}`);
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

export const getspecificFAQs = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(
        `/get-specific-faqs/${id}`
      );

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SPECIFIC_FAQS, payLoad: response.data });
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

export const updateFAQs = (data, id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/update-faqs/${id}`,
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

export const deleteMultipleFAQs = (faqsIds) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/delete-multiple-faqs`,
        faqsIds
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

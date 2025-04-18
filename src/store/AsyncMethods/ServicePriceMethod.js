import backendVerifiedUser from "../../api/backendVerifiedUser";
import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
} from "../Types/AuthTypes";
import {
  SET_CATEGORIES,
  SET_SPECIFIC_SUB_CATEGORIES,
  SET_SUB_CATEGORIES,
} from "../Types/CategoryTypes";
import { SET_SERVICE_PRICES, SET_SPECIFIC_SERVICE_PRICE, SET_WORK_IMAGES} from "../Types/ServicePriceTypes";

export const addCategory = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post("/add-category", data);
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

export const getCategory = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get("/get-category");

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_CATEGORIES, payLoad: response.data });
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

export const getServicePrice = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get("/get-service-prices");

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SERVICE_PRICES, payLoad: response.data });
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

export const getWorkImages = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get("/getourworksection");

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_WORK_IMAGES, payLoad: response.data });
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

export const deleteCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(`/delete-category/${id}`);
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



export const deleteServicePrice = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(`/delete-service-price/${id}`);
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

export const getSpecificServicePrice = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(
        `/get-service-prices-by-id/${id}`
      );

      dispatch({ type: CLOSE_LOADER });
console.log(response.data,'response.data at getSpecificServicePrice');
      dispatch({ type: SET_SPECIFIC_SERVICE_PRICE, payLoad: response.data });
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

export const updateServicePrice = (data, id) => {
  console.log("dataaaaaaaaaaaa",data)
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/update-service-price/${id}`,
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

export const updateOurImages = (data, id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/update-service-price/${id}`,
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

export const deleteMultipleCategory = (categoryIds) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/delete-multiple-category`,
        categoryIds
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


export const deleteMultipleServicePrices = (categoryIds) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/delete-service-price`,
        categoryIds
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

export const addServicePrice = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        "/add-service-price",
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
      return false;
    }
  };
};

export const addWorkImages = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        "/addOurWorkSection",
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
      return false;
    }
  };
};

export const getSubCategory = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get("/get-sub-category");

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SUB_CATEGORIES, payLoad: response.data });
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

export const getspecificSubCategory = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(
        `/get-specific-sub-category/${id}`
      );

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SPECIFIC_SUB_CATEGORIES, payLoad: response.data });
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

export const updateSubCategory = (data, id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/update-sub-category/${id}`,
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

export const deleteMultipleSubCategory = (subCategoryIds) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/delete-multiple-sub-category`,
        subCategoryIds
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

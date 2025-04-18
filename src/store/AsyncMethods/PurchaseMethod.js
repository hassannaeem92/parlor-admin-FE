import backendVerifiedUser from "../../api/backendVerifiedUser";
import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
} from "../Types/AuthTypes";
import {
  RESET_SPECIFIC_PURCHASE,
  SET_PURCHASES,
  SET_SPECIFIC_PURCHASE,
} from "../Types/PurchaseTypes";

export const getPurchases = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get("/get-purchases");

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_PURCHASES, payLoad: response.data });
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

// export const changeOrderStatus = (data) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await backendVerifiedUser.post(
//         "/change-order-status",
//         data
//       );

//       dispatch({ type: CLOSE_LOADER });

//       dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });
//       return true;
//     } catch (err) {
//       dispatch({ type: CLOSE_LOADER });
//       console.log(err);
//       dispatch({
//         type: SET_ERROR,
//         payLoad: err.response?.data?.error?.msg,
//       });
//       return false;
//     }
//   };
// };

export const addPurchase = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post("/add-purchase", data);
      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });

      return { success: true, insertSaleId: response.data.insertSaleId };
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

export const getspecificPurchase = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(
        `/get-specific-purchase/${id}`
      );

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SPECIFIC_PURCHASE, payLoad: response.data });
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

export const updatePurchase = (data, id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/update-purchase/${id}`,
        data
      );
      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });
      dispatch({ type: RESET_SPECIFIC_PURCHASE });
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

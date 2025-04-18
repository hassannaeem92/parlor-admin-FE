import backendVerifiedUser from "../../api/backendVerifiedUser";
import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_LOADER,
  SET_SUCCESS,
} from "../Types/AuthTypes";
import { 
  SET_DEALS, 
  SET_SPECIFIC_DEAL 
} from "../Types/DealsTypes";

// export const addCategory = (data) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await backendVerifiedUser.post("/add-category", data);
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

// export const getCategory = () => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await backendVerifiedUser.get("/get-category");

//       dispatch({ type: CLOSE_LOADER });

//       dispatch({ type: SET_CATEGORIES, payLoad: response.data });
//     } catch (err) {
//       dispatch({ type: CLOSE_LOADER });
//       console.log(err);
//       dispatch({
//         type: SET_ERROR,
//         payLoad: err.response?.data?.error?.msg,
//       });
//     }
//   };
// };

export const getDeals = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get("/getDeals");
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_DEALS, payLoad: response.data });
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

// export const deleteCategory = (id) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await backendVerifiedUser.get(`/delete-category/${id}`);
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
//     }
//     return false;
//   };
// };

export const getSpecificDeal = (id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(
        `/getSpecificDealById/${id}`
      );

      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: SET_SPECIFIC_DEAL, payLoad: response.data });
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

export const updateDeal = (data, id) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        `/updateDeals/${id}`,
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

export const addDeal = (data) => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.post(
        "/addDeals",
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

// export const getSubCategory = () => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await backendVerifiedUser.get("/get-sub-category");

//       dispatch({ type: CLOSE_LOADER });

//       dispatch({ type: SET_SUB_CATEGORIES, payLoad: response.data });
//     } catch (err) {
//       dispatch({ type: CLOSE_LOADER });
//       console.log(err);
//       dispatch({
//         type: SET_ERROR,
//         payLoad: err.response?.data?.error?.msg,
//       });
//     }
//   };
// };

// export const getspecificSubCategory = (id) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await backendVerifiedUser.get(
//         `/get-specific-sub-category/${id}`
//       );

//       dispatch({ type: CLOSE_LOADER });

//       dispatch({ type: SET_SPECIFIC_SUB_CATEGORIES, payLoad: response.data });
//     } catch (err) {
//       dispatch({ type: CLOSE_LOADER });
//       console.log(err);
//       dispatch({
//         type: SET_ERROR,
//         payLoad: err.response?.data?.error?.msg,
//       });
//     }
//   };
// };

// export const updateSubCategory = (data, id) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await backendVerifiedUser.post(
//         `/update-sub-category/${id}`,
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
//     }
//     return false;
//   };
// };

// export const deleteMultipleSubCategory = (subCategoryIds) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await backendVerifiedUser.post(
//         `/delete-multiple-sub-category`,
//         subCategoryIds
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
//     }
//     return false;
//   };
// };

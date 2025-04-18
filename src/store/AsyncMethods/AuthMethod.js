import backend from "../../api/backend";
import {
  CLOSE_LOADER,
  SET_ERROR,
  SET_SUCCESS,
  LOGOUT,
  RESET_ERROR,
  RESET_SUCCESS,
  SET_LOADER,
  SET_TOKEN,
  SET_VALIDATE_ERROR,
  RESET_VALIDATE_ERROR,
} from "../Types/AuthTypes";

// export const userRegister = (data, formik) => {
//   return async (dispatch) => {
//     dispatch({ type: SET_LOADER });
//     try {
//       const response = await safwaAuth.post("/register", data);
//       dispatch({ type: CLOSE_LOADER });
//       console.log(response);
//       dispatch({ type: SET_SUCCESS, payLoad: response.data.data.message });
//       localStorage.setItem("myToken", JSON.stringify(response.data.data.data));
//       dispatch({ type: SET_TOKEN });
//       formik.resetForm();
//       return true;
//     } catch (err) {
//       dispatch({ type: CLOSE_LOADER });
//       console.log(err);
//       if (err.response.status === 422) {
//         dispatch({
//           type: SET_VALIDATE_ERROR,
//           payLoad: err.response.data?.errors,
//         });
//       } else {
//         dispatch({
//           type: SET_ERROR,
//           payLoad: err.response.data?.error?.error,
//         });
//       }
//       return false;
//     }
//   };
// };

export const userLogin = (data, formik) => {
  return async (dispatch) => {
    const { email, password } = data;
    dispatch({ type: SET_LOADER });
    try {
      const response = await backend.post("/login", {
        email,
        password,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: RESET_ERROR });
      dispatch({ type: SET_SUCCESS, payLoad: response.data.success.msg });
      localStorage.setItem("myToken", response.data.token);
      dispatch({ type: SET_TOKEN, payLoad: response.data.token });
      formik.resetForm();
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

export const setNewPassword = (data, url) => {
  return async (dispatch) => {
    const { password } = data;
    dispatch({ type: SET_LOADER });
    try {
      const response = await backend.post(url, {
        password,
      });
      dispatch({ type: CLOSE_LOADER });
      dispatch({ type: RESET_ERROR });
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

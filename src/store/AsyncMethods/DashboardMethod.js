import { CLOSE_LOADER, SET_ERROR, SET_LOADER } from "../Types/AuthTypes";
import {
  SET_DASHBOARD_CHART_DATA,
  SET_DASHBOARD_COUNT,
} from "../Types/DashboardTypes";
import backendVerifiedUser from "../../api/backendVerifiedUser";

export const getDashboardCount = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get("/get-dashboard-count");

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_DASHBOARD_COUNT, payLoad: response.data });
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

export const getDashboardCartData = () => {
  return async (dispatch) => {
    dispatch({ type: SET_LOADER });
    try {
      const response = await backendVerifiedUser.get(
        "/get-dashboard-chart-data"
      );

      dispatch({ type: CLOSE_LOADER });

      dispatch({ type: SET_DASHBOARD_CHART_DATA, payLoad: response.data });
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

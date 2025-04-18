import {
  RESET_DASHBOARD_CHART_DATA,
  RESET_DASHBOARD_COUNT,
  SET_DASHBOARD_CHART_DATA,
  SET_DASHBOARD_COUNT,
} from "../Types/DashboardTypes";

const initialState = {
  dashboardCount: null,
  chartData: [],
};

const DashboardReducer = (state = initialState, action) => {
  if (action.type === SET_DASHBOARD_COUNT) {
    return { ...state, dashboardCount: action.payLoad };
  } else if (action.type === RESET_DASHBOARD_COUNT) {
    return { ...state, dashboardCount: null };
  } else if (action.type === SET_DASHBOARD_CHART_DATA) {
    return { ...state, chartData: action.payLoad };
  } else if (action.type === RESET_DASHBOARD_CHART_DATA) {
    return { ...state, chartData: [] };
  } else {
    return state;
  }
};

export default DashboardReducer;

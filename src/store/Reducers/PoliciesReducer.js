import {
  RESET_POLICIES,
  RESET_SPECIFIC_POLICIES,
  SET_POLICIES,
  SET_SPECIFIC_POLICIES,
} from "../Types/PoliciesTypes";

const initialState = {
  POLICIES: [],
  specificPOLICIES: null,
};

const PoliciesReducer = (state = initialState, action) => {
  if (action.type === SET_POLICIES) {
    return { ...state, POLICIES: action.payLoad };
  } else if (action.type === RESET_POLICIES) {
    return { ...state, POLICIES: [] };
  } else if (action.type === SET_SPECIFIC_POLICIES) {
    return { ...state, specificPOLICIES: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_POLICIES) {
    return { ...state, specificPOLICIES: null };
  } else {
    return state;
  }
};

export default PoliciesReducer;

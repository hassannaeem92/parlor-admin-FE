import {
  RESET_SPECIFIC_VENDORS,
  RESET_VENDORS,
  SET_SPECIFIC_VENDORS,
  SET_VENDORS,
} from "../Types/VendorTypes";

const initialState = {
  allVendors: [],
  specificVendor: null,
};

const VendorReducer = (state = initialState, action) => {
  if (action.type === SET_VENDORS) {
    return { ...state, allVendors: action.payLoad };
  } else if (action.type === RESET_VENDORS) {
    return { ...state, allVendors: [] };
  } else if (action.type === SET_SPECIFIC_VENDORS) {
    return { ...state, specificVendor: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_VENDORS) {
    return { ...state, specificVendor: null };
  } else {
    return state;
  }
};

export default VendorReducer;

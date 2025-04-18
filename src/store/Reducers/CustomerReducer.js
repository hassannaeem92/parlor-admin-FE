import {
  RESET_CUSTOMERS,
  RESET_SPECIFIC_CUSTOMERS,
  SET_CUSTOMERS,
  SET_SPECIFIC_CUSTOMERS,
} from "../Types/CustomerTypes";

const initialState = {
  allCustomers: [],
  specificCustomer: null,
};

const CustomersReducer = (state = initialState, action) => {
  if (action.type === SET_CUSTOMERS) {
    return { ...state, allCustomers: action.payLoad };
  } else if (action.type === RESET_CUSTOMERS) {
    return { ...state, allCustomers: [] };
  } else if (action.type === SET_SPECIFIC_CUSTOMERS) {
    return { ...state, specificCustomer: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_CUSTOMERS) {
    return { ...state, specificCustomer: null };
  } else {
    return state;
  }
};

export default CustomersReducer;

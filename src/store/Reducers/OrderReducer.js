import {
  RESET_ORDERS,
  RESET_SPECIFIC_ORDER,
  SET_ORDERS,
  SET_SPECIFIC_ORDER,
} from "../Types/OrderTypes";

const initialState = {
  allOrders: [],
  specificOrder: null,
};

const OrderReducer = (state = initialState, action) => {
  if (action.type === SET_ORDERS) {
    return { ...state, allOrders: action.payLoad };
  } else if (action.type === RESET_ORDERS) {
    return { ...state, allOrders: [] };
  } else if (action.type === SET_SPECIFIC_ORDER) {
    return { ...state, specificOrder: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_ORDER) {
    return { ...state, specificOrder: null };
  } else {
    return state;
  }
};

export default OrderReducer;

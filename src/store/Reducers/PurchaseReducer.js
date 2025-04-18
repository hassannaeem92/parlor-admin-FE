import {
  RESET_PURCHASES,
  RESET_SPECIFIC_PURCHASE,
  SET_PURCHASES,
  SET_SPECIFIC_PURCHASE,
} from "../Types/PurchaseTypes";

const initialState = {
  allPurchases: [],
  specificPurchase: null,
};

const PurchaseReducer = (state = initialState, action) => {
  if (action.type === SET_PURCHASES) {
    return { ...state, allPurchases: action.payLoad };
  } else if (action.type === RESET_PURCHASES) {
    return { ...state, allPurchases: [] };
  } else if (action.type === SET_SPECIFIC_PURCHASE) {
    return { ...state, specificPurchase: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_PURCHASE) {
    return { ...state, specificPurchase: null };
  } else {
    return state;
  }
};

export default PurchaseReducer;

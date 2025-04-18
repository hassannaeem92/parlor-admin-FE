import {
  RESET_CURRENCY,
  RESET_ENABLE_CURRENCY,
  RESET_SPECIFIC_CURRENCY,
  SET_CURRENCY,
  SET_ENABLE_CURRENCY,
  SET_SPECIFIC_CURRENCY,
} from "../Types/CurrencyTypes";

const initialState = {
  allCurrency: [],
  specificCurrency: null,
  enableCurrency: null,
};

const CurrencyReducer = (state = initialState, action) => {
  if (action.type === SET_CURRENCY) {
    return { ...state, allCurrency: action.payLoad };
  } else if (action.type === RESET_CURRENCY) {
    return { ...state, allCurrency: [] };
  } else if (action.type === SET_SPECIFIC_CURRENCY) {
    return { ...state, specificCurrency: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_CURRENCY) {
    return { ...state, specificCurrency: null };
  } else if (action.type === SET_ENABLE_CURRENCY) {
    return { ...state, enableCurrency: action.payLoad };
  } else if (action.type === RESET_ENABLE_CURRENCY) {
    return { ...state, enableCurrency: null };
  } else {
    return state;
  }
};

export default CurrencyReducer;

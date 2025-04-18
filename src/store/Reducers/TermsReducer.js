import {
  RESET_TERMS,
  RESET_SPECIFIC_TERMS,
  SET_TERMS,
  SET_SPECIFIC_TERMS,
} from "../Types/TermsTypes";

const initialState = {
  TERMS: [],
  specificTERMS: null,
};

const TermsReducer = (state = initialState, action) => {
  if (action.type === SET_TERMS) {
    return { ...state, TERMS: action.payLoad };
  } else if (action.type === RESET_TERMS) {
    return { ...state, TERMS: [] };
  } else if (action.type === SET_SPECIFIC_TERMS) {
    return { ...state, specificTERMS: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_TERMS) {
    return { ...state, specificTERMS: null };
  } else {
    return state;
  }
};

export default TermsReducer;

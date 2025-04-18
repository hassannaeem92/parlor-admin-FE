import {
  RESET_FAQS,
  RESET_SPECIFIC_FAQS,
  SET_FAQS,
  SET_SPECIFIC_FAQS,
} from "../Types/FAQsTypes";

const initialState = {
  FAQS: [],
  specificFAQS: null,
};

const FAQsReducer = (state = initialState, action) => {
  if (action.type === SET_FAQS) {
    return { ...state, FAQS: action.payLoad };
  } else if (action.type === RESET_FAQS) {
    return { ...state, FAQS: [] };
  } else if (action.type === SET_SPECIFIC_FAQS) {
    return { ...state, specificFAQS: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_FAQS) {
    return { ...state, specificFAQS: null };
  } else {
    return state;
  }
};

export default FAQsReducer;

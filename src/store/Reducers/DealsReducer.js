import {
  RESET_DEALS,
  SET_DEALS,
  SET_SPECIFIC_DEAL,
  RESET_SPECIFIC_DEAL,

} from "../Types/DealsTypes";

const initialState = {
  deals: [],
  specificDeals: null,
//   subCategories: [],
//   specificSubCategory: null,
};

const DealsReducer = (state = initialState, action) => {
    
  if (action.type === SET_DEALS) {
    return { ...state, deals: action.payLoad };
  } else if (action.type === RESET_DEALS) {
    return { ...state, deals: [] };
  } else if (action.type === SET_SPECIFIC_DEAL) {
    return { ...state, specificDeals: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_DEAL) {
    return { ...state, specificDeals: null };
//   } else if (action.type === SET_SUB_CATEGORIES) {
//     return { ...state, subCategories: action.payLoad };
//   } else if (action.type === RESET_SUB_CATEGORIES) {
//     return { ...state, subCategories: [] };
//   } else if (action.type === SET_SPECIFIC_SUB_CATEGORIES) {
//     return { ...state, specificSubCategory: action.payLoad };
//   } else if (action.type === RESET_SPECIFIC_SUB_CATEGORIES) {
//     return { ...state, specificSubCategory: null };
  } else {
    return state;
  }
};

export default DealsReducer;

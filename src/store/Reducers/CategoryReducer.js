import {
  RESET_CATEGORIES,
  RESET_SPECIFIC_CATEGORIES,
  RESET_SPECIFIC_SUB_CATEGORIES,
  RESET_SUB_CATEGORIES,
  SET_CATEGORIES,
  SET_SPECIFIC_CATEGORIES,
  SET_SPECIFIC_SUB_CATEGORIES,
  SET_SUB_CATEGORIES,
} from "../Types/CategoryTypes";

const initialState = {
  categories: [],
  specificCategory: null,
  subCategories: [],
  specificSubCategory: null,
};

const CategoryReducer = (state = initialState, action) => {
  if (action.type === SET_CATEGORIES) {
    return { ...state, categories: action.payLoad };
  } else if (action.type === RESET_CATEGORIES) {
    return { ...state, categories: [] };
  } else if (action.type === SET_SPECIFIC_CATEGORIES) {
    return { ...state, specificCategory: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_CATEGORIES) {
    return { ...state, specificCategory: null };
  } else if (action.type === SET_SUB_CATEGORIES) {
    return { ...state, subCategories: action.payLoad };
  } else if (action.type === RESET_SUB_CATEGORIES) {
    return { ...state, subCategories: [] };
  } else if (action.type === SET_SPECIFIC_SUB_CATEGORIES) {
    return { ...state, specificSubCategory: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_SUB_CATEGORIES) {
    return { ...state, specificSubCategory: null };
  } else {
    return state;
  }
};

export default CategoryReducer;

import { RESET_SPECIFIC_CATEGORIES } from "../Types/CategoryTypes";
import {
  RESET_ALL_VARIENTS,
  RESET_ARTICLE_NUM,
  RESET_OPTION_VALUES,
  RESET_PRODUCTS,
  RESET_SPECIFIC_PRODUCT,
  RESET_SPECIFIC_VARIENTS,
  RESET_VARIENT_OPTIONS,
  SET_ALL_VARIENTS,
  SET_ARTICLE_NUM,
  SET_OPTION_VALUES,
  SET_PRODUCTS,
  SET_SPECIFIC_PRODUCT,
  SET_SPECIFIC_VARIENTS,
  SET_VARIENT_OPTIONS,
} from "../Types/ProductTypes";

const initialState = {
  products: [],
  specificProduct: null,
  variantOptions: [],
  optionValues: [],
  specificVariants: [],
  allVariants: [],
  articleNum: "",
};

const ProductReducer = (state = initialState, action) => {
  if (action.type === SET_PRODUCTS) {
    return { ...state, products: action.payLoad };
  } else if (action.type === RESET_PRODUCTS) {
    return { ...state, products: [] };
  } else if (action.type === SET_SPECIFIC_PRODUCT) {
    return { ...state, specificProduct: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_PRODUCT) {
    return { ...state, specificProduct: null };
  } else if (action.type === SET_VARIENT_OPTIONS) {
    return { ...state, varientOptions: action.payLoad };
  } else if (action.type === RESET_VARIENT_OPTIONS) {
    return { ...state, varientOptions: [] };
  } else if (action.type === SET_OPTION_VALUES) {
    return { ...state, optionValues: action.payLoad };
  } else if (action.type === RESET_OPTION_VALUES) {
    return { ...state, optionValues: [] };
  } else if (action.type === SET_SPECIFIC_VARIENTS) {
    return { ...state, specificVarients: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_VARIENTS) {
    return { ...state, specificVarients: [] };
  } else if (action.type === SET_ALL_VARIENTS) {
    return { ...state, allVarients: action.payLoad };
  } else if (action.type === RESET_ALL_VARIENTS) {
    return { ...state, allVarients: [] };
  } else if (action.type === SET_ARTICLE_NUM) {
    return { ...state, articleNum: action.payLoad };
  } else if (action.type === RESET_ARTICLE_NUM) {
    return { ...state, articleNum: "" };
  } else {
    return state;
  }
};

export default ProductReducer;

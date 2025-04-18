import {
  RESET_SERVICE_PRICES,
  SET_SERVICE_PRICES,
  SET_SPECIFIC_SERVICE_PRICE,
  RESET_SPECIFIC_SERVICE_PRICE,
  SET_WORK_IMAGES,
  RESET_WORK_IMAGES,

} from "../Types/ServicePriceTypes";

const initialState = {
  servicePrices: [],
  specificServicePrice: null,
  workImages: null
//   subCategories: [],
//   specificSubCategory: null,
};

const ServicePriceReducer = (state = initialState, action) => {
  
  if (action.type === SET_SERVICE_PRICES) {
    return { ...state, servicePrices: action.payLoad };
  } else if (action.type === RESET_SERVICE_PRICES) {
    return { ...state, servicePrices: [] };
  } else if (action.type === SET_SPECIFIC_SERVICE_PRICE) {
    return { ...state, specificServicePrice: action.payLoad };
  } else if (action.type === RESET_SPECIFIC_SERVICE_PRICE) {
    return { ...state, specificServicePrice: null };
  } else if (action.type === SET_WORK_IMAGES) {
      return { ...state, workImages: action.payLoad };
    } else if (action.type === RESET_WORK_IMAGES) {
      return { ...state, workImages: [] };
    
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

export default ServicePriceReducer;

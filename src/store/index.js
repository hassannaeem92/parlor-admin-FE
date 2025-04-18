import { createStore, applyMiddleware, combineReducers } from "redux";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import AuthReducer from "./Reducers/AuthReducer";
import CategoryReducer from "./Reducers/CategoryReducer";
import ProductReducer from "./Reducers/ProductReducer";
import UserReducer from "./Reducers/UserReducer";
import OrderReducer from "./Reducers/OrderReducer";
import CurrencyReducer from "./Reducers/CurrencyReducer";
import DashboardReducer from "./Reducers/DashboardReducer";
import PurchaseReducer from "./Reducers/PurchaseReducer";
import VendorReducer from "./Reducers/VendorReducer";
import CustomersReducer from "./Reducers/CustomerReducer";
import FAQsReducer from "./Reducers/FAQsReducer";
import TermsReducer from "./Reducers/TermsReducer";
import PoliciesReducer from "./Reducers/PoliciesReducer";
import ServicePriceReducer from "./Reducers/ServicePriceReducer";
import DealsReducer from "./Reducers/DealsReducer";
import ContactReducer from "./Reducers/ContactReducer";

const rootReducers = combineReducers({
  AuthReducer,
  CategoryReducer,
  FAQsReducer,
  ProductReducer,
  UserReducer,
  OrderReducer,
  CurrencyReducer,
  DashboardReducer,
  PurchaseReducer,
  VendorReducer,
  CustomersReducer,
  TermsReducer,
  PoliciesReducer,
  ServicePriceReducer,
  DealsReducer,
  ContactReducer,
});

const middlewares = [thunk];

const Store = createStore(
  rootReducers,
  composeWithDevTools(applyMiddleware(...middlewares))
);
export default Store;

import React, { useEffect } from "react";
import { Button } from "primereact/button";
import {
  getCategory,
  getSubCategory,
} from "../../store/AsyncMethods/CategoryMethod";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET_ERROR, RESET_SUCCESS } from "../../store/Types/AuthTypes";
import { useLocation, useNavigate } from "react-router-dom";
import { getProducts } from "../../store/AsyncMethods/ProductMethod";
import ProductTable from "./ProductTable";
import { RESET_SPECIFIC_PRODUCT } from "../../store/Types/ProductTypes";

export default function ProductMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { success, error, user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      dispatch(getSubCategory());
      dispatch(getProducts());
    }
  }, []);

  useEffect(() => {
    dispatch({ type: RESET_SPECIFIC_PRODUCT });
  }, [location.pathname]);

  return (
    <div className="">
      <div className="flex justify-end">
        <Button
          label="Add Product"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-product")}
        />
      </div>
      <div className="my-4">
        <ProductTable />
      </div>
    </div>
  );
}

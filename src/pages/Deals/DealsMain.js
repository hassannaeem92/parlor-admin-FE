import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { getServicePrice } from "../../store/AsyncMethods/ServicePriceMethod";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET_ERROR, RESET_SUCCESS } from "../../store/Types/AuthTypes";
// import CategoriesTable from "./CategoriesTable";
// import ServicePriceTable from "./ServicePriceTable";
import { useNavigate } from "react-router-dom";
import DealsTable from "./DealsTable";
import { getDeals } from "../../store/AsyncMethods/DealsMethod";

export default function ServicePriceMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error, user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      dispatch(getDeals());
    }
  }, []);

  return (
    <div className="mx-3">
      <div className="flex justify-end">
        <Button
          label="Add Deals"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-deals")}
        />
      </div>

      <div className="my-4">
        <DealsTable />
      </div>
    </div>
  );
}

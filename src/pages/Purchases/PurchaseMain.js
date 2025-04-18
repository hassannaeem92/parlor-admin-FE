import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PurchaseTable from "./PurchaseTable";
import { getPurchases } from "../../store/AsyncMethods/PurchaseMethod";
import { getVendors } from "../../store/AsyncMethods/VendorMethod";

export default function PurchaseMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (user) {
      dispatch(getPurchases());
    }
  }, []);
  return (
    <div className="mx-3">
      <div className="flex justify-end">
        <Button
          label="Add Purchase"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-purchase")}
        />
      </div>

      <div className="my-4">
        <PurchaseTable />
      </div>
    </div>
  );
}

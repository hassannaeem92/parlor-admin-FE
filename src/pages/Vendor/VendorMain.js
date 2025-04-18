import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getVendors } from "../../store/AsyncMethods/VendorMethod";
import VendorTable from "./VendorTable";

export default function VendorMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (user) {
      dispatch(getVendors());
    }
  }, []);
  return (
    <div className="mx-3">
      <div className="flex justify-end">
        <Button
          label={t("Add Vendor")}
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-vendor")}
        />
      </div>

      <div className="my-4">
        <VendorTable />
      </div>
    </div>
  );
}

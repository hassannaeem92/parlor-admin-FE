import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { getCustomers } from "../../store/AsyncMethods/CustomerMethod";
import CustomerTable from "./CustomerTable";

export default function CustomersMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (user) {
      dispatch(getCustomers());
    }
  }, []);
  return (
    <div className="mx-3">
      <div className="flex justify-end">
        <Button
          label={t("Add Customer")}
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-customers")}
        />
      </div>

      <div className="my-4">
        <CustomerTable />
      </div>
    </div>
  );
}

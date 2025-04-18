import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getCurrency } from "../../store/AsyncMethods/CurrencyMethod";
import CurrencyTable from "./CurrencyTable";

export default function CurrencyMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (user) {
      dispatch(getCurrency());
    }
  }, []);
  return (
    <div className="mx-3">
      <div className="flex justify-end">
        <Button
          label="Add Currency"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-currency")}
        />
      </div>

      <div className="my-4">
        <CurrencyTable />
      </div>
    </div>
  );
}

import { Button } from "primereact/button";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrdersTable from "./OrdersTable";
import { getOrders } from "../../store/AsyncMethods/OrdersMethod";

export default function OrdersMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.AuthReducer);
  useEffect(() => {
    if (user) {
      dispatch(getOrders());
    }
  }, []);
  return (
    <div className="mx-3">
      <div className="flex justify-end">
        <Button
          label="Add Order"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-order")}
        />
      </div>

      <div className="my-4">
        <OrdersTable />
      </div>
    </div>
  );
}

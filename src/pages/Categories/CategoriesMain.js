import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { getCategory } from "../../store/AsyncMethods/CategoryMethod";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET_ERROR, RESET_SUCCESS } from "../../store/Types/AuthTypes";
import CategoriesTable from "./CategoriesTable";
import { useNavigate } from "react-router-dom";

export default function CategoriesMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error, user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      dispatch(getCategory());
    }
  }, []);

  return (
    <div className="mx-3">
      <div className="flex justify-end">
        <Button
          label="Add Service"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-categories")}
        />
      </div>

      <div className="my-4">
        <CategoriesTable />
      </div>
    </div>
  );
}

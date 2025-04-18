import React, { useEffect } from "react";
import { Button } from "primereact/button";
import {
  getCategory,
  getSubCategory,
} from "../../store/AsyncMethods/CategoryMethod";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET_ERROR, RESET_SUCCESS } from "../../store/Types/AuthTypes";
import { useNavigate } from "react-router-dom";
import SubCategoriesTable from "./SubCategoriesTable";

export default function SubCategoriesMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error, user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      dispatch(getSubCategory());
    }
  }, []);

  return (
    <div className="">
      <div className="flex justify-end">
        <Button
          label="Add Sub Service"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-sub-categories")}
        />
      </div>

      <div className="my-4">
        <SubCategoriesTable />
      </div>
    </div>
  );
}

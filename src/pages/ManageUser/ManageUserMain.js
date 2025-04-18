import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { RESET_ERROR, RESET_SUCCESS } from "../../store/Types/AuthTypes";
import { useNavigate } from "react-router-dom";
import UserTable from "./UserTable";
import { getUsers } from "../../store/AsyncMethods/UserMethod";

export default function ManageUserMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { success, error, user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      dispatch(getUsers());
    }
  }, []);

  return (
    <div className="mx-3">
      <div className="flex justify-end">
        <Button
          label="Add User"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-user")}
        />
      </div>

      <div className="my-4">
        <UserTable />
      </div>
    </div>
  );
}

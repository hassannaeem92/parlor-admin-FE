import React, { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { LOGOUT, RESET_SUCCESS } from "../store/Types/AuthTypes";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Home() {
  const [visible, setVisible] = useState(false);
  const { success } = useSelector((state) => state.AuthReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (success) {
      toast.success(success);
      dispatch({ type: RESET_SUCCESS });
    }
  }, [success]);

  const logout = () => {
    localStorage.removeItem("myToken");
    dispatch({ type: LOGOUT });
  };

  return (
    <div className="card flex justify-between m-2 p-4">
      <div className="font-bold text-xl w-full">Welcome</div>
      <div className="w-full flex justify-end">
        <Button label="Log out" onClick={logout} className="" />
      </div>
    </div>
  );
}

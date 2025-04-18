import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PoliciesTable from "./PoliciesTable";
import { getPolicies } from "../../store/AsyncMethods/PoliciesMethod";

export default function PoliciesMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      dispatch(getPolicies());
    }
  }, []);

  return (
    <div className="mx-3">
      <div className="flex justify-end">
        <Button
          label="Add Policies"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-policies")}
        />
      </div>

      <div className="my-4">
        <PoliciesTable />
      </div>
    </div>
  );
}

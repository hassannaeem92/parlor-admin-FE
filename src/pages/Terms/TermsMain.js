import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import TermsTable from "./TermsTable";
import { getTerms } from "../../store/AsyncMethods/TermsMethod";

export default function TermsMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      dispatch(getTerms());
    }
  }, []);

  return (
    <div className="mx-3">
      <div className="flex justify-end">
        <Button
          label="Add Terms"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-terms")}
        />
      </div>

      <div className="my-4">
        <TermsTable />
      </div>
    </div>
  );
}

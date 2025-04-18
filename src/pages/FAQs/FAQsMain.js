import React, { useEffect } from "react";
import { Button } from "primereact/button";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import FAQsTable from "./FAQsTable";
import { getFAQs } from "../../store/AsyncMethods/FAQsMethod";

export default function FAQsMain() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (user) {
      dispatch(getFAQs());
    }
  }, []);

  return (
    <div className="mx-3">
      <div className="flex justify-end">
        <Button
          label="Add FAQs"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => navigate("/add-faqs")}
        />
      </div>

      <div className="my-4">
        <FAQsTable />
      </div>
    </div>
  );
}

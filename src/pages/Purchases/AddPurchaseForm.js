import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { InputText } from "primereact/inputtext";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useNavigate } from "react-router-dom";

export default function AddPurchaseForm({ formik }) {
  const { purchaseId } = useParams();
  const { allVendors } = useSelector((state) => state.VendorReducer);
  const navigate = useNavigate();

  return (
    <div>
      <div>
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          className="p-black-btn"
          onClick={() => {
            formik.resetForm();
            navigate(-1);
          }}
        />
      </div>
      <div className="card shadow-md rounded-lg p-4 mt-1">
        <Divider>
          <span className="text-2xl font-bold text-center text-primary mx-1">
            {purchaseId ? "Edit Vendor" : "Add Vendor"}
          </span>
        </Divider>

        <div className="px-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="">
              Vendor Name
            </label>
            <span className=" w-full">
              <InputText
                id="name"
                name="name"
                className="w-full text-lg p-primary-input"
                value={formik.values.name}
                onChange={formik.handleChange}
              />
            </span>
          </div>
          {formik.touched?.name && formik.errors?.name && (
            <div className="p-error">{formik.errors?.name}</div>
          )}
        </div>

        <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="">
              Vendor Phone Number
            </label>
            <span className=" w-full">
              <InputText
                id="phone"
                name="phone"
                className="w-full text-lg p-primary-input"
                value={formik.values?.phone}
                onChange={formik.handleChange}
              />
            </span>
          </div>
          {formik.touched?.phone && formik.errors?.phone && (
            <div className="p-error">{formik.errors?.phone}</div>
          )}
        </div> */}

          <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="vendor_id" className="">
                {"Select Vendor"}
              </label>
              <Dropdown
                placeholder="Select"
                id="vendor_id"
                name="vendor_id"
                className="!w-full text-lg p-primary-input"
                value={formik.values.vendor_id}
                onChange={formik.handleChange}
                options={allVendors}
                optionLabel="name"
                optionValue="id"
                filter
                pt={{
                  root: { className: "w-full" },
                  input: { className: "w-full p-primary-input" },
                  filterIcon: { className: "ml-2" },
                  filterInput: { className: "pl-8" },
                }}
              />
            </div>
            {formik.touched?.vendor_id && formik.errors?.vendor_id && (
              <div className="p-error">{formik.errors?.vendor_id}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RESET_SPECIFIC_CATEGORIES } from "../../store/Types/CategoryTypes";

import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

import { toast } from "react-toastify";
import { Divider } from "primereact/divider";
import {
  addCurrency,
  getEnableCurrency,
  getspecificCurrency,
  updateCurrency,
} from "../../store/AsyncMethods/CurrencyMethod";
import { SelectButton } from "primereact/selectbutton";
import { RESET_SPECIFIC_CURRENCY } from "../../store/Types/CurrencyTypes";
import InputFocus from "../../hooks/InputFocus";

export default function AddCurrency() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currencyId } = useParams();
  const { specificCurrency } = useSelector((state) => state.CurrencyReducer);
  const inputRef = InputFocus();

  const statusOptions = [
    { name: "Enabled", value: true },
    { name: "Disabled", value: false },
  ];

  useEffect(() => {
    if (specificCurrency) {
      formik.setValues({
        name: specificCurrency.name || "",
        unit: specificCurrency.unit || "",
        description: specificCurrency.description || "",
        status: specificCurrency.is_active === 1 ? true : false,
      });
    }
  }, [specificCurrency]);

  const formik = useFormik({
    initialValues: {
      name: "",
      unit: "",
      description: "",
      status: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Currency Name Required"),
      unit: Yup.string().required("Currency Unit Required"),
      description: Yup.string().required("Currency Description Required"),
      status: Yup.boolean().required("Status Required"),
    }),

    onSubmit: async (data) => {
      if (currencyId) {
        dispatch(updateCurrency(data, currencyId)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch(getEnableCurrency());
            navigate("/manage-currency");
          }
        });
      } else {
        dispatch(addCurrency(data)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch(getEnableCurrency());
            navigate("/manage-currency");
          }
        });
      }
    },
  });

  useEffect(() => {
    if (currencyId) {
      dispatch(getspecificCurrency(currencyId));
    }
  }, []);

  return (
    <div className="mx-4">
      <div>
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          className="p-black-btn"
          onClick={() => navigate(-1)}
        />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow-md rounded-lg p-4 mt-4">
          <Divider>
            <span className="text-2xl font-bold text-center text-primary mx-1">
              {currencyId ? "Edit" : "Add"} Currency
            </span>
          </Divider>

          <div className="px-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="">
                  Enter Currency Name
                </label>
                <span className=" w-full">
                  <InputText
                    ref={inputRef}
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
                <label htmlFor="unit" className="">
                  Enter Currency Unit
                </label>
                <span className=" w-full">
                  <InputText
                    id="unit"
                    name="unit"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.unit}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              {formik.touched?.unit && formik.errors?.unit && (
                <div className="p-error">{formik.errors?.unit}</div>
              )}
            </div>

            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="">
                  Enter Currency Description
                </label>
                <span className=" w-full">
                  <InputText
                    id="description"
                    name="description"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              {formik.touched?.description && formik.errors?.description && (
                <div className="p-error">{formik.errors?.description}</div>
              )}
            </div>

            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="status" className="">
                  Status
                </label>
                <SelectButton
                  name="status"
                  id="status"
                  options={statusOptions}
                  optionLabel="name"
                  optionValue="value"
                  className="flex"
                  pt={{
                    root: { className: "flex" },
                    button: ({ context }) => ({
                      className: context.selected
                        ? "p-primary-highlight-btn w-full text-lg text-center"
                        : "w-full text-lg text-center",
                    }),
                  }}
                  value={formik.values.status}
                  onChange={formik.handleChange}
                />
                {formik.touched.status && formik.errors.status && (
                  <div className="p-error">{formik.errors.status}</div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-16">
            <div className="flex justify-end gap-4">
              <Button
                label="Cancel"
                icon="pi pi-times"
                className="p-red-btn"
                type="button"
                onClick={() => navigate(-1)}
              />
              <Button
                label="Clear"
                icon="pi pi-times"
                className="p-grey-btn"
                type="button"
                onClick={() => {
                  formik.resetForm();
                  dispatch({ type: RESET_SPECIFIC_CURRENCY });
                }}
              />

              <Button
                label="Submit"
                icon="pi pi-check"
                className="currency-btn"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

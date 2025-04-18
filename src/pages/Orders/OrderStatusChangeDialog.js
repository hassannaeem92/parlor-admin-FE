import { useFormik } from "formik";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { getOrders } from "../../store/AsyncMethods/OrdersMethod";
import { useDispatch } from "react-redux";

export default function OrderStatusChangeDialog({
  selectedProducts,
  setDialogVisible,
  setSelectedProducts,
  changeOrderStatus,
  statusOptions,
}) {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      status: "",
      orders: [],
    },
    validationSchema: Yup.object({
      status: Yup.string().required("Status Required"),
    }),

    onSubmit: async (data) => {
      dispatch(changeOrderStatus(data)).then((success) => {
        if (success) {
          formik.resetForm();
          dispatch(getOrders());
          setDialogVisible(false);
          setSelectedProducts(null);
        }
      });
    },
  });

  useEffect(() => {
    if (selectedProducts) {
      const idsArray = selectedProducts.map((obj) => obj.id);
      formik.setFieldValue("orders", idsArray);
    }
  }, [selectedProducts]);
  return (
    <form onSubmit={formik.handleSubmit}>
      <div className=" gap-8 grid grid-cols-1 lg:grid-cols-2 ">
        <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="status" className="">
              Status
            </label>
            <Dropdown
              id="status"
              name="status"
              className="!w-full text-lg p-primary-input"
              value={formik.values.status}
              onChange={formik.handleChange}
              placeholder="Select Status"
              options={statusOptions}
              optionLabel="name"
              optionValue="value"
              filter
              pt={{
                root: { className: "w-full" },
                input: { className: "w-full p-primary-input" },
                filterIcon: { className: "ml-3" },
                filterInput: { className: "pl-9" },
              }}
            />
          </div>
          {formik.touched?.status && formik.errors?.status && (
            <div className="p-error">{formik.errors?.status}</div>
          )}
        </div>
      </div>

      <div className="mt-8">
        <div className="flex justify-end gap-4">
          <Button
            label="Clear"
            icon="pi pi-times"
            className="p-red-btn"
            type="button"
            onClick={() => {
              formik.resetForm();
              setDialogVisible(false);
              setSelectedProducts(null);
            }}
          />
          <Button
            label="Change "
            icon="pi pi-check"
            className="p-secondary-btn"
            type="submit"
          />
        </div>
      </div>
    </form>
  );
}

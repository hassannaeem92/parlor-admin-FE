import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import ManagePicture from "./ManagePicture";
import { Dialog } from "primereact/dialog";

export default function AddVarientForm({
  formik,
  setShowVarientForm,
  setValidateVarient,
  showVarientForm,
  editingVarient,
  setEditingVarient,
}) {
  const [dialogVisible, setDialogVisible] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  const { varientOptions, optionValues } = useSelector(
    (state) => state.ProductReducer
  );
  const { enableCurrency } = useSelector((state) => state.CurrencyReducer);

  const optionValueFilter = (id) => {
    return optionValues.filter((option) => option.option_id === id);
  };

  const getVarientOptions = Array.isArray(varientOptions)
    ? varientOptions.reduce((acc, option) => {
        acc[option.label] = "";
        return acc;
      }, {})
    : {};

  const getEditVarientOptions =
    editingVarient && Array.isArray(varientOptions)
      ? varientOptions.reduce((acc, option) => {
          acc[option.label] = editingVarient[option.label];
          return acc;
        }, {})
      : null;
  const handleClear = () => {
    setShowVarientForm(false);
    setValidateVarient(false);
    setEditingVarient(null);
    setIsTouched(false);
    formik.setValues({
      ...formik.values,
      varient: {
        ...getVarientOptions,
        quantity: 0,
        price: formik?.values?.samePrice ? formik?.values?.price : 0,
        purchasePrice: formik?.values?.samePurchasePrice
          ? formik?.values?.purchasePrice
          : 0,
        discount: formik?.values?.sameDiscount ? formik?.values?.discount : 0,
      },
    });
  };

  const updateVarientInArray = (updatedVarient) => {
    const index = formik.values.varients.findIndex(
      (varient) => varient.id === editingVarient.id
    );

    if (index !== -1) {
      // Update the values of the object at the found index
      formik.values.varients[index] = {
        ...formik.values.varients[index],
        ...updatedVarient,
      };
    }

    formik.setValues({
      ...formik.values,
      varient: {
        ...getVarientOptions,
        quantity: 0,
        price: formik?.values?.samePrice ? formik?.values?.price : 0,
        purchasePrice: formik?.values?.samePurchasePrice
          ? formik?.values?.purchasePrice
          : 0,
        discount: formik?.values?.sameDiscount ? formik?.values?.discount : 0,
      },
    });

    setEditingVarient(null);
    setShowVarientForm(false);
    setIsTouched(false);

    toast.success("Varient Updated Successfully!");
  };

  const updateVarient = () => {
    if (editingVarient) {
      formik.validateForm().then((errors) => {
        if (Object.keys(errors)?.length === 0) {
          if (formik.isValid) {
            updateVarientInArray(formik.values.varient);
          }
        } else {
          formik.handleSubmit();
          console.log("Validation errors:", errors);
        }
      });
    }
  };

  const handleAddVarient = () => {
    formik.validateForm().then((errors) => {
      if (!formik.errors.varient) {
        const varientsArray = Array.isArray(formik.values.varients)
          ? formik.values.varients
          : [];

        const newVarient = formik.values.varient
          ? {
              ...formik.values.varient,
              id: formik.values.varients?.length + 1,
            }
          : {};

        formik.setValues({
          ...formik.values,
          varients: [...varientsArray, newVarient],
          varient: {
            ...getVarientOptions,
            quantity: 0,
            price: formik?.values?.samePrice ? formik?.values?.price : 0,
            purchasePrice: formik?.values?.samePurchasePrice
              ? formik?.values?.purchasePrice
              : 0,
            discount: formik?.values?.sameDiscount
              ? formik?.values?.discount
              : 0,
          },
        });

        setShowVarientForm(false);
        setValidateVarient(false);
        setIsTouched(false);
        toast.success("Varient Added Successfully!");
      } else {
        formik.handleSubmit();
        console.log("Validation errors:", errors);
      }
    });
  };

  useEffect(() => {
    if (editingVarient) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        varient: {
          ...prevValues.varient,
          ...getEditVarientOptions,
          quantity: editingVarient?.quantity || 0,
          price: editingVarient?.price || 0,
          purchasePrice: editingVarient?.purchasePrice || 0,
        },
      }));
    } else {
      formik.setValues((prevValues) => ({
        ...prevValues,
        varient: {
          ...getVarientOptions,
          quantity: 0,
          price: formik?.values?.samePrice ? formik?.values?.price : 0,
          purchasePrice: formik?.values?.samePurchasePrice
            ? formik?.values?.purchasePrice
            : 0,
          discount: formik?.values?.sameDiscount ? formik?.values?.discount : 0,
        },
      }));
    }
  }, [editingVarient]);

  return (
    <>
      <div className="mt-3 flex justify-end gap-3">
        <Button
          label="Add Varient"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => {
            setShowVarientForm(true);
            setValidateVarient(true);
            setIsTouched(false);
          }}
        />
      </div>

      {showVarientForm && (
        <div className="card shadow-md rounded-lg p-4 mt-4">
          <Divider>
            <span className="text-2xl font-bold text-center text-primary mx-1">
              {editingVarient ? "Edit" : "Add"} Varient
            </span>
          </Divider>

          <div className="px-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {varientOptions.map((varient) => {
              return (
                <div className="" key={varient.id}>
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor={"varient." + varient.label}
                      className="capitalize"
                    >
                      {varient.label}
                    </label>
                    <Dropdown
                      placeholder="Select"
                      id={"varient." + varient.label}
                      name={"varient." + varient.label}
                      className="!w-full text-lg p-primary-input"
                      value={
                        formik.values?.varient?.[`${varient?.label}`] !==
                        undefined
                          ? formik.values?.varient[`${varient?.label}`]
                          : ""
                      }
                      onChange={(e) => {
                        formik.setValues({
                          ...formik.values,
                          varient: {
                            ...formik.values.varient,
                            [varient.label]: e.value,
                          },
                        });
                        setIsTouched(true);
                      }}
                      options={optionValueFilter(varient.id)}
                      optionLabel="value"
                      optionValue={(e) => {
                        return e;
                      }}
                      filter
                      pt={{
                        root: { className: "w-full" },
                        input: { className: "w-full p-primary-input" },
                        filterIcon: { className: "ml-1" },
                        filterInput: { className: "pl-6" },
                      }}
                    />
                  </div>
                  {isTouched &&
                    formik.touched?.varient?.[varient.label] &&
                    formik.errors?.varient?.[varient.label] && (
                      <div className="p-error">
                        {formik.errors?.varient?.[varient.label]}
                      </div>
                    )}
                </div>
              );
            })}

            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="varient.purchasePrice" className="">
                  Purchase Price
                </label>
                <span className=" w-full">
                  <InputNumber
                    id="varient.purchasePrice"
                    name="varient.purchasePrice"
                    className="w-full text-lg p-primary-input"
                    value={
                      formik?.values?.samePurchasePrice
                        ? formik?.values?.purchasePrice
                        : formik?.values?.varient?.purchasePrice || 0
                    }
                    onValueChange={formik.handleChange}
                    prefix={`${enableCurrency?.unit || ""} `}
                    disabled={formik.values.samePurchasePrice}
                  />
                </span>
              </div>
              {isTouched &&
                formik.touched?.varient?.purchasePrice &&
                formik.errors?.varient?.purchasePrice && (
                  <div className="p-error">
                    {formik.errors?.varient?.purchasePrice}
                  </div>
                )}
            </div>

            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="varient.price" className="">
                  Sale Price
                </label>
                <span className=" w-full">
                  <InputNumber
                    id="varient.price"
                    name="varient.price"
                    className="w-full text-lg p-primary-input"
                    value={
                      formik?.values?.samePrice
                        ? formik?.values?.price
                        : formik?.values?.varient?.price || 0
                    }
                    onValueChange={formik.handleChange}
                    prefix={`${enableCurrency?.unit || ""} `}
                    disabled={formik.values.samePrice}
                  />
                </span>
              </div>
              {isTouched &&
                formik.touched?.varient?.price &&
                formik.errors?.varient?.price && (
                  <div className="p-error">{formik.errors?.varient?.price}</div>
                )}
            </div>

            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="varient.discount" className="">
                  Discount
                </label>
                <span className=" w-full">
                  <InputNumber
                    id="varient.discount"
                    name="varient.discount"
                    className="w-full text-lg p-primary-input"
                    value={
                      formik?.values?.sameDiscount
                        ? formik?.values?.discount
                        : formik?.values?.varient?.discount || 0
                    }
                    onValueChange={formik.handleChange}
                    prefix={`${enableCurrency?.unit || ""} `}
                    disabled={formik.values.sameDiscount}
                  />
                </span>
              </div>
              {isTouched &&
                formik.touched?.varient?.discount &&
                formik.errors?.varient?.discount && (
                  <div className="p-error">
                    {formik.errors?.varient?.discount}
                  </div>
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
                  handleClear();
                }}
              />
              <Button
                label={editingVarient ? "Edit" : "Add"}
                icon="pi pi-check"
                className="p-secondary-btn"
                onClick={() => {
                  if (editingVarient) {
                    updateVarient();
                  } else {
                    handleAddVarient();
                  }
                  setIsTouched(true);
                }}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}

import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import InputFocus from "../../hooks/InputFocus";

export default function AddPurchaseProductForm({
  formik,
  setValidateVarient,
  validateVarient,
  editingProduct,
  setEditingProduct,
  currentProductQuantity,
  setCurrentProductQuantity,
  setSelectedProductQuantity,
}) {
  const { specificVarients, products } = useSelector(
    (state) => state.ProductReducer
  );
  const inputRef = InputFocus();

  const [currentProductTitle, setCurrentProductTitle] = useState("");

  const [varientDropdownOptions, setVarientDropdownOptions] = useState([]);

  const [userCompletedWork, setUserCompletedWork] = useState(false);

  const [total, setTotal] = useState(0);

  const updatedVariantOptions = varientDropdownOptions.filter(
    (option) => option.value !== formik.values.product.varient
  );

  const calTotal = () => {
    const total =
      formik.values?.product?.quantity * formik.values?.product?.purchasePrice -
      formik.values?.product?.discount;
    setTotal(total);
    console.log(total);
  };
  useEffect(() => {
    calTotal();
    if (specificVarients && Array.isArray(specificVarients)) {
      const options = specificVarients.map((variant) => {
        const parsedOptions = JSON.parse(variant.options);

        const optionLabel = parsedOptions
          .map((option) => {
            return `${option} - ${variant[option]?.value || "N/A"}`;
          })
          .join("  |  ");
        return { label: optionLabel, value: variant.varient_id };
      });
      setVarientDropdownOptions(options);
    } else {
      setVarientDropdownOptions([]);
    }
  }, [specificVarients]);

  useEffect(() => {
    if (formik.values.product?.product) {
      const product = products.find(
        (pro) => pro.id === formik.values.product?.product
      );

      if (product) {
        setCurrentProductTitle(product?.title || "");
      } else {
        setCurrentProductTitle("");
      }
    } else {
      setCurrentProductTitle("");
    }
  }, [formik.values.product?.product]);
  useEffect(() => {
    if (formik.values.product?.varient) {
      const varient = specificVarients.find(
        (pro) => pro.varient_id === formik.values.product?.varient
      );

      if (varient) {
        setCurrentProductQuantity(varient?.quantity || 0);
        setSelectedProductQuantity(varient?.quantity || 0);

        formik.setFieldValue(
          "product.purchasePrice",
          varient.purchasePrice || 0
        );
        formik.setFieldValue("product.salePrice", varient.salePrice || 0);
        formik.setFieldValue("product.discount", varient.discount);
      } else {
        setCurrentProductQuantity(0);
        setSelectedProductQuantity(0);
      }
    } else {
      setCurrentProductQuantity(0);
      setSelectedProductQuantity(0);
    }

    calTotal();
  }, [formik.values.product?.varient, specificVarients]);

  useEffect(() => {
    formik.setFieldValue(
      "product.discount",
      ((formik.values?.product?.purchasePrice *
        formik.values?.product?.discount_value) /
        100) *
        formik.values?.product?.quantity
    );
    calTotal();
  }, [formik.values?.product?.quantity]);

  const handleClear = () => {
    setUserCompletedWork(true);

    setValidateVarient(false);
    setEditingProduct(null);
    formik.setValues({
      ...formik.values,
      product: {
        purchasePrice: 0,
        salePrice: 0,
        product: "",
        varient: "",
        discount: 0,
        quantity: 1,
        total: 0,
        discount_value: 0,
        is_discount_percentage: true,
      },
    });
    setUserCompletedWork(false);
  };

  const updateProductInArray = (updatedProduct) => {
    console.log(updateProduct);
    const index = formik.values.products.findIndex(
      (product) => product.id === editingProduct.id
    );

    if (index !== -1) {
      formik.values.products[index] = {
        ...formik.values.products[index],
        ...updatedProduct,
      };
    }

    formik.setValues({
      ...formik.values,
      product: {
        purchasePrice: 0,
        salePrice: 0,
        product: "",
        varient: "",
        discount: 0,
        quantity: 1,
        total: 0,
        discount_value: 0,
        is_discount_percentage: true,
      },
    });

    setEditingProduct(null);

    toast.success("Varient Updated Successfully!");
    setUserCompletedWork(false);
  };

  const updateProduct = () => {
    if (editingProduct) {
      formik.validateForm().then((errors) => {
        if (Object.keys(errors)?.length === 0) {
          if (formik.isValid) {
            updateProductInArray(formik.values.product);
          }
        } else {
          console.log("Validation errors:", errors);
        }
      });
    }
  };

  const handleAddVarient = () => {
    setValidateVarient(true);
    formik.validateForm().then((errors) => {
      if (Object.keys(errors)?.length === 0) {
        if (formik.isValid) {
          const productsArray = Array.isArray(formik.values.products)
            ? formik.values.products
            : [];
          const existingProductIndex = productsArray.findIndex(
            (product) => product.varient === formik.values.product.varient
          );

          if (existingProductIndex !== -1) {
            const updatedProducts = [...productsArray];
            const existingProduct = updatedProducts[existingProductIndex];
            const newQuantity =
              existingProduct.quantity + formik.values.product.quantity;

            const newTotal =
              existingProduct.total + formik.values.product.total;
            const newDiscount =
              existingProduct.discount + formik.values.product.discount;

            updatedProducts[existingProductIndex] = {
              ...existingProduct,
              quantity: newQuantity,
              total: newTotal,
              discount: newDiscount,
            };

            formik.setValues({
              ...formik.values,
              products: updatedProducts,
              product: {
                purchasePrice: 0,
                salePrice: 0,
                product: "",
                varient: "",
                discount: 0,
                quantity: 1,
                total: 0,
                discount_value: 0,
                is_discount_percentage: true,
              },
            });
          } else {
            const newProduct = formik.values.product
              ? {
                  ...formik.values.product,
                  id: formik.values.products?.length + 1,
                }
              : {};

            formik.setValues({
              ...formik.values,
              products: [...productsArray, newProduct],
              product: {
                purchasePrice: 0,
                salePrice: 0,
                product: "",
                varient: "",
                discount: 0,
                quantity: 1,
                total: 0,
                discount_value: 0,
                is_discount_percentage: true,
              },
            });
          }

          setValidateVarient(false);

          // Update the variantDropdownOptions
          const updatedVariantOptions = varientDropdownOptions.filter(
            (option) => option.value !== formik.values.product.varient
          );
          setVarientDropdownOptions(updatedVariantOptions);

          toast.success("Variant Added Successfully!");
          setUserCompletedWork(false);
        }
      } else {
        formik.handleSubmit();
        console.log("Validation errors:", errors);
      }
    });
  };

  useEffect(() => {
    if (editingProduct) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        product: {
          ...prevValues.product,
          purchasePrice: editingProduct?.purchasePrice,
          salePrice: editingProduct?.salePrice, // Set the salePrice field
          product: editingProduct?.product,
          varient: editingProduct?.varient,
          discount: editingProduct?.discount,
          quantity: editingProduct?.quantity,
          total: editingProduct?.total,
          discount_value: editingProduct?.discount_value,
          is_discount_percentage: editingProduct?.is_discount_percentage,
        },
      }));
    }
    calTotal();
  }, [editingProduct]);

  useEffect(() => {
    if (
      formik.values?.product?.purchasePrice === 0 &&
      formik.values?.product?.salePrice === 0 &&
      formik.values?.product?.product === "" &&
      formik.values?.product?.varient === "" &&
      formik.values?.product?.discount === 0 &&
      formik.values?.product?.quantity === 1 &&
      formik.values?.product?.total === 0 &&
      formik.values?.product?.discount_value === 0 &&
      formik.values?.product?.is_discount_percentage === true &&
      formik.values?.products?.length !== 0
    ) {
      setValidateVarient(false);
    } else {
      setValidateVarient(true);
    }
    calTotal();
  }, [formik.values?.product]);

  useEffect(() => {
    const salePrice =
      formik.values.product.purchasePrice - formik.values.product.discount;
  }, [formik.values.product.purchasePrice, formik.values.product.discount]);

  return (
    <>
      <div className="card shadow-md rounded-lg p-4 mt-4">
        <Divider>
          <span className="text-2xl font-bold text-center text-primary mx-1">
            {editingProduct ? "Update" : "Add"} Product
          </span>
        </Divider>

        <div className="px-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="product.product" className="">
                Article Number
              </label>
              <Dropdown
                id="product.product"
                name="product.product"
                className="!w-full text-lg p-primary-input"
                value={formik.values?.product?.product}
                onChange={formik.handleChange}
                options={products}
                optionLabel={(option) => `${option.article_name}`}
                optionValue="id"
                filter
                placeholder="Select Article Number"
                showClear
                disabled={editingProduct ? true : false}
                pt={{
                  root: { className: "w-full" },
                  input: { className: "w-full p-primary-input" },
                  filterIcon: { className: "ml-2" },
                  filterInput: { className: "pl-8" },
                }}
              />
            </div>
            {formik.touched?.product?.product &&
              formik.errors?.product?.product && (
                <div className="p-error">{formik.errors?.product?.product}</div>
              )}
          </div>

          <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="">
                Product Title
              </label>
              <span className=" w-full">
                <InputText
                  ref={inputRef}
                  id="name"
                  name="name"
                  className="w-full text-lg p-primary-input"
                  value={currentProductTitle}
                  disabled
                />
              </span>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="product.varient" className="">
                Varient
              </label>
              <Dropdown
                id="product.varient"
                name="product.varient"
                className="!w-full text-lg p-primary-input"
                value={formik.values?.product?.varient}
                onChange={formik.handleChange}
                options={varientDropdownOptions}
                optionLabel="label"
                optionValue="value"
                placeholder="Select Varient"
                showClear
                filter
                pt={{
                  root: { className: "w-full" },
                  input: { className: "w-full p-primary-input" },
                  filterIcon: { className: "ml-2" },
                  filterInput: { className: "pl-8" },
                  item: { className: "capitalize" },
                }}
              />
            </div>
            {formik.touched?.product?.varient &&
              formik.errors?.product?.varient && (
                <div className="p-error">{formik.errors?.product?.varient}</div>
              )}
          </div>

          <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="product.quantity" className="">
                Quantity
              </label>
              <span className=" w-full">
                <InputNumber
                  id="product.quantity"
                  name="product.quantity"
                  className="w-full text-lg p-primary-input"
                  value={formik.values?.product?.quantity}
                  onValueChange={formik.handleChange}
                  // suffix={` of ${
                  //   editingProduct
                  //     ? currentProductQuantity + editingProduct?.quantity || 0
                  //     : currentProductQuantity
                  // }`}
                />
              </span>
            </div>
            {formik.touched?.product?.quantity &&
              formik.errors?.product?.quantity && (
                <div className="p-error">
                  {formik.errors?.product?.quantity}
                </div>
              )}
          </div>

          <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="product.purchasePrice" className="">
                Purchase Price
              </label>
              <span className="w-full">
                <InputNumber
                  id="product.purchasePrice"
                  name="product.purchasePrice"
                  className="w-full text-lg p-primary-input"
                  value={formik?.values?.product?.purchasePrice}
                  onValueChange={formik.handleChange}
                  prefix="RS "
                />
              </span>
            </div>
            {formik.touched?.product?.purchasePrice &&
              formik.errors?.product?.purchasePrice && (
                <div className="p-error">
                  {formik.errors?.product?.purchasePrice}
                </div>
              )}
          </div>

          <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="product.salePrice" className="">
                Sale Price
              </label>
              <span className="w-full">
                <InputNumber
                  id="product.salePrice"
                  name="product.salePrice"
                  className="w-full text-lg p-primary-input"
                  value={formik.values.product.salePrice}
                  onValueChange={formik.handleChange}
                  prefix="RS "
                />
              </span>
            </div>
          </div>

          <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="product.discount" className="">
                Discount Amount
              </label>
              <span className=" w-full">
                <InputNumber
                  id="product.discount"
                  name="product.discount"
                  className="w-full text-lg p-primary-input"
                  value={formik.values?.product?.discount}
                  onValueChange={formik.handleChange}
                  prefix="RS "
                />
              </span>
            </div>
            {formik.touched?.product?.discount &&
              formik.errors?.product?.discount && (
                <div className="p-error">
                  {formik.errors?.product?.discount}
                </div>
              )}
          </div>

          <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="product.total" className="">
                Total Amount
              </label>
              <span className="w-full">
                <InputNumber
                  id="product.total"
                  name="product.total"
                  className="w-full text-lg p-primary-input"
                  value={total}
                  disabled
                  prefix="RS "
                />
              </span>
            </div>
            {formik.touched?.product?.total &&
              formik.errors?.product?.total && (
                <div className="p-error">{formik.errors?.product?.total}</div>
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
              onClick={handleClear}
            />
            <Button
              label={editingProduct ? "Update" : "Add"}
              icon="pi pi-check"
              className="p-secondary-btn"
              type="button"
              onClick={editingProduct ? updateProduct : handleAddVarient}
              disabled={!validateVarient}
            />
          </div>
        </div>
      </div>
    </>
  );
}

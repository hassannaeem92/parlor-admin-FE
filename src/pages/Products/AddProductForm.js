import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import InputFocus from "../../hooks/InputFocus";
import { useEffect } from "react";

export default function AddProductForm({
  formik,
  filterSubCategories,
  product,
}) {
  const { categories } = useSelector((state) => state.CategoryReducer);
  const { enableCurrency } = useSelector((state) => state.CurrencyReducer);
  const { productId } = useParams();
  const inputRef = InputFocus();

  const statusOptions = [
    { name: "Active", value: true },
    { name: "Deactive", value: false },
  ];

  const handleSameDiscountClick = () => {
    formik.setFieldValue("sameDiscount", !formik.values.sameDiscount);
  };

  const handleSamePurchasePriceClick = () => {
    formik.setFieldValue("samePurchasePrice", !formik.values.samePurchasePrice);
  };

  const handleSamePriceClick = () => {
    formik.setFieldValue("samePrice", !formik.values.samePrice);
  };

  useEffect(() => {
    if (product) {
      formik.setValues({
        title: product.title || "",
        articleName: product.articleName || "",
        categoryId: product.categoryId || "",
        subCategoryId: product.subCategoryId || "",
        purchasePrice: product.purchasePrice || "",
        samePurchasePrice: product.samePurchasePrice || false,
        price: product.price || "",
        samePrice: product.samePrice || false,
        discount: product.discount || "",
        sameDiscount: product.sameDiscount || false,
        status: product.status || true,
        description: product.description || "",
      });
    }
  }, [product]);

  return (
    <div className="card shadow-md rounded-lg p-4 mt-1">
      <Divider>
        <span className="text-2xl font-bold text-center text-primary mx-1">
          {productId ? "Edit Product" : "Add Product"}
        </span>
      </Divider>

      <div className="px-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="title" className="">
              Product Title
            </label>
            <span className=" w-full">
              <InputText
                ref={inputRef}
                id="title"
                name="title"
                className="w-full text-lg p-primary-input"
                value={formik.values.title}
                onChange={formik.handleChange}
              />
            </span>
          </div>
          {formik.touched?.title && formik.errors?.title && (
            <div className="p-error">{formik.errors?.title}</div>
          )}
        </div>

        <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="articleName" className="">
              Article Number
            </label>
            <span className=" w-full">
              <InputText
                id="articleName"
                name="articleName"
                className="w-full text-lg p-primary-input"
                value={formik.values.articleName}
                onChange={formik.handleChange}
              />
            </span>
          </div>
          {formik.touched?.articleName && formik.errors?.articleName && (
            <div className="p-error">{formik.errors?.articleName}</div>
          )}
        </div>

        <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="categoryId" className="">
              Select Category
            </label>
            <Dropdown
              placeholder="Select"
              id="categoryId"
              name="categoryId"
              className="!w-full text-lg p-primary-input"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              options={categories}
              optionLabel="name"
              optionValue="id"
              filter
              pt={{
                root: { className: "w-full" },
                input: { className: "w-full p-primary-input" },
                filterIcon: { className: "ml-1" },
                filterInput: { className: "pl-6" },
              }}
            />
          </div>
          {formik.touched?.categoryId && formik.errors?.categoryId && (
            <div className="p-error">{formik.errors?.categoryId}</div>
          )}
        </div>

        <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="subCategoryId" className="">
              Select Sub Category
            </label>
            <Dropdown
              placeholder="Select"
              id="subCategoryId"
              name="subCategoryId"
              className="!w-full text-lg p-primary-input"
              value={formik.values.subCategoryId}
              onChange={formik.handleChange}
              options={filterSubCategories}
              optionLabel="name"
              optionValue="id"
              filter
              pt={{
                root: { className: "w-full" },
                input: { className: "w-full p-primary-input" },
                filterIcon: { className: "ml-1" },
                filterInput: { className: "pl-6" },
              }}
            />
          </div>
          {formik.touched?.subCategoryId && formik.errors?.subCategoryId && (
            <div className="p-error">{formik.errors?.subCategoryId}</div>
          )}
        </div>

        <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="purchasePrice" className="">
              Purchase Price
            </label>
            <span className=" w-full">
              <InputNumber
                id="purchasePrice"
                name="purchasePrice"
                className="w-full text-lg p-primary-input"
                value={formik.values.purchasePrice}
                onValueChange={(e) =>
                  formik.setFieldValue("purchasePrice", e.value)
                }
                prefix={`${enableCurrency?.unit || ""} `}
                disabled={!formik.values.samePurchasePrice}
              />
            </span>
          </div>
          {formik.touched?.purchasePrice && formik.errors?.purchasePrice && (
            <div className="p-error">{formik.errors?.purchasePrice}</div>
          )}
          <div
            className="mt-2 cursor-pointer"
            onClick={handleSamePurchasePriceClick}
          >
            <Checkbox
              inputId="samePurchasePrice"
              name="samePurchasePrice"
              id="samePurchasePrice"
              onChange={(e) =>
                formik.setFieldValue("samePurchasePrice", e.checked)
              }
              checked={formik.values.samePurchasePrice}
              pt={{
                input: ({ context }) => ({
                  className: context.checked
                    ? "bg-primary border-primary hover:border-primary"
                    : "hover:border-primary",
                }),
                icon: { className: "font-bold" },
              }}
            />
            <label htmlFor="samePurchasePrice" className="ml-2 cursor-pointer">
              Same Price for all variants
            </label>
          </div>
        </div>

        <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="">
              Sale Price
            </label>
            <span className=" w-full">
              <InputNumber
                id="price"
                name="Price"
                className="w-full text-lg p-primary-input"
                value={formik.values.price}
                onValueChange={(e) => formik.setFieldValue("price", e.value)}
                prefix={`${enableCurrency?.unit || ""} `}
                disabled={!formik.values.samePrice}
              />
            </span>
          </div>
          {formik.touched?.price && formik.errors?.price && (
            <div className="p-error">{formik.errors?.price}</div>
          )}
          <div className="mt-2 cursor-pointer" onClick={handleSamePriceClick}>
            <Checkbox
              inputId="samePrice"
              name="samePrice"
              id="samePrice"
              onChange={(e) => formik.setFieldValue("samePrice", e.checked)}
              checked={formik.values.samePrice}
              pt={{
                input: ({ context }) => ({
                  className: context.checked
                    ? "bg-primary border-primary hover:border-primary"
                    : "hover:border-primary",
                }),
                icon: { className: "font-bold" },
              }}
            />
            <label htmlFor="samePrice" className="ml-2 cursor-pointer">
              Same Price for all variants
            </label>
          </div>
        </div>

        <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="discount" className="">
              Discount
            </label>
            <span className=" w-full">
              <InputNumber
                id="discount"
                name="discount"
                className="w-full text-lg p-primary-input"
                value={formik.values.discount}
                onValueChange={(e) => formik.setFieldValue("discount", e.value)}
                prefix={`${enableCurrency?.unit || ""} `}
                disabled={!formik.values.sameDiscount}
              />
            </span>
          </div>
          {formik.touched?.discount && formik.errors?.discount && (
            <div className="p-error">{formik.errors?.discount}</div>
          )}
          <div
            className="mt-2 cursor-pointer"
            onClick={handleSameDiscountClick}
          >
            <Checkbox
              inputId="sameDiscount"
              name="sameDiscount"
              id="sameDiscount"
              onChange={(e) => formik.setFieldValue("sameDiscount", e.checked)}
              checked={formik.values.sameDiscount}
              pt={{
                input: ({ context }) => ({
                  className: context.checked
                    ? "bg-primary border-primary hover:border-primary"
                    : "hover:border-primary",
                }),
                icon: { className: "font-bold" },
              }}
            />
            <label htmlFor="sameDiscount" className="ml-2 cursor-pointer">
              Same Discount for all variants
            </label>
          </div>
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

        <div className="col-span-1 lg:col-span-2">
          <div className="flex flex-col gap-2">
            <label htmlFor="description" className="">
              Description
            </label>
            <span className="w-full">
              <InputText
                id="description"
                name="description"
                className="w-full text-lg p-primary-input"
                value={formik.values.description}
                onChange={formik.handleChange}
              />
            </span>
          </div>
          {formik.touched.description && formik.errors.description && (
            <div className="p-error">{formik.errors.description}</div>
          )}
        </div>
      </div>
    </div>
  );
}

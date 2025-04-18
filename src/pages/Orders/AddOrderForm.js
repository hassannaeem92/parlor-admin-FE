import { Button } from "primereact/button";
import { Checkbox } from "primereact/checkbox";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import { SelectButton } from "primereact/selectbutton";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import InputFocus from "../../hooks/InputFocus";
// import { searchProductWithInvoice } from "../../store/AsyncMethods/SalesMethod";

export default function AddOrderForm({ formik, isRefund, setIsRefund }) {
  const [searchProductInvoice, setSearchProductInvoice] = useState("");
  const inputRef = InputFocus();
  const navigate = useNavigate();
  const { orderId } = useParams();
  const dispatch = useDispatch();
  const { allCustomers } = useSelector((state) => state.CustomersReducer);

  const saleStatusOptions = [
    { name: "Invoice", value: "invoice" },
    { name: "Refund", value: "refund" },
  ];

  useEffect(() => {
    if (!orderId) {
      formik.resetForm();
    }
  }, [orderId]);

  const handleSearchProductWithInvoice = () => {
    if (searchProductInvoice?.length > 0) {
      // dispatch(searchProductWithInvoice(searchProductInvoice)).then((pro) => {
      //   if (pro) {
      //     formik.setValues({
      //       name: pro.customer_name || "Customer",
      //       saleStatus: "refund",
      //       phone: pro.customer_phone || "03",
      //       totalPurchase: pro.total_purchase || 0,
      //       status: pro.is_active === 1 ? true : false,
      //       totalSales: pro.total_sales || 0,
      //       totalDiscount: pro.total_discount || 0,
      //       vatPer: pro.vat_per || 0,
      //       vatAmount: pro.vat_amount || 0,
      //       totalAmount: pro.total_amount || 0,
      //       userId: user.id,
      //       products: pro.products || [],
      //       product: {
      //         purchasePrice: 0,
      //         salePrice: 0,
      //         product: "",
      //         varient: "",
      //         discount: 0,
      //         quantity: 1,
      //         total: 0,
      //         discount_value: 0,
      //         is_discount_percentage: true,
      //       },
      //     });
      //     setIsRefund(true);
      //     setSearchProductInvoice("");
      //   }
      // });
    }
  };

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
            {orderId ? "Edit Customer" : "Add Customer"}
          </span>
        </Divider>

        {formik.values.saleStatus === "refund" ? (
          <div className="px-4 pb-12  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="w-full flex">
              <span className="p-input-icon-left w-full">
                <i className="pi pi-search" />
                <InputText
                  ref={inputRef}
                  placeholder="Search using invoice #"
                  className="rounded-r-none pl-12 w-full"
                  value={searchProductInvoice}
                  onChange={(e) => setSearchProductInvoice(e.target.value)}
                  onKeyUpCapture={(e) => {
                    e.preventDefault();
                    if (e.key === "Enter") {
                      handleSearchProductWithInvoice();
                    }
                  }}
                />
              </span>
              <Button
                icon="pi pi-arrow-right"
                className="rounded-l-none p-black-btn"
                type="button"
                onClick={handleSearchProductWithInvoice}
              />
            </div>
          </div>
        ) : null}

        <div className="px-4 gap-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="">
              Customer Name
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
        </div> */}

          {/* <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="lname" className="">
              Customer Last Name
            </label>
            <span className=" w-full">
              <InputText
                id="lname"
                name="lname"
                className="w-full text-lg p-primary-input"
                value={formik.values.lname}
                onChange={formik.handleChange}
              />
            </span>
          </div>
          {formik.touched?.lname && formik.errors?.lname && (
            <div className="p-error">{formik.errors?.lname}</div>
          )}
        </div> */}

          <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="customerId" className="">
                Select Customer
              </label>
              <Dropdown
                placeholder="Select"
                id="customerId"
                name="customerId"
                className="!w-full text-lg p-primary-input"
                value={formik.values.customerId}
                onChange={formik.handleChange}
                options={allCustomers}
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
            {formik.touched?.customerId && formik.errors?.customerId && (
              <div className="p-error">{formik.errors?.customerId}</div>
            )}
          </div>

          {/* <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="subCategoryId" className="">
              Select Sub Category
            </label>
            <Dropdown
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
        </div> */}

          {/* <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="price" className="">
              Price
            </label>
            <span className=" w-full">
              <InputNumber
                id="price"
                name="price"
                className="w-full text-lg p-primary-input"
                value={formik.values.price}
                onValueChange={formik.handleChange}
                prefix="RS "
                disabled={!formik.values.samePrice}
              />
            </span>
          </div>
          {formik.touched?.price && formik.errors?.price && (
            <div className="p-error">{formik.errors?.price}</div>
          )}
          <div className="mt-2">
            <Checkbox
              inputId="samePrice"
              name="samePrice"
              id="samePrice"
              onChange={formik.handleChange}
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
            <label htmlFor="samePrice" className="ml-2">
              Same Price for all varients
            </label>
          </div>
        </div> */}

          {/* <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="">
              Customer Phone Number
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

          {/* <div className="">
          <div className="flex flex-col gap-2">
            <label htmlFor="saleStatus" className="">
              Invoice Status
            </label>
            <SelectButton
              name="saleStatus"
              id="saleStatus"
              options={saleStatusOptions}
              optionLabel="name"
              optionValue="value"
              className="flex"
              disabled={orderId || isRefund ? true : false}
              pt={{
                root: { className: "flex" },
                button: ({ context }) => ({
                  className: context.selected
                    ? "p-primary-highlight-btn w-full text-lg text-center"
                    : "w-full text-lg text-center",
                }),
              }}
              value={formik.values.saleStatus}
              onChange={formik.handleChange}
            />
            {formik.touched.saleStatus && formik.errors.saleStatus && (
              <div className="p-error">{formik.errors.saleStatus}</div>
            )}
          </div>
        </div> */}
        </div>
      </div>
    </div>
  );
}

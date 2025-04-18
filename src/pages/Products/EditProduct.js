import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RESET_SPECIFIC_CATEGORIES } from "../../store/Types/CategoryTypes";
import {
  addCategory,
  addSubCategory,
  getCategory,
  getSubCategory,
} from "../../store/AsyncMethods/CategoryMethod";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RESET_ERROR } from "../../store/Types/AuthTypes";
import { toast } from "react-toastify";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import {
  addProduct,
  getProducts,
  getspecificProduct,
  updateProduct,
} from "../../store/AsyncMethods/ProductMethod";

export default function EditProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

  const { error, user } = useSelector((state) => state.AuthReducer);
  const { categories, subCategories } = useSelector(
    (state) => state.CategoryReducer
  );
  const { specificProduct } = useSelector((state) => state.ProductReducer);
  const { enableCurrency } = useSelector((state) => state.CurrencyReducer);

  const [filterSubCategories, setFilterSubCategories] = useState([]);

  useEffect(() => {
    if (specificProduct) {
      if (specificProduct?.title) {
        formik.setFieldValue("title", specificProduct.title);
      } else {
        formik.setFieldValue("title", "");
      }
      if (specificProduct?.article_name) {
        formik.setFieldValue("articleName", specificProduct.article_name);
      } else {
        formik.setFieldValue("articleName", "");
      }

      if (specificProduct?.price) {
        formik.setFieldValue("price", specificProduct.price);
      } else {
        formik.setFieldValue("price", "");
      }
      if (specificProduct?.description) {
        formik.setFieldValue("description", specificProduct.description);
      } else {
        formik.setFieldValue("description", "");
      }

      if (specificProduct?.category_id) {
        formik.setFieldValue("categoryId", specificProduct.category_id);
      } else {
        formik.setFieldValue("categoryId", "");
      }
      if (specificProduct?.sub_category_id) {
        formik.setFieldValue("subCategoryId", specificProduct.sub_category_id);
      } else {
        formik.setFieldValue("subCategoryId", "");
      }

      if (specificProduct?.is_active) {
        formik.setFieldValue(
          "status",
          specificProduct.is_active ? true : false
        );
      } else {
        formik.setFieldValue("status", "");
      }
    }
  }, [specificProduct]);

  const formik = useFormik({
    initialValues: {
      title: "",
      articleName: "",
      description: "",
      status: "",
      price: 0,
      subCategoryId: "",
      categoryId: "",
      userId: user.id,
    },
    validationSchema: Yup.object({
      subCategoryId: Yup.number().required("Sub Category Required"),
      categoryId: Yup.number().required("Category Required"),
      status: Yup.boolean().required("Status Required"),
      price: Yup.number().required("Price Required"),
      title: Yup.string().required("Product Title Required"),
      articleName: Yup.string().required("Article Name Required"),
      description: Yup.string().required("Description Required"),
    }),

    onSubmit: async (data) => {
      dispatch(updateProduct(data, id)).then((success) => {
        if (success) {
          formik.resetForm();
          dispatch(getProducts());
          navigate("/products");
        }
      });
    },
  });

  useEffect(() => {
    if (formik.values.categoryId) {
      const filter = subCategories.filter(
        (item) => item.category_id === formik.values.categoryId
      );

      if (filter) {
        setFilterSubCategories(filter);
      }
    }
  }, [formik.values.categoryId]);

  useEffect(() => {
    if (user) {
      dispatch(getCategory());
      dispatch(getSubCategory());
    }
  }, []);

  useEffect(() => {
    dispatch(getspecificProduct(id));
  }, []);

  const statusOptions = [
    { name: "Active", value: true },
    { name: "Deactive", value: false },
  ];

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
              Edit Product
            </span>
          </Divider>

          <div className="px-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="">
                  Product Title
                </label>
                <span className=" w-full">
                  <InputText
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
                  Article Name
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
                    prefix={`${enableCurrency?.unit || ""} `}
                  />
                </span>
              </div>
              {formik.touched?.price && formik.errors?.price && (
                <div className="p-error">{formik.errors?.price}</div>
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
              {formik.touched?.subCategoryId &&
                formik.errors?.subCategoryId && (
                  <div className="p-error">{formik.errors?.subCategoryId}</div>
                )}
            </div>

            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="status" className="">
                  Status
                </label>
                <Dropdown
                  placeholder="Select"
                  id="status"
                  name="status"
                  className="!w-full text-lg p-primary-input"
                  value={formik.values.status}
                  onChange={formik.handleChange}
                  options={statusOptions}
                  optionLabel="name"
                  optionValue="value"
                  pt={{
                    root: { className: "w-full" },
                    input: { className: "w-full p-primary-input" },
                    filterIcon: { className: "ml-1" },
                    filterInput: { className: "pl-6" },
                  }}
                />
              </div>
              {formik.touched?.status && formik.errors?.status && (
                <div className="p-error">{formik.errors?.status}</div>
              )}
            </div>

            <div className="col-span-1 md:col-span-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="">
                  Description
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
          </div>
          <div className="mt-16">
            <div className="flex justify-end gap-4">
              <Button
                label="Clear"
                icon="pi pi-times"
                className="p-red-btn w-28"
                type="button"
                onClick={() => {
                  formik.resetForm();
                  dispatch({ type: RESET_SPECIFIC_CATEGORIES });
                }}
              />
              <Button
                label={"Edit"}
                icon="pi pi-check"
                className="p-secondary-btn w-28"
                type="submit"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RESET_SPECIFIC_CATEGORIES } from "../../store/Types/CategoryTypes";
import {
  addSubCategory,
  getCategory,
  getSubCategory,
  getspecificSubCategory,
  updateSubCategory,
} from "../../store/AsyncMethods/CategoryMethod";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RESET_ERROR } from "../../store/Types/AuthTypes";
import { toast } from "react-toastify";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import InputFocus from "../../hooks/InputFocus";

export default function EditSubCategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const inputRef = InputFocus();

  const { error, user } = useSelector((state) => state.AuthReducer);
  const { categories, specificSubCategory } = useSelector(
    (state) => state.CategoryReducer
  );

  useEffect(() => {
    if (specificSubCategory) {
      if (specificSubCategory?.name) {
        formik.setFieldValue("subCategory", specificSubCategory.name);
      } else {
        formik.setFieldValue("category", "");
      }
      if (specificSubCategory?.category_id) {
        formik.setFieldValue("categoryId", specificSubCategory.category_id);
      } else {
        formik.setFieldValue("categoryId", "");
      }
    }
  }, [specificSubCategory]);

  const formik = useFormik({
    initialValues: {
      subCategory: "",
      categoryId: "",
    },
    validationSchema: Yup.object({
      subCategory: Yup.string().required("Sub Category Required"),
      categoryId: Yup.number().required("Category Required"),
    }),

    onSubmit: async (data) => {
      dispatch(updateSubCategory(data, id)).then((success) => {
        if (success) {
          formik.resetForm();
          dispatch(getSubCategory());
          navigate("/sub-categories");
        }
      });
    },
  });

  useEffect(() => {
    if (user) {
      dispatch(getCategory());
    }
  }, []);

  useEffect(() => {
    dispatch(getspecificSubCategory(id));
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
              Edit Sub Service
            </span>
          </Divider>

          <div className="px-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="categoryId" className="">
                  Select Service
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
                <label htmlFor="subCategory" className="">
                  Enter Sub Service
                </label>
                <span className=" w-full">
                  <InputText
                    ref={inputRef}
                    maxLength={40}
                    id="subCategory"
                    name="subCategory"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.subCategory}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              {formik.touched?.subCategory && formik.errors?.subCategory && (
                <div className="p-error">{formik.errors?.subCategory}</div>
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

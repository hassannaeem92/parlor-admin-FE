import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { RESET_SPECIFIC_CATEGORIES } from "../../store/Types/CategoryTypes";
import {
  addCategory,
  getCategory,
} from "../../store/AsyncMethods/CategoryMethod";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RESET_ERROR } from "../../store/Types/AuthTypes";
import { Divider } from "primereact/divider";
import InputFocus from "../../hooks/InputFocus";

export default function AddCategories() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = InputFocus();
  const { error } = useSelector((state) => state.AuthReducer);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);


  const formik = useFormik({
    initialValues: {
      category: "",
      description: "",
      description2: "",

    },
    validationSchema: Yup.object({
      category: Yup.string().required("Service Required"),
      description: Yup.string().required("Description Required"),
    }),

    // onSubmit: async (data) => {
    //   dispatch(addCategory(data)).then((success) => {
    //     if (success) {
    //       formik.resetForm();

    //       dispatch(getCategory());
    //       navigate("/categories");
    //     }
    //   });
    // },

    onSubmit: async (data) => {

      
      const formData = new FormData();

      formData.append("description", data.description);
      formData.append("description2", data.description2);
      formData.append("category", data.category);

      if (selectedFile) {
        formData.append("files", selectedFile); // Add the file to the form data
      }

      try {
        console.log('Form Data:', formData);
        const success = await dispatch(addCategory(formData));
        if (success) {
          formik.resetForm();
          dispatch(getCategory());
          navigate("/categories");
        }
      } catch (error) {
        console.error("Error uploading service price:", error);
      }
    }


  });

  const handleUploadClick = () => {
    document.getElementById('imageUploadInput').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL
    }
  };

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
              Add Service
            </span>
          </Divider>

          <div className="px-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="">
                  Enter Service
                </label>
                <span className=" w-full">
                  <InputText
                    ref={inputRef}
                    maxLength={40}
                    id="category"
                    name="category"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.category}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              {formik.touched?.category && formik.errors?.category && (
                <div className="p-error">{formik.errors?.category}</div>
              )}
            </div>

            {/* Description Field */}
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="">
                  Enter Description
                </label>
                <span className="w-full">
                  <InputText
                    id="description"
                    name="description"
                    maxLength={100}
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
              <label htmlFor="description2" className="">
                Enter Description 2
              </label>
              <span className="w-full">
                <InputText
                  id="description2"
                  name="description2"
                  maxLength={225}
                  className="w-full text-lg p-primary-input"
                  value={formik.values.description2}
                  onChange={formik.handleChange}
                />
              </span>
            </div>
            {formik.touched?.description2 && formik.errors?.description2 && (
              <div className="p-error">{formik.errors?.description2}</div>
            )}
          </div>


            <div className="flex flex-col mt-10">
              <button
                type="button"
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-lg transition-all duration-300"
                onClick={handleUploadClick}
              >
                Upload Image
              </button>
              <input
                id="imageUploadInput"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
              />

              {previewUrl && (
                <div className="mt-4">
                  <p className="text-gray-600 mb-2">Image Preview:</p>
                  <img
                    src={previewUrl}
                    alt="Selected Preview"
                    className="rounded-lg shadow-lg w-48 h-48 object-cover"
                  />
                </div>
              )}
            </div>
          </div>


          <div className="mt-16">
            <div className="flex justify-end gap-4">
              <Button
                label="Clear"
                icon="pi pi-times"
                className="p-red-btn"
                type="button"
                onClick={() => {
                  formik.resetForm();
                  dispatch({ type: RESET_SPECIFIC_CATEGORIES });
                }}
              />
              <Button
                label={"Submit"}
                icon="pi pi-check"
                className="p-secondary-btn"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

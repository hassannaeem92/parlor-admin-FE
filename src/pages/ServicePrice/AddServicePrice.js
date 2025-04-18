import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";
import { RESET_SPECIFIC_CATEGORIES } from "../../store/Types/CategoryTypes";
import { Dropdown } from "primereact/dropdown";

import {
  addServicePrice,
  getCategory,
  getServicePrice,
  getSubCategory,
} from "../../store/AsyncMethods/ServicePriceMethod";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RESET_ERROR } from "../../store/Types/AuthTypes";
import { Divider } from "primereact/divider";
import InputFocus from "../../hooks/InputFocus";

export default function AddServicePrice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = InputFocus();
  const { error, user } = useSelector((state) => state.AuthReducer);
  const { categories } = useSelector((state) => state.CategoryReducer);
  const { subCategories } = useSelector((state) => state.CategoryReducer);

  const [filterSubCategories, setFilterSubCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);


  const formik = useFormik({
    
    initialValues: {
      categoryId: "",
      subCategoryId: "",
      price: "",
      description: "",
      createdby: user.created_by
    },
    validationSchema: Yup.object({
      categoryId: Yup.string().required("Service Required"),
      subCategoryId: Yup.string().required("Sub Service Required"),
      price: Yup.string().required("Price Required"),
      description: Yup.string().required("Description Required"),
    }),

    // onSubmit: async (data) => {
    //   const body = {
    //     serviceid: data.categoryId,
    //     subserviceid: data.subCategoryId,
    //     price: data.price ? Number(data.price) : 0,
    //     description: data.description,
    //     createdby: user.created_by
    //   }

    //   console.log('Hassan NAeem')
    //   console.log(body)
    //   dispatch(addServicePrice(body)).then((success) => {
    //     if (success) {
    //       formik.resetForm();

    //       dispatch(getServicePrice());
    //       navigate("/service-price");
    //     }
    //   });
    // },

        // onSubmit: async (data) => {
        //   const formData = new FormData();
        //   formData.append("serviceid", data.categoryId);
        //   formData.append("subserviceid", data.subCategoryId);
        //   formData.append("price", data.price ? Number(data.price) : 0);
        //   formData.append("description", data.description);
        //   formData.append("createdby", user.created_by);
        
        //   if (data.image) {
        //     formData.append("files", data.image); // Include the image file
        //   }
        
        //   try {
        //     console.log('Form Data:', formData);
        //     const success = await dispatch(addServicePrice(formData));
        //     if (success) {
        //       formik.resetForm();
        //       dispatch(getServicePrice());
        //       navigate("/service-price");
        //     }
        //   } catch (error) {
        //     console.error("Error uploading service price:", error);
        //   }
        // }


      onSubmit: async (data) => {
          const formData = new FormData();
          
          formData.append("serviceid", data.categoryId);
          formData.append("subserviceid", data.subCategoryId);
          formData.append("description", data.description);
          formData.append("price", data.price ? Number(data.price) : 0);
          formData.append("createdby", user.created_by);
        
          // if (selectedFile) {
          //   formData.append("files", selectedFile); // Add the file to the form data
          // }
        
          try {
            console.log('Form Data:', formData);
            const success = await dispatch(addServicePrice(formData));
            if (success) {
              formik.resetForm();
              dispatch(getServicePrice());
              navigate("/service-price");
            }
          } catch (error) {
            console.error("Error uploading service price:", error);
          }
        }
        
    

  });

  useEffect(() => {

    if (user && !categories.length) {
      dispatch(getCategory());
      dispatch(getSubCategory());
      
    }

    if (formik.values.categoryId) {
      const filter = subCategories.filter(
        (item) => item.category_id === formik.values.categoryId
      );

      if (filter) {
        setFilterSubCategories(filter);
        formik.setFieldValue("subCategoryId", "");
      }
    }

  }, [formik.values.categoryId]);


    const handleFileChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file)); // Create a preview URL
      }
    };

    const handleUploadClick = () => {
      document.getElementById('imageUploadInput').click();
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
      {/* <form onSubmit={formik.handleSubmit}>
        <div className="card shadow-md rounded-lg p-4 mt-4">
          <Divider>
            <span className="text-2xl font-bold text-center text-primary mx-1">
              Add Service Price
            </span>
          </Divider>

          <div className="px-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="">
                  Enter Category
                </label>
                <span className=" w-full">
                  <InputText
                    ref={inputRef}
                    maxLength={90}
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
      </form> */}


<form onSubmit={formik.handleSubmit}>
        <div className="card shadow-md rounded-lg p-4 mt-4">
          <Divider>
            <span className="text-2xl font-bold text-center text-primary mx-1">
              Add Service Price
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
                <label htmlFor="subCategoryId" className="">
                  Select Sub Service
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

            {/* Price Field */}
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="price">Enter Price</label>
                <span className="w-full">
                  <InputText
                    id="price"
                    name="price"
                    type="text"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              {formik.touched?.price && formik.errors?.price && (
                <div className="p-error">{formik.errors?.price}</div>
              )}
            </div>

            {/* Description Input */}
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="description">Description</label>
                <InputText
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  className="w-full text-lg p-primary-input"
                  maxLength={200}
                />
              </div>
              {formik.touched?.description && formik.errors?.description && (
                <div className="p-error">{formik.errors?.description}</div>
              )}
            </div>

            {/* <div className="flex flex-col gap-2">
            <label htmlFor="image">Upload Image</label>
            <input
              id="image"
              name="image"
              type="file"
              accept="image/*"
              className="w-full text-lg p-primary-input"
              onChange={(e) => setSelectedFile(e.target.files[0])}
            />
          </div> */}

          {/* <div className="flex flex-col ">
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
              </div> */}


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
                label="Submit"
                icon="pi pi-check"
                className="p-secondary-btn"
                type="submit"
              />
            </div>
          </div>

          {/* <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="image">Upload Image</label>
              <InputText
                id="image"
                name="image"
                type="file"
                accept="image/*"
                className="w-full text-lg p-primary-input"
                onChange={(event) => {
                  formik.setFieldValue("image", event.target.files[0]);
                }}
              />
            </div>
            {formik.touched?.image && formik.errors?.image && (
              <div className="p-error">{formik.errors?.image}</div>
            )}
          </div> */}

       





        </div>
      </form>



   

    </div>
  );
}

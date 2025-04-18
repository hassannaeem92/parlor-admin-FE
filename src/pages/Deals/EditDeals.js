import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RESET_SPECIFIC_CATEGORIES } from "../../store/Types/CategoryTypes";
import {

  getCategory,
  getServicePrice,
  getSubCategory,
  updateServicePrice,
  getSpecificServicePrice,

} from "../../store/AsyncMethods/ServicePriceMethod";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RESET_ERROR } from "../../store/Types/AuthTypes";
import { toast } from "react-toastify";
import { Divider } from "primereact/divider";
import InputFocus from "../../hooks/InputFocus";
import { Dropdown } from "primereact/dropdown";
import { getDeals, updateDeal,getSpecificDeal } from "../../store/AsyncMethods/DealsMethod";
import { baseURL } from "../../constants/constants";


export default function EditServicePrice() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = InputFocus();
  const { error, user } = useSelector((state) => state.AuthReducer);
  const { categories } = useSelector((state) => state.CategoryReducer);
  const { subCategories } = useSelector((state) => state.CategoryReducer);
  // const { specificServicePrice } = useSelector((state) => state.ServicePriceReducer);
  const {specificDeals} = useSelector((state) => state.DealsReducer);
  const { id } = useParams();

  const [filterSubCategories, setFilterSubCategories] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  // const baseURL = "http://localhost:7001/uploads"
  const [deals, setDeals] = useState([]);
  const [editingDealId, setEditingDealId] = useState(null);
  

  useEffect(() => {
    
    if (specificDeals && specificDeals.length > 0) {
      setDeals((prevDeals) => []);

      const dealData = specificDeals[0];
      const imageUrl = dealData.imagePath ? `${baseURL}${dealData.imagePath}` : "";

      formik.setFieldValue("parentDescription", dealData.description || "");  // Ensure it's not undefined
      formik.setFieldValue("dealPrice", dealData.dealPrice || "");
      formik.setFieldValue("dealName", dealData.dealName || "");
      formik.setFieldValue("selectedFile", imageUrl);

      
      console.log("Formik  Description:", formik.values.description);
      console.log("Formik  Descripp:", formik.values.dealPrice);

      setPreviewUrl(imageUrl);
      
      showDealEditCase(specificDeals[0].servies);
      // services = specificDeals[0].services
      
   

      // if (specificDeals[0].serviceid) {
      //   formik.setFieldValue("categoryId", specificDeals[0].serviceid);
      // } else {
      //   formik.setFieldValue("categoryId", "");
      // }

      // if (specificServicePrice[0].subserviceid) {
      //   formik.setFieldValue("subCategoryId", specificServicePrice[0].subserviceid);
      // } else {
      //   formik.setFieldValue("SubCategoryId", "");
      // }

    }
  }, [specificDeals, categories, subCategories]);




  const showDealEditCase = (arr) => {
    if (arr && arr.length) {
      ;
  
      // Map the input array to create the desired `newDeal` objects
      const formattedDeals = arr.map((item) => {
        // Find the category and subCategory before creating the newDeal object
        const category = categories.find((cat) => cat.id === item.serviceid);
        const subCategory = subCategories.find((subCat) => subCat.id === item.subserviceid);
  
        return {
          categoryId: item.serviceid, // Map serviceid to categoryId
          subCategoryId: item.subserviceid, // Map subserviceid to subCategoryId
          serviceDescription: item.description,
          categoryName: category ? category.name : "Unknown Category", // Use the category name
          subCategoryName: subCategory ? subCategory.name : "Unknown SubCategory", // Use the subCategory name
          id: item.id, // Keep the id from the input object
          service_deal_id: item.service_deal_id, // Keep the service_deal_id from the input object
        };
      });
  
      // Update deals state
      const updatedDeals = formattedDeals.map((newDeal) => {
        // Check if the deal already exists in the current `deals` state
        const existingDealIndex = deals.findIndex(
          (deal) => deal.id === newDeal.id
        );
  
        if (existingDealIndex !== -1) {
          // If the deal exists, update it
          const updatedDeal = {
            ...deals[existingDealIndex],
            ...newDeal, // Overwrite with the new deal's data
          };
          deals[existingDealIndex] = updatedDeal; // Update in the existing array
          return updatedDeal;
        }
  
        // If the deal doesn't exist, it's new and should be added
        return newDeal;
      });
  
      setDeals((prevDeals) => {
        const newDeals = updatedDeals.filter(
          (deal) => !prevDeals.some((prev) => prev.id === deal.id)
        );
        return [...prevDeals, ...newDeals];
      });
  
      // Optionally reset fields related to the deal
      formik.setFieldValue("serviceid", null);
      formik.setFieldValue("subserviceid", null);
      formik.setFieldValue("description", "");
    }
  };
  
  

  const handleAddDeal = () => {
    const { categoryId, subCategoryId, serviceDescription } = formik.values;

    if (!categoryId || !subCategoryId || !serviceDescription) {
      alert("Please fill all required fields before adding a deal.");
      return;
    }

    if (editingDealId !== null) {
      // Update existing deal
      setDeals((prevDeals) =>
        prevDeals.map((deal, index) =>
          index === editingDealId
            ? { ...deal, categoryId, subCategoryId, serviceDescription }
            : deal
        )
      );

      setEditingDealId(null); // Reset editing mode
    } else {
      // Prevent duplicate deals
      const existingDeal = deals.some(
        (deal) => deal.categoryId === categoryId && deal.subCategoryId === subCategoryId
      );

      if (existingDeal) {
        alert("A deal with the same category and sub-category already exists.");
        return;
      }

      // Find category and subcategory names
      const category = categories.find((cat) => cat.id === categoryId);
      const subCategory = subCategories.find((subCat) => subCat.id === subCategoryId);

      const newDeal = {
        categoryId,
        subCategoryId,
        serviceDescription,
        categoryName: category ? category.name : "Unknown Category",
        subCategoryName: subCategory ? subCategory.name : "Unknown SubCategory",
      };

      // Add new deal
      setDeals((prevDeals) => [...prevDeals, newDeal]);
    }

    // Reset form fields
    formik.setFieldValue("categoryId", null);
    formik.setFieldValue("subCategoryId", null);
    formik.setFieldValue("serviceDescription", "");
  };

  const handleEditDeal = (dealId) => {
    const dealToEdit = deals[dealId]; // Fetch deal by index

    if (!dealToEdit) {
      alert("Deal not found!");
      return;
    }

    setEditingDealId(dealId); // Set editing mode

    if (dealToEdit.categoryId) {
      const filter = subCategories.filter((item) => item.category_id === dealToEdit.categoryId);
      setFilterSubCategories(filter);

      setTimeout(() => {
        formik.setFieldValue("subCategoryId", dealToEdit.subCategoryId);
      }, 0);
    }

    formik.setFieldValue("categoryId", dealToEdit.categoryId);
    formik.setFieldValue("serviceDescription", dealToEdit.serviceDescription);
  };

  const formik = useFormik({

    initialValues: {
      dealName: "",
      dealPrice: "",
      parentDescription: "",
      image: "",
      services: [],
      categoryId: "",
      subCategoryId: "",
      serviceDescription: "",
  
    },
    // validationSchema: Yup.object({
    //   dealName: Yup.string().required("Service Required"),
    //   dealPrice: Yup.number()
    //     .typeError("Price must be a number") // Ensures it's a valid number
    //     .positive("Price must be greater than zero") // Optional: Ensures positive numbers
    //     .required("Price is required"),
    // }),
    



    onSubmit: async (data) => {

      const formData = new FormData();

      if(!deals || deals.length == 0){
        toast.success("Please add at least one deal");
        return
      }
      formData.append("id", id);
      formData.append("dealName", data.dealName);
      formData.append("dealPrice", data.dealPrice ? Number(data.dealPrice) : 0);
      formData.append("dealDescription", data.parentDescription);
      // formData.append("image", data.imagePath);

      if (selectedFile) {
        formData.append("files", selectedFile); // Add the file to the form data
      }

      if(deals && deals.length > 0){
        var arr = deals.map((item) => {
          return {
            serviceid: item.categoryId,
            subserviceid: item.subCategoryId,
            description: item.serviceDescription,
            service_deal_id: item.id
          }
        })
      }

      if(arr){
        formData.append("services", JSON.stringify(arr));
      }
      dispatch(updateDeal(formData, id)).then((success) => {
        if (success) {
          formik.resetForm();
          setDeals((prevDeals) => []);

          dispatch(getDeals());
          navigate("/deals");
        }
      });


    }

  });

  useEffect(() => {

    if (user && !categories.length) {
      dispatch(getCategory());
      dispatch(getSubCategory());
    }
    
    // const updatedArray = services.map(item => {
    //   // Find a matching object in array2 by id
    //   const matchingItem = array2.find(obj => obj.id === item.id);
    
    //   // If a match is found, update the values, otherwise keep the original
    //   return matchingItem ? { ...item, ...matchingItem } : item;
    // });

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

  const handleDeleteDeal = (index) => {
    setDeals(deals.filter((_, i) => i !== index));
  };

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

  useEffect(() => {
    dispatch(getSpecificDeal(Number(id)));

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
          {/* Top Three Fields */}
          <div className="card shadow-md rounded-lg p-4 mb-4 mt-4">
            <Divider>
              <span className="text-2xl font-bold text-center text-primary mx-1">
                Edit Deal
              </span>
            </Divider>
  
            <div className="px-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
  
  
              {/* Name Field */}
              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="dealName">Deal Name</label>
                  <span className="w-full">
                    <InputText id="dealName" name="dealName" type="text" className="w-full text-lg p-primary-input"
                      value={formik.values.dealName} onChange={formik.handleChange} />
                  </span>
                </div>
                {formik.touched?.dealName && formik.errors?.dealName && (
                  <div className="p-error">{formik.errors?.dealName}</div>
                )}
              </div>
  
              {/* Price Field */}
              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="price">Deal Price</label>
                  <span className="w-full">
                    <InputText
                      id="dealPrice"
                      name="dealPrice"
                      type="text"
                      className="w-full text-lg p-primary-input"
                      value={formik.values.dealPrice}
                      onChange={(e) => {
                        const numericValue = e.target.value.replace(/[^0-9]/g, ""); // Allow only numbers
                        formik.setFieldValue("dealPrice", numericValue);
                      }}
                    />
                  </span>
                </div>
                {formik.touched?.dealPrice && formik.errors?.dealPrice && (
                  <div className="p-error">{formik.errors?.dealPrice}</div>
                )}
              </div>

  
              {/* Description Input */}
              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="parentDescription">Description</label>
                  <span className="w-full">
                    <InputText id="parentDescription" name="parentDescription" type="text" className="w-full text-lg p-primary-input"
                      value={formik.values.parentDescription} onChange={formik.handleChange} />
                  </span>
                </div>
                {formik.touched?.parentDescription && formik.errors?.parentDescription && (
                  <div className="p-error">{formik.errors?.parentDescription}</div>
                )}
              </div>
  
  
              <div className="flex flex-col ">
                <button type="button"
                  className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded shadow-lg transition-all duration-300"
                  onClick={handleUploadClick}>
                  Upload Image
                </button>
                <input id="imageUploadInput" type="file" accept="image/*" className="hidden"
                  onChange={handleFileChange} />
  
                {previewUrl && (
                  <div className="mt-4">
                    <p className="text-gray-600 mb-2">Image Preview:</p>
                    <img src={previewUrl} alt="Selected Preview"
                      className="rounded-lg shadow-lg w-48 h-48 object-cover" />
                  </div>
                )}
              </div>
  
  
            </div>
          </div>
  
          {/* Dropdowns and Add Deal */}
          <div className="card shadow-md rounded-lg p-4 mb-5">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
              <div>
                <label htmlFor="serviceDescription">Description</label>
                <InputText
                  id="serviceDescription"
                  name="serviceDescription"
                  value={formik.values.serviceDescription}
                  onChange={formik.handleChange}
                  className="w-full text-lg p-primary-input"
                />
              </div>
            </div>
            <div className="mt-5 mb-5 flex justify-end">
              <Button
                label={editingDealId !== null ? "Update Deal" : "Add Deal"}
                icon={editingDealId !== null ? "pi pi-check" : "pi pi-plus"}
                type="button"
                className="p-primary-btn"
                onClick={handleAddDeal}
              />
            </div>
          </div>
  
          {/* Deals Table */}
          <div className="card shadow-md rounded-lg p-4 mb-4">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border border-gray-300 p-2">Service</th>
                  <th className="border border-gray-300 p-2">Sub-Service</th>
                  <th className="border border-gray-300 p-2">Description</th>
                  <th className="border border-gray-300 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {deals.map((deal, index) => (
                  <tr key={index}>
                  <td className="border border-gray-300 p-2">{deal.categoryName}</td>
                  <td className="border border-gray-300 p-2">{deal.subCategoryName}</td>
                  <td className="border border-gray-300 p-2">{deal.serviceDescription}</td>
                  <td className="border border-gray-300 p-2">
                  <div className="flex gap-5">
                    <Button
                      icon="pi pi-pencil"
                      className="p-button-text"
                      style={{ backgroundColor: "green", color: "white", border: "none" }}
                      type="button" // Ensure the button type is 'button' to prevent form submission
                      onClick={(e) => {
                        e.preventDefault(); // Prevent form submission on button click
                        handleEditDeal(index); // Your existing logic
                      }}
                    />
                    <Button
                      icon="pi pi-trash"
                      className="p-button-text"
                      style={{ backgroundColor: "red", color: "white", border: "none" }}
                      type="button" // Ensure the button type is 'button' to prevent form submission
                      onClick={(e) => {
                        e.preventDefault(); // Prevent form submission on button click
                        handleDeleteDeal(index); // Your existing logic
                      }}
                    />
                  </div>
  
  
                  </td>
                </tr>
                ))}
              </tbody>
            </table>
          </div>
  
          {/* Submit and Clear */}
          <div className="flex justify-end gap-4">
            <Button label="Clear" icon="pi pi-times" className="p-red-btn" />
            <Button label="Submit" icon="pi pi-check" className="p-secondary-btn" />
          </div>
        </form>
      </div>
  
    );
}

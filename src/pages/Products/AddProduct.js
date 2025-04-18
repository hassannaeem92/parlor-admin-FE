import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  getCategory,
  getSubCategory,
} from "../../store/AsyncMethods/CategoryMethod";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { RESET_ERROR } from "../../store/Types/AuthTypes";
import { toast } from "react-toastify";

import {
  addProduct,
  getOptionValues,
  getProducts,
  getVarientOption,
  getspecificProduct,
  updateProduct,
} from "../../store/AsyncMethods/ProductMethod";
import AddProductTable from "./AddProductTable";
import AddVarientForm from "./AddVarientForm";
import AddProductForm from "./AddProductForm";
import { RESET_SPECIFIC_PRODUCT } from "../../store/Types/ProductTypes";
import ManagePicture from "./ManagePicture";
import ProductImage from "./ProductImage";

export default function AddProduct() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { productId } = useParams();
  const location = useLocation();

  const [showVarientForm, setShowVarientForm] = useState(false);

  const { error, user } = useSelector((state) => state.AuthReducer);
  const { varientOptions, specificProduct } = useSelector(
    (state) => state.ProductReducer
  );

  const { subCategories } = useSelector((state) => state.CategoryReducer);

  const [filterSubCategories, setFilterSubCategories] = useState([]);

  const [validateVarient, setValidateVarient] = useState(false);

  const varientOptionsValidation = Array.isArray(varientOptions)
    ? varientOptions.reduce((acc, option) => {
        acc[option.label] = Yup.object().required(
          `${option.label} is required`
        );
        return acc;
      }, {})
    : {};

  const [editingVarient, setEditingVarient] = useState(null);

  const editVarient = (varient) => {
    setEditingVarient(varient);
    setShowVarientForm(true);
  };

  useEffect(() => {
    if (specificProduct) {
      formik.setValues({
        title: specificProduct.title || "",
        articleName: specificProduct.article_name || "",
        description: specificProduct.description || "",
        status: specificProduct.is_active === 1 ? true : false,
        purchasePrice: specificProduct.purchase_price || 0,
        price: specificProduct.price || 0,
        discount: specificProduct.discount || 0,
        subCategoryId: specificProduct.sub_category_id || "",
        categoryId: specificProduct.category_id || "",
        samePrice: specificProduct.is_same_price === 1 ? true : false,
        samePurchasePrice:
          specificProduct.is_same_purchase_price === 1 ? true : false,
        sameDiscount: specificProduct.is_same_discount === 1 ? true : false,
        userId: user.id,
        varients: specificProduct.varients || [],
        varient: {
          quantity: 0,
          purchasePrice: specificProduct.purchase_price || 0,
          price: specificProduct.price || 0,
          discount: specificProduct.discount || 0,
        },
        images: [],
        allImages: specificProduct.all_images || [],
      });
    }
  }, [specificProduct]);

  const formik = useFormik({
    initialValues: {
      title: specificProduct ? specificProduct.title : "",
      articleName: specificProduct ? specificProduct.article_name : "",
      description: specificProduct ? specificProduct.description : "",
      status: specificProduct
        ? specificProduct.is_active === 1
          ? true
          : false
        : true,
      purchasePrice: specificProduct ? specificProduct.purchase_price : 0,
      price: specificProduct ? specificProduct.price : 0,
      discount: specificProduct ? specificProduct.discount : 0,
      subCategoryId: specificProduct ? specificProduct.sub_category_id : "",
      categoryId: specificProduct ? specificProduct.category_id : "",
      samePrice: specificProduct
        ? specificProduct.is_same_price === 1
          ? true
          : false
        : true,
      samePurchasePrice: specificProduct
        ? specificProduct.is_same_purchase_price === 1
          ? true
          : false
        : true,
      sameDiscount: specificProduct
        ? specificProduct.is_same_discount === 1
          ? true
          : false
        : true,
      userId: user.id,
      varients: specificProduct ? specificProduct.varients : [],
      varient: {
        quantity: 0,
        purchasePrice: 0,
        price: 0,
        discount: 0,
      },
      images: [],
      allImages: specificProduct ? specificProduct.all_images : [],
    },
    validationSchema: () => {
      return Yup.object({
        subCategoryId: Yup.number().required("Sub Category Required"),
        categoryId: Yup.number().required("Category Required"),
        status: Yup.boolean().required("Status Required"),
        price: Yup.number().required("Price Required"),
        title: Yup.string().required("Product Title Required"),
        articleName: Yup.string().required("Article Number Required"),
        description: Yup.string().required("Description Required"),
        samePrice: Yup.boolean(),
        varient: validateVarient
          ? Yup.object().shape({
              ...varientOptionsValidation,
              purchasePrice: Yup.number().required(
                "Purchase Price is required"
              ),
              price: Yup.number().required("Price is required"),
              discount: Yup.number().required("Discount is required"),
            })
          : Yup.object(),
        varients:
          formik.values.varients?.length === 0 && !validateVarient
            ? Yup.array()
                .required("At least one varient is required")
                .min(1, "At least one varient is required")
            : Yup.array(),
        images:
          formik.values.allImages?.length === 0
            ? Yup.array()
                .required("At least one image is required")
                .min(1, "At least one image is required")
                .of(
                  Yup.mixed()
                    .test(
                      "fileFormat",
                      "Invalid file format. Please upload an image file (PNG, JPG, JPEG).",
                      (value) => {
                        // Ensure the value is a File object
                        if (value instanceof File) {
                          // Check the file type
                          return (
                            value.type === "image/png" ||
                            value.type === "image/jpeg" ||
                            value.type === "image/jpg"
                          );
                        }
                        return false;
                      }
                    )
                    .test(
                      "fileSize",
                      "Image size should not exceed 1 MB.",
                      (value) => {
                        // Ensure the value is a File object
                        if (value instanceof File) {
                          // Check the file size
                          return value.size <= 1024 * 1024; // 1 MB in bytes
                        }
                        return false;
                      }
                    )
                )
            : Yup.array().of(
                Yup.mixed()
                  .test(
                    "fileFormat",
                    "Invalid file format. Please upload an image file (PNG, JPG, JPEG).",
                    (value) => {
                      // Ensure the value is a File object
                      if (value instanceof File) {
                        // Check the file type
                        return (
                          value.type === "image/png" ||
                          value.type === "image/jpeg" ||
                          value.type === "image/jpg"
                        );
                      }
                      return false;
                    }
                  )
                  .test(
                    "fileSize",
                    "Image size should not exceed 1 MB.",
                    (value) => {
                      // Ensure the value is a File object
                      if (value instanceof File) {
                        // Check the file size
                        return value.size <= 1024 * 1024; // 1 MB in bytes
                      }
                      return false;
                    }
                  )
              ),
      });
    },

    onSubmit: async (values) => {
      const formData = new FormData();

      // Append individual fields to the FormData object
      formData.append("title", values.title);
      formData.append("articleName", values.articleName);
      formData.append("description", values.description);
      formData.append("status", values.status);
      formData.append("purchasePrice", values.purchasePrice);
      formData.append("price", values.price);
      formData.append("discount", values.discount);
      formData.append("subCategoryId", values.subCategoryId);
      formData.append("categoryId", values.categoryId);
      formData.append("samePrice", values.samePrice);
      formData.append("samePurchasePrice", values.samePurchasePrice);
      formData.append("sameDiscount", values.sameDiscount);
      formData.append("userId", values.userId);
      // formData.append("varients", values.varients);
      formData.append("allImages", values.allImages);
      // Function to recursively append object properties to FormData
      const appendObjectToFormData = (obj, formData, prefix = "") => {
        for (const key in obj) {
          const value = obj[key];
          const newKey = prefix ? `${prefix}[${key}]` : key;

          if (typeof value === "object" && value !== null) {
            appendObjectToFormData(value, formData, newKey);
          } else {
            formData.append(newKey, value);
          }
        }
      };

      // Append each variant to FormData
      values.varients.forEach((variant, index) => {
        appendObjectToFormData(variant, formData, `varients[${index}]`);
      });
      if (values.images) {
        values.images.forEach((file, index) => {
          formData.append(`images`, file);
        });
      }

      if (specificProduct) {
        dispatch(updateProduct(formData, productId)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch({ type: RESET_SPECIFIC_PRODUCT });
            dispatch(getProducts());
            navigate("/products");
          }
        });
      } else {
        dispatch(addProduct(formData)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch(getProducts());
            navigate("/products");
          }
        });
      }
    },
  });

  const removeVarient = (varientId) => {
    formik.setValues((prevValues) => {
      const updatedVarients = prevValues.varients.filter(
        (varient) => varient.id !== varientId
      );
      return { ...prevValues, varients: updatedVarients };
    });
  };

  useEffect(() => {
    if (formik?.values?.samePrice) {
      formik.setValues({
        ...formik.values,
        varient: {
          ...formik.values.varient,
          price: formik?.values?.price,
        },
      });
    } else {
      formik.setValues({
        ...formik.values,
        price: 0,
      });
    }
  }, [formik?.values?.samePrice, formik?.values?.price]);

  useEffect(() => {
    if (formik?.values?.samePurchasePrice) {
      formik.setValues({
        ...formik.values,
        varient: {
          ...formik.values.varient,
          purchasePrice: formik?.values?.purchasePrice,
        },
      });
    } else {
      formik.setValues({
        ...formik.values,
        purchasePrice: 0,
      });
    }
  }, [formik?.values?.samePurchasePrice, formik?.values?.purchasePrice]);

  useEffect(() => {
    if (formik?.values?.sameDiscount) {
      formik.setValues({
        ...formik.values,
        varient: {
          ...formik.values.varient,
          discount: formik?.values?.discount,
        },
      });
    } else {
      formik.setValues({
        ...formik.values,
        discount: 0,
      });
    }
  }, [formik?.values?.sameDiscount, formik?.values?.discount]);

  useEffect(() => {
    if (varientOptions?.length > 0) {
      varientOptions.map((option) => {
        formik.initialValues.varient = {
          ...formik.initialValues.varient,
          [option.label]: "",
        };
      });
    }
  }, [varientOptions]);

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
      dispatch(getVarientOption());
      dispatch(getOptionValues());
    }
  }, []);

  useEffect(() => {
    if (productId) {
      dispatch(getspecificProduct(productId));
    } else {
      formik.resetForm();
      dispatch({ type: RESET_SPECIFIC_PRODUCT });
    }
  }, []);

  useEffect(() => {
    dispatch({ type: RESET_SPECIFIC_PRODUCT });
    formik.resetForm();
  }, [location.pathname]);

  useEffect(() => {
    if (Array.isArray(varientOptions) && varientOptions.length > 0) {
      varientOptions.forEach((option) => {
        formik.initialValues.varient = {
          ...formik.initialValues.varient,
          [option.label]: "",
        };
      });
    }
  }, [varientOptions]);

  return (
    <div className="mx-4">
      <div>
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          className="p-black-btn"
          onClick={() => {
            formik.resetForm();
            dispatch({ type: RESET_SPECIFIC_PRODUCT });
            navigate(-1);
          }}
        />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <AddProductForm
          formik={formik}
          filterSubCategories={filterSubCategories}
        />

        <div>
          <AddVarientForm
            formik={formik}
            showVarientForm={showVarientForm}
            setShowVarientForm={setShowVarientForm}
            validateVarient={validateVarient}
            setValidateVarient={setValidateVarient}
            editingVarient={editingVarient}
            setEditingVarient={setEditingVarient}
          />
        </div>

        <div className="my-3">
          <AddProductTable
            varients={formik.values.varients}
            removeVarient={removeVarient}
            editVarient={editVarient}
          />
          {formik.touched?.varients && formik.errors?.varients && (
            <div className="p-error">{formik.errors?.varients}</div>
          )}
        </div>

        <div className="my-3 flex gap-3">
          {formik.values.allImages.map((img) => (
            <ProductImage
              key={img.id}
              path={specificProduct?.image_path}
              image={img.image}
              imgId={img.id}
              productId={productId}
            />
          ))}
          <div
            className="grid place-items-center h-24 w-24"
            style={{
              fontSize: "2em",
              borderRadius: "50%",
              backgroundColor: "var(--surface-b)",
              color: "var(--surface-d)",
            }}
          >
            <i className="pi pi-image text-5xl"></i>
          </div>
        </div>

        <div className="my-3">
          <ManagePicture formik={formik} />
        </div>

        <div className="mt-16">
          <div className="flex justify-end gap-4">
            <Button
              label="Clear"
              icon="pi pi-times"
              className="p-red-btn"
              type="button"
              disabled={showVarientForm}
              onClick={() => {
                dispatch({ type: RESET_SPECIFIC_PRODUCT });
                formik.resetForm();
              }}
            />
            <Button
              label={"Submit"}
              icon="pi pi-check"
              className="p-secondary-btn"
              disabled={showVarientForm}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { Dropdown } from "primereact/dropdown";
import { InputNumber } from "primereact/inputnumber";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
// import { searchProductWithBarcode } from "../../store/AsyncMethods/SalesMethod";
// import useScanDetection from "use-scan-detection-react18";

export default function AddOrderProductForm({
  formik,
  // setShowProductForm,
  setValidateVarient,
  validateVarient,
  // showProductForm,
  editingProduct,
  setEditingProduct,
  currentProductQuantity,
  setCurrentProductQuantity,
  setSelectedProductQuantity,
}) {
  const { specificVarients, products } = useSelector(
    (state) => state.ProductReducer
  );
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const idleTimer = useRef(null);
  const [currentProductTitle, setCurrentProductTitle] = useState("");

  const [varientDropdownOptions, setVarientDropdownOptions] = useState([]);

  const [searchProductBarcode, setSearchProductBarcode] = useState("");
  const [userCompletedWork, setUserCompletedWork] = useState(false);

  //   useScanDetection({
  //     onComplete: (code) => {
  //       setSearchProductBarcode(code);
  //       handleSearchProductWithBarcode();
  //     },
  //     minLength: 13, // EAN13
  //   });

  useEffect(() => {
    // Create options for the PrimeReact Dropdown
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
  }, [specificVarients]);

  useEffect(() => {
    if (formik.values.product?.product) {
      const product = products.find(
        (pro) => pro.id === formik.values.product?.product
      );

      if (product) {
        setCurrentProductTitle(product?.title || "");
        // setCurrentProductQuantity(product?.quantity || 0);
        // setSelectedProductQuantity(product?.quantity || 0);
        // formik.setFieldValue("product.varient", 0);
        // formik.setFieldValue("product.varient", 0);
        // formik.setFieldValue("product.salePrice", product.price);
        // formik.setFieldValue("product.discount_value", product.discount);
        // formik.setFieldValue(
        //   "product.is_discount_percentage",
        //   product.is_discount_percentage
        // );

        // formik.setFieldValue(
        //   "product.discount",
        //   ((product.price * product.discount) / 100) *
        //     formik.values?.product?.quantity
        // );
      } else {
        setCurrentProductTitle("");
        // setCurrentProductQuantity(0);
        // setSelectedProductQuantity(0);
      }
    } else {
      setCurrentProductTitle("");
      // setCurrentProductQuantity(0);
      // setSelectedProductQuantity(0);
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

        formik.setFieldValue("product.salePrice", varient.price);
        formik.setFieldValue(
          "product.purchasePrice",
          varient.purchasePrice || 0
        );
        formik.setFieldValue("product.discount", varient.discount);
        // formik.setFieldValue(
        //   "product.is_discount_percentage",
        //   product.is_discount_percentage
        // );

        // formik.setFieldValue(
        //   "product.discount",
        //   ((product.price * product.discount) / 100) *
        //     formik.values?.product?.quantity
        // );
      } else {
        setCurrentProductQuantity(0);
        setSelectedProductQuantity(0);
      }
    } else {
      setCurrentProductQuantity(0);
      setSelectedProductQuantity(0);
    }
  }, [formik.values.product?.varient, specificVarients]);

  useEffect(() => {
    formik.setFieldValue(
      "product.discount",
      ((formik.values?.product?.salePrice *
        formik.values?.product?.discount_value) /
        100) *
        formik.values?.product?.quantity
    );
  }, [formik.values?.product?.quantity]);

  //   const optionValueFilter = (id) => {
  //     return optionValues.filter((option) => option.option_id === id);
  //   };

  // const getVarientOptions = varientOptions.reduce((acc, option) => {
  //   acc[option.label] = "";
  //   return acc;
  // }, {});

  // const getEditVarientOptions = editingProduct
  //   ? varientOptions.reduce((acc, option) => {
  //       acc[option.label] = editingProduct[option.label];
  //       return acc;
  //     }, {})
  //   : null;

  const handleClear = () => {
    // setShowProductForm(false);
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
      // Update the values of the object at the found index
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
      }, // Reset the varient form
    });

    setEditingProduct(null); // Reset the editingProduct state after updating
    // setShowProductForm(false); // Close the varient form after updating

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
            (product) => product.product === formik.values.product.product
          );

          if (existingProductIndex !== -1) {
            // If the product already exists, update its quantity, sales, discount, etc.

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
              }, // Reset the varient form
            });
          } else {
            // If the product does not exist, add it to the products array

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
              }, // Reset the varient form
            });
          }

          // Reset validation state
          setValidateVarient(false);

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
    // Set the formik values based on the editingProduct when it changes
    if (editingProduct) {
      formik.setValues((prevValues) => ({
        ...prevValues,
        product: {
          ...prevValues.product,
          purchasePrice: editingProduct?.purchasePrice,
          salePrice: editingProduct?.salePrice,
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
  }, [formik.values?.product]);

  const handleSearchProductWithBarcode = () => {
    if (searchProductBarcode?.length > 0) {
      // dispatch(searchProductWithBarcode(searchProductBarcode)).then((pro) => {
      //   if (pro) {
      //     formik.setFieldValue("product.product", pro?.id || "");
      //     setSearchProductBarcode("");
      //   }
      // });
    }
  };

  // Function to reset idle timer
  //   const resetIdleTimer = () => {
  //     clearTimeout(idleTimer.current);
  //     idleTimer.current = setTimeout(() => {
  //       if (!userCompletedWork) {
  //         inputRef.current.focus();
  //       }
  //     }, 2500); // Adjust the timeout as needed (e.g., 5000 milliseconds = 5 seconds)
  //   };

  // Event listeners to reset idle timer on mouse move or key press
  //   useEffect(() => {
  //     const handleMouseMove = () => {
  //       resetIdleTimer();
  //     };

  //     const handleKeyPress = () => {
  //       resetIdleTimer();
  //     };

  //     window.addEventListener("mousemove", handleMouseMove);
  //     window.addEventListener("keypress", handleKeyPress);

  //     return () => {
  //       window.removeEventListener("mousemove", handleMouseMove);
  //       window.removeEventListener("keypress", handleKeyPress);
  //     };
  //   }, []);

  // Effect to focus on input field when component mounts or when userCompletedWork changes
  //   useEffect(() => {
  //     if (!userCompletedWork) {
  //       inputRef.current.focus();
  //     }
  //   }, [userCompletedWork]);

  return (
    <>
      {/* <div className="mt-3 flex justify-end">
        <Button
          label="Add Product"
          icon="pi pi-plus"
          className="p-primary-btn"
          onClick={() => {
            setShowProductForm(true);
            setValidateVarient(true);
          }}
        />
      </div> */}

      <div className="card shadow-md rounded-lg p-4 mt-4">
        <Divider>
          <span className="text-2xl font-bold text-center text-primary mx-1">
            {editingProduct ? "Edit" : "Add"} Product
          </span>
        </Divider>

        {/* <div className="px-4 pb-12  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          <div className="w-full flex">
            <span className="p-input-icon-left w-full">
              <i className="pi pi-search" />
              <InputText
                ref={inputRef}
                placeholder="Search using barcode"
                className="rounded-r-none pl-12 w-full"
                value={searchProductBarcode}
                onChange={(e) => setSearchProductBarcode(e.target.value)}
                onKeyUpCapture={(e) => {
                  e.preventDefault();
                  if (e.key === "Enter") {
                    handleSearchProductWithBarcode();
                  }
                }}
              />
            </span>
            <Button
              icon="pi pi-arrow-right"
              className="rounded-l-none p-black-btn"
              type="button"
              onClick={handleSearchProductWithBarcode}
            />
          </div>
        </div> */}

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
                  id="name"
                  name="name"
                  className="w-full text-lg p-primary-input"
                  value={currentProductTitle}
                  disabled
                  // onChange={formik.handleChange}
                />
              </span>
            </div>
            {/* {formik.touched?.name && formik.errors?.name && (
            <div className="p-error">{formik.errors?.name}</div>
          )} */}
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

          {/* <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="product.purchasePrice" className="">
                Purchase Price
              </label>
              <span className=" w-full">
                <InputNumber
                  id="product.purchasePrice"
                  name="product.purchasePrice"
                  className="w-full text-lg p-primary-input"
                  value={formik.values?.product?.purchasePrice}
                  onValueChange={formik.handleChange}
                  disabled
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
          </div> */}

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
                  suffix={` of ${
                    editingProduct
                      ? currentProductQuantity + editingProduct?.quantity || 0
                      : currentProductQuantity
                  }`}
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
              <label htmlFor="product.salePrice" className="">
                Sale Price
              </label>
              <span className=" w-full">
                <InputNumber
                  id="product.salePrice"
                  name="product.salePrice"
                  className="w-full text-lg p-primary-input"
                  value={formik?.values?.product?.salePrice}
                  onValueChange={formik.handleChange}
                  prefix="RS "
                />
              </span>
            </div>
            {formik.touched?.product?.salePrice &&
              formik.errors?.product?.salePrice && (
                <div className="p-error">
                  {formik.errors?.product?.salePrice}
                </div>
              )}
          </div>

          {/* <div className="">
            <div className="flex flex-col gap-2">
              <label htmlFor="product.discount_value" className="">
                Discount
              </label>
              <span className=" w-full">
                <InputNumber
                  id="product.discount_value"
                  name="product.discount_value"
                  className="w-full text-lg p-primary-input"
                  value={formik.values?.product?.discount_value}
                  onValueChange={formik.handleChange}
                  disabled
                  prefix={
                    formik.values?.product?.is_discount_percentage ? "" : "RS "
                  }
                  suffix={
                    formik.values?.product?.is_discount_percentage ? "%" : ""
                  }
                />
              </span>
            </div>
            {formik.touched?.product?.discount_value &&
              formik.errors?.product?.discount_value && (
                <div className="p-error">
                  {formik.errors?.product?.discount_value}
                </div>
              )}
          </div> */}

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
              <span className=" w-full">
                <InputNumber
                  id="pproduct.total"
                  name="product.total"
                  className="w-full text-lg p-primary-input"
                  value={formik.values?.product?.total}
                  onValueChange={formik.handleChange}
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
              label={editingProduct ? "Edit" : "Add"}
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

// const handleAddVarient = () => {
//   setValidateVarient(true);
//   formik.validateForm().then((errors) => {
//     if (Object.keys(errors)?.length === 0) {
//       if (formik.isValid) {
//         const productsArray = Array.isArray(formik.values.products)
//           ? formik.values.products
//           : [];

//         const newProduct = formik.values.product
//           ? {
//               ...formik.values.product,
//               id: formik.values.products?.length + 1,
//             }
//           : {};

//         formik.setValues({
//           ...formik.values,
//           products: [...productsArray, newProduct],
//           product: {
//             purchasePrice: 0,
//             salePrice: 0,
//             product: "",
//             varient: "",
//             discount: 0,
//             quantity: 1,
//             total: 0,
//             discount_value: 0,
//             is_discount_percentage: true,
//           }, // Reset the varient form
//         });

//         // setShowProductForm(false);
//         setValidateVarient(false);
//         toast.success("Varient Added Successfully!");
//       }
//     } else {
//       formik.handleSubmit();
//       console.log("Validation errors:", errors);
//     }
//   });
// };

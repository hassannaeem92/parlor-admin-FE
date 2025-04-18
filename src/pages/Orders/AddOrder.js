import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
// import {
//   getCategory,
//   getSubCategory,
// } from "../../store/AsyncMethods/CategoryMethod";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { RESET_ERROR } from "../../store/Types/AuthTypes";
import { toast } from "react-toastify";
import AddOrderForm from "./AddOrderForm";
import AddOrderProductForm from "./AddOrderProductForm";
import AddOrderProductTable from "./AddOrderProductTable";
import OrderCalculation from "./OrderCalculation";
import {
  getProducts,
  getspecificVarientsByProduct,
} from "../../store/AsyncMethods/ProductMethod";
import {
  addOrder,
  getOrders,
  getspecificOrder,
  updateOrder,
} from "../../store/AsyncMethods/OrdersMethod";
import { RESET_SPECIFIC_ORDER } from "../../store/Types/OrderTypes";
import { getCustomers } from "../../store/AsyncMethods/CustomerMethod";

// import {
//   getAllVarients,
//   getProducts,
//   getspecificVarientsByProduct,
// } from "../../store/AsyncMethods/ProductMethod";
// import { RESET_SPECIFIC_PRODUCT } from "../../store/Types/ProductTypes";

// import { getSales } from "../../store/AsyncMethods/SalesMethod";
// import { getCustomers } from "../../store/AsyncMethods/CustomerMethod";

// import {
//   addSale,
//   getSales,
//   getspecificSale,
//   updateSales,
// } from "../../store/AsyncMethods/SalesMethod";
// import { RESET_SPECIFIC_SALES } from "../../store/Types/SalesTypes";

export default function AddOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { orderId } = useParams();

  // const [showProductForm, setShowProductForm] = useState(true);

  const { error, user } = useSelector((state) => state.AuthReducer);
  const { specificVarients } = useSelector((state) => state.ProductReducer);

  const { specificOrder } = useSelector((state) => state.OrderReducer);

  // const [filterSubCategories, setFilterSubCategories] = useState([]);

  const [validateVarient, setValidateVarient] = useState(true);
  const [isRefund, setIsRefund] = useState(false);

  const [currentProductQuantity, setCurrentProductQuantity] = useState(0);
  const [slectedProductQuantity, setSelectedProductQuantity] = useState(0);

  // const varientOptionsValidation = varientOptions.reduce((acc, option) => {
  //   acc[option.label] = Yup.object().required(`${option.label} is required`);
  //   return acc;
  // }, {});

  const [editingProduct, setEditingProduct] = useState(null);

  const editProduct = (product) => {
    setEditingProduct(product);
    // setShowProductForm(true);
  };

  useEffect(() => {
    if (specificOrder) {
      formik.setValues({
        name: specificOrder.name || "Customer",
        customerId: specificOrder.user_id || "",
        saleStatus: specificOrder.status || "pending",
        phone: specificOrder.phone || "03",
        totalPurchase: specificOrder.total_purchase || 0,
        status: specificOrder.is_active === 1 ? true : false,
        totalSales: specificOrder.total_sales || 0,
        totalDiscount: specificOrder.total_discount || 0,
        vatPer: specificOrder.vat_per || 0,
        vatAmount: specificOrder.vat_amount || 0,
        totalAmount: specificOrder.total_amount || 0,
        userId: user.id,
        products: specificOrder.products || [],
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
  }, [specificOrder]);

  const formik = useFormik({
    initialValues: {
      name: "Customer",
      customerId: "",
      phone: "03",
      status: true,
      saleStatus: "pending",
      products: [],
      userId: user.id,
      totalPurchase: 0,
      totalSales: 0,
      totalDiscount: 0,
      vatPer: 0,
      vatAmount: 0,
      totalAmount: 0,
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
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Customer Name Required"),
      customerId: Yup.number().required("Customer Required"),
      phone: Yup.string().required("Customer Phone Number Required"),
      saleStatus: Yup.string().required("Sale Status Required"),
      status: Yup.boolean().required("Status Required"),
      product: validateVarient
        ? Yup.object().shape({
            product: Yup.number().required("Product Required"),
            varient: Yup.number(),
            purchasePrice: Yup.number().required("Purchase Price is required"),
            salePrice: Yup.number().required("Sale Price is required"),
            discount: Yup.number().required("Discount is required"),
            quantity: Yup.number()
              .required("Quantity is required")
              .positive("Quantity should be greater than 0")
              .max(
                currentProductQuantity,
                "Quantity should be less than or equal to current product quantity."
              ),
            total: Yup.number().required("Total is required"),
            discount_value: Yup.number().required("Discount is required"),
            is_discount_percentage: Yup.boolean(),
          })
        : Yup.object(),
    }),

    onSubmit: async (data) => {
      if (specificOrder) {
        dispatch(updateOrder(data, orderId)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch({ type: RESET_SPECIFIC_ORDER });
            dispatch(getOrders());
            navigate(user?.role_id == 1 ? "/orders" : "/orders");
          }
        });
      } else {
        dispatch(addOrder(data)).then((success) => {
          if (success.success) {
            formik.resetForm();
            dispatch(getOrders());
            navigate("/orders");
            // navigate(
            //   user?.role_id == 1
            //     ? "/invoice-sales/" + success.insertSaleId
            //     : "/invoice-sales-sales/" + success.insertSaleId
            // );
          }
        });
      }
    },
  });

  const removeProduct = (productId) => {
    formik.setValues((prevValues) => {
      const updatedProduct = prevValues.products.filter(
        (product) => product.id !== productId
      );
      return { ...prevValues, products: updatedProduct };
    });
  };

  // useEffect(() => {
  //   if (formik?.values?.samePrice) {
  //     formik.setValues({
  //       ...formik.values,
  //       varient: {
  //         ...formik.values.varient,
  //         price: formik?.values?.price,
  //       },
  //     });
  //   } else {
  //     formik.setValues({
  //       ...formik.values,
  //       price: 0,
  //     });
  //   }
  // }, [formik?.values?.samePrice, formik?.values?.price]);

  // useEffect(() => {
  //   if (varientOptions?.length > 0) {
  //     varientOptions.map((option) => {
  //       formik.initialValues.varient = {
  //         ...formik.initialValues.varient,
  //         [option.label]: "",
  //       };
  //     });
  //   }
  // }, [varientOptions]);

  useEffect(() => {
    if (formik.values.product?.product) {
      dispatch(getspecificVarientsByProduct(formik.values.product?.product));
    }
  }, [formik.values.product?.product]);

  useEffect(() => {
    if (user) {
      dispatch(getCustomers());
      dispatch(getProducts());
      // dispatch(getAllVarients());
    }
  }, []);

  useEffect(() => {
    if (orderId) {
      dispatch(getspecificOrder(orderId));
      setValidateVarient(false);
      // setShowProductForm(false);
    }
  }, []);

  // useEffect(() => {
  //   dispatch({ type: RESET_SPECIFIC_SALES });
  //   formik.resetForm();
  // }, [location.pathname]);

  useEffect(() => {
    if (formik.values.product?.varient && specificVarients?.length > 0) {
      const varient = specificVarients.find(
        (varient) => varient.varient_id === formik.values.product?.varient
      );

      if (varient) {
        // formik.setFieldValue("product.purchasePrice", varient.price || "");
        setCurrentProductQuantity(varient.quantity);
      } else {
        setCurrentProductQuantity(0);
      }
    } else {
      setCurrentProductQuantity(0);
    }
  }, [formik.values.product?.varient]);

  useEffect(() => {
    if (formik.values.product.salePrice && formik.values.product.quantity) {
      formik.setFieldValue(
        "product.total",
        formik.values.product.salePrice * formik.values.product.quantity -
          formik.values.product.discount || 0
      );
    }
  }, [
    formik.values.product.salePrice,
    formik.values.product.quantity,
    formik.values.product.discount,
  ]);

  // Prevent form submission on Enter key press
  useEffect(() => {
    const handleKeyPress = (event) => {
      if (event.key === "Enter") {
        event.preventDefault();
      }
    };

    document.addEventListener("keypress", handleKeyPress);
    return () => {
      document.removeEventListener("keypress", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (
      formik?.values?.product?.varient &&
      formik?.values?.products?.length > 0
    ) {
      const pro = formik?.values?.products.find(
        (pro) => pro.varient === formik?.values?.product?.varient
      );

      if (pro) {
        setCurrentProductQuantity(currentProductQuantity - pro.quantity);
      }
    }
  }, [slectedProductQuantity]);

  return (
    <div className="mx-4">
      {/* <div>
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          className="p-black-btn"
          onClick={() => {
            formik.resetForm();
            dispatch({ type: RESET_SPECIFIC_SALES });
            navigate(-1);
          }}
        />
      </div> */}
      <form onSubmit={formik.handleSubmit}>
        <AddOrderForm
          formik={formik}
          isRefund={isRefund}
          setIsRefund={setIsRefund}
        />

        <div>
          <AddOrderProductForm
            formik={formik}
            // showProductForm={showProductForm}
            // setShowProductForm={setShowProductForm}
            currentProductQuantity={currentProductQuantity}
            setCurrentProductQuantity={setCurrentProductQuantity}
            validateVarient={validateVarient}
            setValidateVarient={setValidateVarient}
            editingProduct={editingProduct}
            setEditingProduct={setEditingProduct}
            setSelectedProductQuantity={setSelectedProductQuantity}
          />
        </div>

        <div className="my-3">
          <AddOrderProductTable
            products={formik.values.products}
            removeProduct={removeProduct}
            editProduct={editProduct}
          />
        </div>

        {formik.values.products?.length > 0 ? (
          <div className="my-3">
            <OrderCalculation formik={formik} />
          </div>
        ) : null}

        <div className="mt-16">
          <div className="flex justify-end gap-4">
            <Button
              label="Clear"
              icon="pi pi-times"
              className="p-red-btn"
              type="button"
              // disabled={showProductForm}
              onClick={() => {
                // dispatch({ type: RESET_SPECIFIC_PRODUCT });
                formik.resetForm();
                setIsRefund(false);
              }}
            />
            <Button
              label={"Submit"}
              icon="pi pi-check"
              className="p-secondary-btn"
              // disabled={showProductForm}
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

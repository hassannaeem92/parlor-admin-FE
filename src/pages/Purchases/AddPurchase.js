import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { Button } from "primereact/button";
import { RESET_ERROR } from "../../store/Types/AuthTypes";
import { toast } from "react-toastify";
import AddPurchaseForm from "./AddPurchaseForm";
import AddPurchaseProductForm from "./AddPuchaseProductForm";
import AddPurchaseProductTable from "./AddPurchaseProductTable";
import PurchaseCalculation from "./PurchaseCalculation";
import {
  addPurchase,
  getPurchases,
  getspecificPurchase,
  updatePurchase,
} from "../../store/AsyncMethods/PurchaseMethod";
import { RESET_SPECIFIC_PURCHASE } from "../../store/Types/PurchaseTypes";
import {
  getProducts,
  getspecificVarientsByProduct,
} from "../../store/AsyncMethods/ProductMethod";
import { getVendors } from "../../store/AsyncMethods/VendorMethod";

export default function AddOrder() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const { purchaseId } = useParams();

  const { error, user } = useSelector((state) => state.AuthReducer);
  const { specificVarients } = useSelector((state) => state.ProductReducer);

  const { specificPurchase } = useSelector((state) => state.PurchaseReducer);

  const [validateVarient, setValidateVarient] = useState(true);
  const [isRefund, setIsRefund] = useState(false);

  const [currentProductQuantity, setCurrentProductQuantity] = useState(0);
  const [slectedProductQuantity, setSelectedProductQuantity] = useState(0);

  const [editingProduct, setEditingProduct] = useState(null);

  const editProduct = (product) => {
    setEditingProduct(product);
  };

  useEffect(() => {
    if (specificPurchase) {
      formik.setValues({
        name: specificPurchase.name || "Customer",
        vendor_id: specificPurchase.vendor_id || "",
        saleStatus: specificPurchase.status || "pending",
        phone: specificPurchase.phone || "03",
        totalPurchase: specificPurchase.total_purchase || 0,
        status: specificPurchase.is_active === 1 ? true : false,
        totalSales: specificPurchase.total_sales || 0,
        totalDiscount: specificPurchase.total_discount || 0,
        vatPer: specificPurchase.vat_per || 0,
        vatAmount: specificPurchase.vat_amount || 0,
        totalAmount: specificPurchase.total_amount || 0,
        userId: user.id,
        products: specificPurchase.products || [],
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
  }, [specificPurchase]);

  const formik = useFormik({
    initialValues: {
      vendor_id: "",
      name: "Customer",
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
      vendor_id: Yup.number().required("Vendor Required"),
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
              .positive("Quantity should be greater than 0"),
            // .max(
            //   currentProductQuantity,
            //   "Quantity should be less than or equal to current product quantity."
            // ),
            total: Yup.number().required("Total is required"),
            discount_value: Yup.number().required("Discount is required"),
            is_discount_percentage: Yup.boolean(),
          })
        : Yup.object(),
    }),

    onSubmit: async (data) => {
      if (specificPurchase) {
        dispatch(updatePurchase(data, purchaseId)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch({ type: RESET_SPECIFIC_PURCHASE });
            dispatch(getPurchases());
            navigate(user?.role_id == 1 ? "/purchase" : "/purchase");
          }
        });
      } else {
        dispatch(addPurchase(data)).then((success) => {
          if (success.success) {
            formik.resetForm();
            dispatch(getPurchases());
            navigate("/purchase");
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

  useEffect(() => {
    if (formik.values.product?.product) {
      dispatch(getspecificVarientsByProduct(formik.values.product?.product));
    }
  }, [formik.values.product?.product]);

  useEffect(() => {
    if (user) {
      dispatch(getProducts());
      dispatch(getVendors());
    }
  }, []);

  useEffect(() => {
    if (purchaseId) {
      dispatch(getspecificPurchase(purchaseId));
      setValidateVarient(false);
    }
  }, []);

  useEffect(() => {
    if (formik.values.product?.varient && specificVarients?.length > 0) {
      const varient = specificVarients.find(
        (varient) => varient.varient_id === formik.values.product?.varient
      );

      if (varient) {
        setCurrentProductQuantity(varient.quantity);
      } else {
        setCurrentProductQuantity(0);
      }
    } else {
      setCurrentProductQuantity(0);
    }
  }, [formik.values.product?.varient]);

  useEffect(() => {
    if (formik.values.product.purchasePrice && formik.values.product.quantity) {
      formik.setFieldValue(
        "product.total",
        formik.values.product.purchasePrice * formik.values.product.quantity -
          formik.values.product.discount || 0
      );
    }
  }, [
    formik.values.product.purchasePrice,
    formik.values.product.quantity,
    formik.values.product.discount,
  ]);

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
      <form onSubmit={formik.handleSubmit}>
        <AddPurchaseForm
          formik={formik}
          isRefund={isRefund}
          setIsRefund={setIsRefund}
        />

        <div>
          <AddPurchaseProductForm
            formik={formik}
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
          <AddPurchaseProductTable
            products={formik.values.products}
            removeProduct={removeProduct}
            editProduct={editProduct}
          />
        </div>

        {formik.values.products?.length > 0 ? (
          <div className="my-3">
            <PurchaseCalculation formik={formik} />
          </div>
        ) : null}

        <div className="mt-16">
          <div className="flex justify-end gap-4">
            <Button
              label="Clear"
              icon="pi pi-times"
              className="p-red-btn"
              type="button"
              onClick={() => {
                formik.resetForm();
                setIsRefund(false);
              }}
            />
            <Button
              label={"Submit"}
              icon="pi pi-check"
              className="p-secondary-btn"
              type="submit"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

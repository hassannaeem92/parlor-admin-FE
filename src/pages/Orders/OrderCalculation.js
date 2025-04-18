import { Divider } from "primereact/divider";
import React, { useEffect } from "react";

export default function OrderCalculation({ formik }) {
  const calculateTotalSalePrice = () => {
    return formik?.values?.products?.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.salePrice * currentItem.quantity,
      0
    );
  };
  const calculateTotalPurchasePrice = () => {
    return formik?.values?.products?.reduce(
      (accumulator, currentItem) => accumulator + currentItem.purchasePrice,
      0
    );
  };
  const calculateTotalDiscount = () => {
    return formik?.values?.products?.reduce(
      (accumulator, currentItem) => accumulator + currentItem.discount,
      0
    );
  };

  useEffect(() => {
    if (formik.values?.products?.length > 0) {
      formik.setFieldValue("totalPurchase", calculateTotalPurchasePrice() || 0);
      formik.setFieldValue(
        "totalSales",
        formik.values.saleStatus === "refund"
          ? calculateTotalSalePrice() * -1
          : Math.abs(calculateTotalSalePrice()) || 0
      );
      formik.setFieldValue(
        "totalDiscount",
        formik.values.saleStatus === "refund"
          ? calculateTotalDiscount() * -1
          : Math.abs(calculateTotalDiscount()) || 0
      );
      formik.setFieldValue(
        "vatAmount",
        calculateTotalSalePrice() * (formik.values?.vatPer / 100) || 0
      );
      formik.setFieldValue(
        "totalAmount",
        formik.values.saleStatus === "refund"
          ? (calculateTotalSalePrice() +
              calculateTotalSalePrice() * (formik.values?.vatPer / 100) -
              calculateTotalDiscount()) *
              -1
          : Math.abs(
              calculateTotalSalePrice() +
                calculateTotalSalePrice() * (formik.values?.vatPer / 100) -
                calculateTotalDiscount()
            ) || 0
      );
    }
  }, [formik.values?.products, formik.values?.product]);

  return (
    <div className="flex justify-end">
      <div className="w-full lg:w-7/12 xl:w-5/12">
        <div className="card px-4 pt-0 pb-4 shadow-md rounded-lg flex flex-col gap-2">
          <Divider>
            <span className="text-2xl font-bold text-center text-primary mx-1">
              Sales Summary
            </span>
          </Divider>
          <div className="flex justify-between ">
            <h1 className="text-lg font-semibold">Total Items</h1>
            <span className="text-lg">{formik?.values?.products?.length}</span>
          </div>

          {/* <div className="flex justify-between gap-2">
            <h1 className="text-lg font-semibold">Total Purchase Price</h1>
            <span className="text-lg">
              RS {formik.values?.totalPurchase.toLocaleString("en-IN")}
            </span>
          </div> */}

          <div className="flex justify-between gap-2">
            <h1 className="text-lg font-semibold">
              Total{" "}
              {formik.values?.saleStatus === "invoice" ? "Sales" : "Refund"}{" "}
              Price
            </h1>
            <span className="text-lg">
              RS {formik.values?.totalSales.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between gap-2">
            <h1 className="text-lg font-semibold">Discount</h1>
            <span className="text-lg">
              RS {formik.values?.totalDiscount.toLocaleString("en-IN")}
            </span>
          </div>

          <div className="flex justify-between gap-2">
            <h1 className="text-lg font-semibold">VAT %</h1>
            <span className="text-lg">{formik.values?.vatPer}%</span>
          </div>

          <div className="flex justify-between gap-2">
            <h1 className="text-lg font-semibold">VAT Amount</h1>
            <span className="text-lg">
              RS {formik.values?.vatAmount.toLocaleString("en-IN")}
            </span>
          </div>

          <Divider
            pt={{
              root: { className: "!my-2" },
            }}
          />

          <div className="flex justify-end gap-3">
            <h1 className="text-lg font-semibold">Total Amount:</h1>
            <span className="text-lg">
              RS {formik.values?.totalAmount.toLocaleString("en-IN")}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

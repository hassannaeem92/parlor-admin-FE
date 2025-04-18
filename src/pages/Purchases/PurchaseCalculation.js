import { Divider } from "primereact/divider";
import React, { useEffect } from "react";

export default function PurchaseCalculation({ formik }) {
  const calculateTotalPurchasePrice = () => {
    return formik?.values?.products?.reduce(
      (accumulator, currentItem) =>
        accumulator + currentItem.purchasePrice * currentItem.quantity,
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
      const totalPurchasePrice = calculateTotalPurchasePrice() || 0;
      const totalDiscount = calculateTotalDiscount() || 0;
      const vatPercentage = formik.values?.vatPer || 0;

      formik.setFieldValue("totalPurchase", totalPurchasePrice);
      formik.setFieldValue("totalDiscount", totalDiscount);

      const vatAmount =
        (totalPurchasePrice - totalDiscount) * (vatPercentage / 100);
      formik.setFieldValue("vatAmount", vatAmount);

      const totalAmount = totalPurchasePrice - totalDiscount + vatAmount;
      formik.setFieldValue("totalAmount", totalAmount);
    } else {
      // Reset all values to default if no products are present
      formik.setFieldValue("totalPurchase", 0);
      formik.setFieldValue("totalDiscount", 0);
      formik.setFieldValue("vatAmount", 0);
      formik.setFieldValue("totalAmount", 0);
    }
  }, [formik.values?.products, formik.values?.vatPer]);

  return (
    <div className="flex justify-end">
      <div className="w-full lg:w-7/12 xl:w-5/12">
        <div className="card px-4 pt-0 pb-4 shadow-md rounded-lg flex flex-col gap-2">
          <Divider>
            <span className="text-2xl font-bold text-center text-primary mx-1">
              Purchase Summary
            </span>
          </Divider>
          <div className="flex justify-between">
            <h1 className="text-lg font-semibold">Total Items</h1>
            <span className="text-lg">{formik?.values?.products?.length}</span>
          </div>

          <div className="flex justify-between gap-2">
            <h1 className="text-lg font-semibold">
              Total{" "}
              {formik.values?.saleStatus === "invoice" ? "Purchase" : "Refund"}{" "}
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

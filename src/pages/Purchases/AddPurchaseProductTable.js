import React, { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Menu } from "primereact/menu";

export default function AddPurchaseProductTable({
  products,
  removeProduct,
  editProduct,
}) {
  const menu = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { allVarients, products: allProducts } = useSelector(
    (state) => state.ProductReducer
  );
  const [showDelDialog, setShowDelDialog] = useState(false);

  const accept = () => {
    removeProduct(selectedItem?.id);
  };

  const reject = () => {
    setShowDelDialog(false);
  };

  let items = [
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => {
        editProduct(selectedItem);
      },
    },
    {
      label: "Delete",
      icon: "pi pi-trash",
      command: () => {
        setShowDelDialog(true);
      },
    },
  ];

  const actionBtn = (rowData) => (
    <React.Fragment>
      <div className=" ">
        <i
          className="pi pi-cog text-secondary cursor-pointer"
          onClick={(e) => {
            menu.current.toggle(e);
            setSelectedItem(rowData);
          }}
        ></i>
        <Menu model={items} popup ref={menu} className="p-0 z-50" />
      </div>
    </React.Fragment>
  );

  const purchasePriceBody = (rowData) => {
    return `RS ${rowData.purchasePrice?.toLocaleString("en-IN")}`;
  };

  const discountAmountBody = (rowData) => {
    return `RS ${rowData.discount?.toLocaleString("en-IN")}`;
  };

  const totalBody = (rowData) => {
    return `RS ${rowData.total?.toLocaleString("en-IN")}`;
  };

  const productBody = (rowData) => {
    const product = allProducts.find(
      (product) => product.id === rowData.product
    );
    return `${product?.title} - ${product?.article_name}`;
  };

  const variantBody = (rowData) => {
    console.log("rowData:", rowData);
    console.log("allVarients:", allVarients);

    const variant = allVarients.find(
      (varient) => varient.varient_id === rowData.varient
    );

    console.log("Found variant:", variant);

    if (variant) {
      const parsedOptions = JSON.parse(variant.options);
      const optionLabel = parsedOptions
        .map((option) => {
          return `${option} - ${variant[option]?.value || "N/A"}`;
        })
        .join("  |  ");

      return optionLabel;
    } else {
      return "Variant not found";
    }
  };

  return (
    <div>
      <div className="card shadow-sm">
        <DataTable
          value={products}
          tableStyle={{ minWidth: "50rem" }}
          stripedRows
          pt={{
            filterOperator: { className: "w-3" },
            footerRow: { className: "!bg-red-900" },
          }}
          size="small"
        >
          <Column field="id" header="ID #" />
          <Column field="product" header="Products" body={productBody} />
          <Column field="varient" header="Variant" body={variantBody} />
          <Column field="quantity" header="Quantity" />
          <Column
            field="purchasePrice"
            header="Purchase Price"
            body={purchasePriceBody}
          />
          <Column
            field="discount_value"
            header="Discount"
            body={discountAmountBody}
          />
          <Column field="total" header="Total " body={totalBody} />
          <Column header="Action" body={actionBtn} />
        </DataTable>
      </div>

      <ConfirmDialog
        message="Do you want to delete this record?"
        header="Delete confirmation"
        icon="pi pi-info-circle"
        accept={accept}
        reject={reject}
        acceptLabel="Yes"
        visible={showDelDialog}
        onHide={() => setShowDelDialog(false)}
        pt={{
          acceptButton: {
            className: "p-red-btn",
          },
          rejectButton: {
            className: "p-primary-btn",
          },
          root: {
            className: "w-9/12 sm:w-7/12 md:w-5/12 lg:w-4/12 xl:w-3/12",
          },
          icon: {
            className: "mx-2",
          },
        }}
      />
    </div>
  );
}

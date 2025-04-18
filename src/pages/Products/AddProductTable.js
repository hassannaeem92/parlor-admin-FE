import React, { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useSelector } from "react-redux";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Menu } from "primereact/menu";

export default function AddProductTable({
  varients,
  removeVarient,
  editVarient,
}) {
  const menu = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const { varientOptions } = useSelector((state) => state.ProductReducer);
  const [showDelDialog, setShowDelDialog] = useState(false);
  const { enableCurrency } = useSelector((state) => state.CurrencyReducer);

  const accept = () => {
    removeVarient(selectedItem?.id);
  };

  const reject = () => {
    setShowDelDialog(false);
  };

  let items = [
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => {
        editVarient(selectedItem);
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

  const priceBody = (rowData) => {
    return `${enableCurrency?.unit || ""} ${rowData.price.toLocaleString(
      "en-IN"
    )}`;
  };

  const discountBody = (rowData) => {
    return `${enableCurrency?.unit || ""} ${rowData?.discount?.toLocaleString(
      "en-IN"
    )}`;
  };

  const purchasePriceBody = (rowData) => {
    return `${
      enableCurrency?.unit || ""
    } ${rowData.purchasePrice.toLocaleString("en-IN")}`;
  };

  return (
    <div>
      <div className="card shadow-sm">
        <DataTable
          value={varients}
          tableStyle={{ minWidth: "50rem" }}
          stripedRows
          size="small"
          pt={{
            filterOperator: { className: "w-3" },
            footerRow: { className: "!bg-red-900" },
          }}
        >
          <Column field="id" header="ID #" />
          {varientOptions &&
            varientOptions.map((option) => (
              <Column
                key={option.id}
                field={(row) => row[option?.label]?.value}
                header={option.label}
                headerClassName="capitalize"
              />
            ))}
          {/* <Column field="quantity" header="Quantity" /> */}

          <Column
            field="price"
            header="Purchase Price"
            body={purchasePriceBody}
          />
          <Column field="price" header="Sale Price" body={priceBody} />
          <Column field="discount" header="Discount" body={discountBody} />

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

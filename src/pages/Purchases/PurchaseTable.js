import React, { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Menu } from "primereact/menu";
import {
  deleteCategory,
  deleteMultipleCategory,
  getCategory,
} from "../../store/AsyncMethods/CategoryMethod";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tag } from "primereact/tag";
import { paginatorTemplate } from "../../components/OtherComponents/PaginatorTemplate";
import InputFocus from "../../hooks/InputFocus";

export default function PurchaseTable() {
  const { allPurchases } = useSelector((state) => state.PurchaseReducer);
  const { enableCurrency } = useSelector((state) => state.CurrencyReducer);
  const menu = useRef(null);
  const inputRef = InputFocus();

  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [showMultipleDelDialog, setShowMultipleDelDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);

  const accept = () => {
    dispatch(deleteCategory(selectedItem?.id)).then((success) => {
      if (success) {
        setSelectedItem(null);
        dispatch(getCategory());
      }
    });
  };

  const reject = () => {
    setShowDelDialog(false);
  };

  const acceptMultiple = () => {
    if (selectedProducts) {
      const idsArray = selectedProducts.map((obj) => obj.id);

      if (selectedProducts?.length !== 0) {
        dispatch(deleteMultipleCategory(idsArray)).then((success) => {
          if (success) {
            setSelectedProducts(null);
            dispatch(getCategory());
          }
        });
      }
    } else {
      toast.info("No any record selected.");
    }
  };

  const rejectMultiple = () => {
    setShowMultipleDelDialog(false);
  };

  const [filters, setFilters] = useState({
    global: { value: null, matchMode: FilterMatchMode.CONTAINS },
  });

  const onGlobalFilterChange = (event) => {
    const value = event.target.value;
    let _filters = { ...filters };

    _filters["global"].value = value;

    setFilters(_filters);
  };

  //   const handleStatusChange = () => {
  //     if (selectedProducts) {
  //       const idsArray = selectedProducts.map((obj) => obj.id);

  //       if (selectedProducts?.length !== 0) {
  //         setDialogVisible(true);
  //       } else {
  //         toast.info("No any record selected.");
  //       }
  //     } else {
  //       toast.info("No any record selected.");
  //     }
  //   };

  const paginatorLeft = (
    <div className="mr-auto flex gap-2">
      {/* <Button
        label="Delete"
        icon="pi pi-trash"
        className="p-red-btn !mr-auto"
        onClick={() => setShowMultipleDelDialog(true)}
      /> */}
      {/* <Button
        label="Change Status"
        icon="pi pi-pencil"
        className="p-primary-btn !mr-auto"
        onClick={handleStatusChange}
      /> */}
    </div>
  );

  const renderHeader = () => {
    const value = filters["global"] ? filters["global"].value : "";

    return (
      <div className="flex justify-between">
        {/* <div>
          <Button
            label="Delete"
            icon="pi pi-trash"
            className="p-red-btn"
            onClick={() => setShowMultipleDelDialog(true)}
          />
        </div> */}
        <span className="p-input-icon-left flex w-10/12 sm:w-8/12 md:w-6/12 lg:w-4/12 xl:w-3/12 ">
          {/* <i className="pi pi-search" /> */}
          <InputText
            ref={inputRef}
            className="w-full p-primary-input"
            type="search"
            value={value || ""}
            onChange={(e) => onGlobalFilterChange(e)}
            placeholder="Search"
          />
        </span>
      </div>
    );
  };

  const header = renderHeader();

  let items = [
    {
      label: "Edit",
      icon: "pi pi-pencil",
      command: () => {
        navigate(`/edit-categories/${selectedItem?.id}`);
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

  const dateAndTimeBody = (rowData) => {
    const date = new Date(rowData.created_at);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear());
    let hour = date.getHours();
    const minute = String(date.getMinutes()).padStart(2, "0");
    //const second = String(date.getSeconds()).padStart(2, '0');
    let period = "AM";

    if (hour >= 12) {
      period = "PM";
      hour = hour === 12 ? hour : hour - 12;
    }

    hour = String(hour).padStart(2, "0");

    const formattedDate = `${day}-${month}-${year}, ${hour}:${minute} ${period}`;
    return formattedDate;
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.status}
        className="capitalize"
        pt={{
          root: {
            className: getSeverity(rowData.status),
          },
        }}
      />
    );
  };

  const getSeverity = (data) => {
    switch (data) {
      case "pending":
        return "bg-blue-500";

      case "proceed":
        return "bg-purple-500";

      case "delivered":
        return "bg-pink-500";

      default:
        return null;
    }
  };

  return (
    <div>
      <div className="card shadow-sm">
        <DataTable
          value={allPurchases}
          tableStyle={{ minWidth: "50rem" }}
          stripedRows
          paginator
          rows={5}
          rowsPerPageOptions={[5, 10, 25, 50]}
          className=""
          header={header}
          filters={filters}
          onFilter={(e) => setFilters(e.filters)}
          paginatorTemplate={paginatorTemplate}
          selection={selectedProducts}
          onSelectionChange={(e) => setSelectedProducts(e.value)}
          pt={{
            filterOperator: { className: "w-3" },
            footerRow: { className: "!bg-red-900" },
          }}
          onRowClick={(e) => navigate("/edit-purchase/" + e.data.id)}
          paginatorLeft={paginatorLeft}
          paginatorClassName=""
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column field="name" sortable header="Vendor Name" />
          <Column
            field="total_amount"
            sortable
            header="Total Amount"
            body={(rowData) =>
              `${enableCurrency?.unit || ""} ` +
              rowData?.total_amount?.toLocaleString("en-IN")
            }
          />
          <Column
            header="Total Products"
            body={(rowData) => rowData?.products?.length}
          />
          {/* <Column
            field="status"
            sortable
            header="Status"
            body={statusBodyTemplate}
            style={{ minWidth: "110px" }}
            className="captialize"
          /> */}
          <Column
            field="created_at"
            sortable
            header="Date"
            body={dateAndTimeBody}
          />
          {/* <Column header="Action" body={actionBtn} /> */}
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

      <ConfirmDialog
        message={`Are you sure, you want to delete selected ${
          selectedProducts?.length
        } ${selectedProducts?.length > 1 ? "Records" : "Record"} ?`}
        header="Delete confirmation"
        icon="pi pi-info-circle"
        accept={acceptMultiple}
        reject={rejectMultiple}
        acceptLabel="Yes"
        visible={showMultipleDelDialog}
        onHide={() => setShowMultipleDelDialog(false)}
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

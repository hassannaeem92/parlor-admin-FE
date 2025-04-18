import React, { useRef, useState } from "react";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { FilterMatchMode } from "primereact/api";
import { Menu } from "primereact/menu";
import { useTranslation } from "react-i18next";
import { Dropdown } from "primereact/dropdown";

import {
  deleteCategory,
  deleteMultipleCategory,
  getCategory,
  getspecificCategory,
} from "../../store/AsyncMethods/CategoryMethod";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tag } from "primereact/tag";
import {
  deleteMultipleUsers,
  getUsers,
} from "../../store/AsyncMethods/UserMethod";
import {
  deleteMultipleCurrency,
  getCurrency,
} from "../../store/AsyncMethods/CurrencyMethod";
import {
  deleteMultipleCustomers,
  getCustomers,
} from "../../store/AsyncMethods/CustomerMethod";
import { paginatorTemplate } from "../../components/OtherComponents/PaginatorTemplate";
import InputFocus from "../../hooks/InputFocus";

export default function CustomerTable() {
  const { allCustomers } = useSelector((state) => state.CustomersReducer);
  const { t } = useTranslation();
  const inputRef = InputFocus();

  const menu = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [showMultipleDelDialog, setShowMultipleDelDialog] = useState(false);
  const [selectedCurrency, setSelectedCurrency] = useState(null);

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
    if (selectedCurrency) {
      const idsArray = selectedCurrency.map((obj) => obj.id);

      if (selectedCurrency?.length !== 0) {
        dispatch(deleteMultipleCustomers(idsArray)).then((success) => {
          if (success) {
            setSelectedCurrency(null);
            dispatch(getCustomers());
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

  const paginatorLeft = (
    <div className="mr-auto">
      <Button
        label={t("delete")}
        icon="pi pi-trash"
        className="p-red-btn !mr-auto"
        onClick={() => setShowMultipleDelDialog(true)}
        disabled={selectedCurrency?.length > 0 ? false : true}
      />
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
            placeholder={t("search")}
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

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.is_active ? "Actice" : "Deactive"}
        pt={{
          root: {
            className: getSeverity(rowData),
          },
        }}
      />
    );
  };

  const getSeverity = (data) => {
    switch (data.is_active) {
      case 1:
        return "bg-green";

      case 0:
        return "bg-red";

      default:
        return null;
    }
  };

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

  return (
    <div>
      <div className="card shadow-sm">
        <DataTable
          value={allCustomers}
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
          selection={selectedCurrency}
          onSelectionChange={(e) => setSelectedCurrency(e.value)}
          pt={{
            filterOperator: { className: "w-3" },
            footerRow: { className: "!bg-red-900" },
          }}
          onRowClick={(e) => navigate("/edit-customer/" + e.data.id)}
          paginatorLeft={paginatorLeft}
          paginatorClassName=""
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="name"
            sortable
            header={t("Name")}
            style={{ minWidth: "150px" }}
          />
          <Column
            field="email"
            sortable
            header={t("Email")}
            style={{ minWidth: "150px" }}
          />
          <Column
            field="phone"
            sortable
            header={t("Phone")}
            style={{ minWidth: "150px" }}
          />

          <Column
            field="is_active"
            sortable
            header={t("status")}
            body={statusBodyTemplate}
            style={{ minWidth: "110px" }}
          />
          <Column
            field="created_at"
            sortable
            header={t("date")}
            body={dateAndTimeBody}
            style={{ minWidth: "170px" }}
          />
          {/* <Column header="Action" body={actionBtn} /> */}
        </DataTable>
      </div>
      <ConfirmDialog
        message={`Are you sure, you want to delete selected ${
          selectedCurrency?.length
        } ${selectedCurrency?.length > 1 ? "Records" : "Record"} ?`}
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
          selectedCurrency?.length
        } ${selectedCurrency?.length > 1 ? "Records" : "Record"} ?`}
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

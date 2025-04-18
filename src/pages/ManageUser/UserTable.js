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
import { paginatorTemplate } from "../../components/OtherComponents/PaginatorTemplate";
import InputFocus from "../../hooks/InputFocus";

export default function UserTable() {
  const { allUsers } = useSelector((state) => state.UserReducer);
  const menu = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = InputFocus();

  const [showDelDialog, setShowDelDialog] = useState(false);
  const [showMultipleDelDialog, setShowMultipleDelDialog] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState(null);

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
    if (selectedUsers) {
      const idsArray = selectedUsers.map((obj) => obj.id);

      if (selectedUsers?.length !== 0) {
        dispatch(deleteMultipleUsers(idsArray)).then((success) => {
          if (success) {
            setSelectedUsers(null);
            dispatch(getUsers());
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
        label="Delete"
        icon="pi pi-trash"
        className="p-red-btn !mr-auto"
        onClick={() => setShowMultipleDelDialog(true)}
        disabled={selectedUsers?.length > 0 ? false : true}
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

  const createdByBody = (rowData) => {
    const findUser = allUsers.find((user) => user.id === rowData.created_by);
    return findUser ? findUser.first_name : "N/A";
  };

  const statusBodyTemplate = (rowData) => {
    return (
      <Tag
        value={rowData.is_active ? "Active" : "Deactive"}
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
          value={allUsers}
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
          selection={selectedUsers}
          onSelectionChange={(e) => setSelectedUsers(e.value)}
          pt={{
            filterOperator: { className: "w-3" },
            footerRow: { className: "!bg-red-900" },
          }}
          onRowClick={(e) => navigate("/edit-user/" + e.data.id)}
          paginatorLeft={paginatorLeft}
          paginatorClassName=""
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="first_name"
            sortable
            header="First Name"
            style={{ minWidth: "150px" }}
          />
          <Column
            field="last_name"
            sortable
            header="Last Name"
            style={{ minWidth: "150px" }}
          />
          <Column
            field="email"
            sortable
            header="Email"
            style={{ minWidth: "150px" }}
          />
          <Column
            header="Created By"
            style={{ minWidth: "150px" }}
            body={createdByBody}
            sortable
            sortFunction={createdByBody}
            filterFunction={createdByBody}
          />
          <Column
            field="is_active"
            sortable
            header="Status"
            body={statusBodyTemplate}
            style={{ minWidth: "110px" }}
          />
          <Column
            field="created_at"
            sortable
            header="Date"
            body={dateAndTimeBody}
            style={{ minWidth: "170px" }}
          />
          {/* <Column header="Action" body={actionBtn} /> */}
        </DataTable>
      </div>
      <ConfirmDialog
        message={`Are you sure, you want to delete selected ${
          selectedItem?.length
        } ${selectedItem?.length > 1 ? "Records" : "Record"} ?`}
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
          selectedUsers?.length
        } ${selectedUsers?.length > 1 ? "Records" : "Record"} ?`}
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

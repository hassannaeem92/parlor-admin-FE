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
  getCategory,
  getSubCategory,
  getspecificCategory,
} from "../../store/AsyncMethods/CategoryMethod";
import { ConfirmDialog } from "primereact/confirmdialog";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Tag } from "primereact/tag";
import {
  activeMultipleProduct,
  deactiveMultipleProduct,
  deleteMultipleProduct,
  getProducts,
} from "../../store/AsyncMethods/ProductMethod";
import { SelectButton } from "primereact/selectbutton";
import { Dropdown } from "primereact/dropdown";
import { paginatorTemplate } from "../../components/OtherComponents/PaginatorTemplate";
import InputFocus from "../../hooks/InputFocus";

export default function ProductTable() {
  const { products } = useSelector((state) => state.ProductReducer);
  const { enableCurrency } = useSelector((state) => state.CurrencyReducer);
  const inputRef = InputFocus();

  const menu = useRef(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showDelDialog, setShowDelDialog] = useState(false);
  const [showMultipleDelDialog, setShowMultipleDelDialog] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState(null);
  const maxLength = 15;
  const [isActiveReq, setIsActiveReq] = useState(true);

  const statusOptions = [
    { name: "Active", value: true },
    { name: "Deactive", value: false },
  ];

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
        dispatch(deleteMultipleProduct(idsArray)).then((success) => {
          if (success) {
            setSelectedProducts(null);
            dispatch(getProducts());
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
    <div className="mr-auto flex gap-2">
      <Button
        label="Delete"
        icon="pi pi-trash"
        disabled={selectedProducts?.length > 0 ? false : true}
        className="p-red-btn !mr-auto"
        onClick={() => setShowMultipleDelDialog(true)}
      />

      <Button
        label="Active"
        icon="pi pi-check-circle"
        className="p-primary-btn !mr-auto"
        onClick={() => {
          if (selectedProducts) {
            const idsArray = selectedProducts.map((obj) => obj.id);

            if (selectedProducts?.length !== 0) {
              dispatch(activeMultipleProduct(idsArray)).then((success) => {
                if (success) {
                  setSelectedProducts(null);
                  dispatch(getProducts());
                }
              });
            }
          } else {
            toast.info("No any record selected.");
          }
        }}
      />

      <Button
        label="Deactive"
        icon="pi pi-minus-circle"
        className="p-primary-btn !mr-auto"
        onClick={() => {
          if (selectedProducts) {
            const idsArray = selectedProducts.map((obj) => obj.id);

            if (selectedProducts?.length !== 0) {
              dispatch(deactiveMultipleProduct(idsArray)).then((success) => {
                if (success) {
                  setSelectedProducts(null);
                  dispatch(getProducts());
                }
              });
            }
          } else {
            toast.info("No any record selected.");
          }
        }}
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
    return `${enableCurrency?.unit || ""} ${rowData.price}`;
  };

  const quantityBody = (rowData) => {
    return `mock: 100`;
  };

  const varientsBody = (rowData) => {
    return `${rowData?.varients?.length}`;
  };

  const descriptionTemplate = (rowData) => {
    const truncatedDescription =
      rowData.description?.length > maxLength
        ? rowData.description.substring(0, maxLength) + "..."
        : rowData.description;

    return <span title={rowData.description}>{truncatedDescription}</span>;
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
          value={products}
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
          onRowClick={(e) => navigate("/edit-product/" + e.data.id)}
          paginatorLeft={paginatorLeft}
          paginatorClassName=""
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          <Column
            selectionMode="multiple"
            headerStyle={{ width: "3rem" }}
          ></Column>
          <Column
            field="title"
            sortable
            header="Product Title"
            style={{ minWidth: "150px" }}
          />
          <Column
            field="article_name"
            sortable
            header="Article Number"
            style={{ minWidth: "150px" }}
          />
          <Column
            field="category_name"
            sortable
            body={(rowData) =>
              !rowData?.c_delete ? rowData?.category_name : "empty"
            }
            header="Category"
            style={{ minWidth: "150px" }}
          />

          <Column
            field="sub_category_name"
            sortable
            header="Sub Category"
            body={(rowData) =>
              !rowData?.sc_delete ? rowData?.sub_category_name : "empty"
            }
            style={{ minWidth: "150px" }}
          />
          <Column
            field="price"
            sortable
            header="Price"
            body={priceBody}
            style={{ minWidth: "100px" }}
          />
          {/* <Column
            field="Quantity"
            sortable
            header="Quantity"
            body={quantityBody}
            style={{ minWidth: "100px" }}
          /> */}
          {/* <Column
            field="description"
            sortable
            header="Description"
            body={descriptionTemplate}
            style={{ minWidth: "150px" }}
          /> */}
          <Column
            sortable
            header="Total Varients"
            body={varientsBody}
            style={{ minWidth: "150px" }}
          />
          <Column
            field="created_by_username"
            sortable
            header="Created By"
            style={{ minWidth: "130px" }}
          />
          <Column
            field="updated_by_username"
            sortable
            header="Updated By"
            style={{ minWidth: "130px" }}
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

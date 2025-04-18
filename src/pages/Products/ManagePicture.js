import React, { useRef, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { Button } from "primereact/button";
import { Tag } from "primereact/tag";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch } from "react-redux";
import { addProductImages } from "../../store/AsyncMethods/ProductMethod";

export default function ManagePicture({ formik }) {
  const [totalSize, setTotalSize] = useState(0);
  const dispatch = useDispatch();

  const onTemplateRemove = (file, callback) => {
    setTotalSize(totalSize - file.size);
    callback();
  };

  const headerTemplate = (options) => {
    const { className, chooseButton } = options;

    return (
      <div
        className={className}
        style={{
          backgroundColor: "transparent",
          display: "flex",
          alignItems: "center",
          paddingLeft: 0,
          marginBottom: "5px",
          marginTop: "5px",
        }}
      >
        {chooseButton}
      </div>
    );
  };

  const itemTemplate = (file, props) => {
    return (
      <div className="flex items-center justify-between w-full">
        <div className="flex items-center" style={{ width: "40%" }}>
          <img
            alt={file.name}
            role="presentation"
            src={file.objectURL}
            className="w-28 h-28"
          />
          <span className="flex flex-col text-left ml-3">
            {file.name}
            <small>{new Date().toLocaleDateString()}</small>
          </span>
        </div>
        {/* <Tag value={props.formatSize} className="px-3 py-2 bg-yellow-500" /> */}
        <Button
          type="button"
          icon="pi pi-times"
          rounded
          className="p-red-btn"
          onClick={() => {
            onTemplateRemove(file, props.onRemove);
          }}
        />
      </div>
    );
  };

  const emptyTemplate = () => {
    return (
      <div className="flex items-center flex-col">
        <i
          className="pi pi-image mt-3 p-5"
          style={{
            fontSize: "2em",
            borderRadius: "50%",
            backgroundColor: "var(--surface-b)",
            color: "var(--surface-d)",
          }}
        ></i>
        <span
          style={{ fontSize: "1em", color: "var(--text-color-secondary)" }}
          className="my-2"
        >
          Drag and Drop Excel File Here
        </span>
      </div>
    );
  };

  const chooseOptions = {
    icon: "pi pi-fw pi-image",
    className: "p-primary-btn",
  };

  //   const formik = useFormik({
  //     initialValues: {
  //       images: null,
  //     },
  //     validationSchema: Yup.object({
  //       images: Yup.array()
  //         .required("Please upload at least one image.")
  //         .of(
  //           Yup.mixed()
  //             .test(
  //               "fileFormat",
  //               "Invalid file format. Please upload an image file (PNG, JPG, JPEG).",
  //               (value) => {
  //                 // Ensure the value is a File object
  //                 if (value instanceof File) {
  //                   // Check the file type
  //                   return (
  //                     value.type === "image/png" ||
  //                     value.type === "image/jpeg" ||
  //                     value.type === "image/jpg"
  //                   );
  //                 }
  //                 return false;
  //               }
  //             )
  //             .test("fileSize", "Image size should not exceed 1 MB.", (value) => {
  //               // Ensure the value is a File object
  //               if (value instanceof File) {
  //                 // Check the file size
  //                 return value.size <= 1024 * 1024; // 1 MB in bytes
  //               }
  //               return false;
  //             })
  //         ),
  //     }),
  //     onSubmit: async (data) => {
  //       const formData = new FormData();
  //       data.images.forEach((file, index) => {
  //         formData.append(`images`, file);
  //       });
  //       dispatch(addProductImages(formData)).then((success) => {
  //         if (success) {
  //           setDialogVisible(false);
  //         }
  //       });
  //     },
  //   });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <FileUpload
          name="images"
          accept="image/png, image/jpeg, image/jpg"
          headerTemplate={headerTemplate}
          itemTemplate={itemTemplate}
          emptyTemplate={emptyTemplate}
          chooseOptions={chooseOptions}
          progressBarTemplate={() => <></>}
          multiple
          pt={{
            content: { className: "!p-2 !rounded-md" },
          }}
          onSelect={(e) => {
            if (e.files?.length > 0) {
              formik.setFieldError("images", "");
              formik.setFieldValue("images", e.files);
            }
          }}
          onClear={() => {
            formik.setFieldValue("images", []);
          }}
          onError={(e) => {
            formik.setFieldError("images", "Error on uploading file.");
          }}
        />
        {formik.touched.images && formik.errors.images && (
          <div className="p-error">{formik.errors.images}</div>
        )}

        {/* <div className="mt-4 flex justify-center gap-4">
          <Button
            type="button"
            label={"Clear"}
            icon="pi pi-times"
            className="p-red-btn px-10 dark:text-white"
            onClick={() => {
              setDialogVisible(false);
              formik.resetForm();
            }}
          />
          <Button
            type="submit"
            label={"Submit"}
            icon="pi pi-check"
            className="p-primary-btn px-10 dark:text-white dark:bg-primary"
          />
        </div> */}
      </form>
    </div>
  );
}

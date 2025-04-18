import { ConfirmDialog } from "primereact/confirmdialog";
import { Image } from "primereact/image";
import React, { useState } from "react";
import {
  delProductImage,
  getspecificProduct,
} from "../../store/AsyncMethods/ProductMethod";
import { useDispatch } from "react-redux";

export default function ProductImage({ path, image, imgId, productId }) {
  const [showDelDialog, setShowDelDialog] = useState(false);
  const dispatch = useDispatch();

  const accept = () => {
    dispatch(delProductImage(imgId)).then((success) => {
      if (success) {
        dispatch(getspecificProduct(productId));
      }
    });
  };

  const reject = () => {
    setShowDelDialog(false);
  };

  return (
    <div className="flex flex-col gap-2">
      <Image
        src={`${path}${image}`}
        zoomSrc={`${path}${image}`}
        preview
        className="rounded-full w-24 h-24"
        pt={{
          image: { className: "rounded-full w-24 h-24" },
          button: { className: "rounded-full" },
        }}
        accept="image/*" // Accept all image file types
      />
      <div className="flex justify-center">
        <i
          className="pi pi-trash text-red cursor-pointer"
          onClick={() => setShowDelDialog(true)}
        ></i>
      </div>

      <ConfirmDialog
        message="Do you want to delete this image?"
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

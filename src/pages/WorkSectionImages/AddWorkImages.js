import { useEffect, useState } from "react";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

import {
  getWorkImages
} from "../../store/AsyncMethods/ServicePriceMethod";
import {
  addWorkImages
} from "../../store/AsyncMethods/ServicePriceMethod";
import { baseURL, baseURLImage } from "../../constants/constants";

export default function ImageUploader() {
  // const baseURL = "http://localhost:7001/uploads"

  const { workImages } = useSelector((state) => state.ServicePriceReducer);

  const dispatch = useDispatch();
  const [images, setImages] = useState([]);

  // const imageUrl = workImages.imagePath ? ${baseURL}${workImages.imagePath} : "";
  useEffect(() => {
    if (workImages && workImages.length) {
      const fetchedImages = workImages.map((img) => ({
        id: img.id, // Keep ID for reference
        src: img.imagePath ? `${baseURLImage}${img.imagePath}` : "", // Construct full image URL
        type: 'edit'
      }));
      
      setImages(fetchedImages);
    }
  }, [workImages]);

  // useEffect(() => {
  //   debugger
  //   if (workImages) {
  //     const fetchedImages = [{
  //       id: workImages.id, // Keep ID for reference
  //       src: workImages.imagePath ? `${baseURL}${workImages.imagePath}` : ""
  //     }]

  //     setImages(fetchedImages);

  //   }
  // }, [workImages]);

  useEffect(() => {
    dispatch(getWorkImages());

  }, []);


  // const handleImageUpload = (event) => {
  //   const files = Array.from(event.target.files);
  //   setImages((prevImages) => [...prevImages, ...files]);
  // };

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files).map((file) => ({
      src: file,
      type: "add", // Adding the key
    }));
  
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const files = Array.from(event.dataTransfer.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const clearImages = () => {
    setImages([]);
  };

  const saveImages = async () => {
    if (images.length === 0) {
      console.log("No images to upload");
      return;
    }

    const formData = new FormData();
    images.forEach((image) => {
      formData.append("files", image.src);
    });

    try {
      console.log("Uploading images...", formData);

      // Dispatch addWorkImages with formData
      const success = await dispatch(addWorkImages(formData));


      if (success) {
        console.log("Images uploaded successfully");
        toast.success("Image Update successfuly");

        dispatch(getWorkImages());
      } else {
        console.error("Failed to save images");
      }
    } catch (error) {
      console.error("Error uploading images:", error);
    }
  };



  const removeImage = (index) => {
    setImages(images.filter((_, i) => i !== index));
  };

  return (
    <div className="mx-4">
      <div className="card shadow-md rounded-lg p-4 mb-4 mt-4">
        <Divider>
          <span className="text-2xl font-bold text-center text-primary mx-1">
            Upload Images
          </span>
        </Divider>

        <div>
          <div
            className="w-full h-40 p-10 border-dashed border-2 border-gray-400 rounded-lg flex flex-col items-center justify-center cursor-pointer bg-gray-100 hover:bg-gray-200"
            onClick={() => document.getElementById("fileInput").click()}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
          >
            <p className="text-lg font-bold text-gray-700">
              Drag & Drop or Click to Upload
            </p>
            <input
              type="file"
              id="fileInput"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Image Preview Grid */}
          <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 mt-5">
            {images.map((image, index) => (
              <div
                key={index}
                className="relative border rounded-lg overflow-hidden shadow-md"
              >
                {/* ❌ Remove Button */}
                <button

                  className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center shadow-md hover:bg-red-600"
                  onClick={() => removeImage(index)}
                >
                  ❌
                </button>

                {/* Image Preview */}
                {/* <img
                  src={URL.createObjectURL(image)}
                  alt="preview"
                  className="w-full h-40 object-cover"
                /> */}

                {/* <img
                  src={image.src instanceof File ? URL.createObjectURL(image.src) : image.src}
                  alt="preview"
                  className="w-full h-40 object-cover"
                /> */}

<img
  src={
    image.type === "edit"
      ? image.src instanceof File
        ? URL.createObjectURL(image.src)
        : String(image.src)
      : image.type === "add"
      ? URL.createObjectURL(image.src)
      : ""
  }
  alt="preview"
  className="w-full h-40 object-cover"
/>


              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-16">
          <div className="flex justify-end gap-4">
            <Button
              label="Clear"
              icon="pi pi-times"
              className="p-red-btn"
              type="button"
              onClick={clearImages}
            />
            <Button
              label="Submit"
              icon="pi pi-check"
              className="p-secondary-btn"
              type="button"
              onClick={saveImages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

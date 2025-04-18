import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { InputTextarea } from "primereact/inputtextarea";
import { SelectButton } from "primereact/selectbutton";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Divider } from "primereact/divider";
import {
  getFAQs,
  getspecificFAQs,
  updateFAQs,
} from "../../store/AsyncMethods/FAQsMethod";
import { RESET_SPECIFIC_FAQS } from "../../store/Types/FAQsTypes";
import InputFocus from "../../hooks/InputFocus";

export default function EditFAQs() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const statusOptions = [
    { name: "Enabled", value: true },
    { name: "Disabled", value: false },
  ];
  const { specificFAQS } = useSelector((state) => state.FAQsReducer);
  const inputRef = InputFocus();

  useEffect(() => {
    if (specificFAQS) {
      formik.setFieldValue("title", specificFAQS?.faq_title);
      formik.setFieldValue("description", specificFAQS?.faq_description);
      formik.setFieldValue("status", specificFAQS?.status ? true : false);
    }
  }, [specificFAQS]);
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      status: true,
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title Required"),
      description: Yup.string().required("Description Required"),
    }),
    onSubmit: async (data) => {
      dispatch(updateFAQs(data, id)).then((success) => {
        if (success) {
          formik.resetForm();
          dispatch(getFAQs());
          dispatch({ type: RESET_SPECIFIC_FAQS });
          navigate("/faqs");
        }
      });
    },
  });

  useEffect(() => {
    dispatch(getspecificFAQs(id));
  }, []);

  return (
    <div className="mx-4">
      <div>
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          className="p-black-btn"
          onClick={() => navigate(-1)}
        />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow-md rounded-lg p-4 mt-4">
          <Divider>
            <span className="text-2xl font-bold text-center text-primary mx-1">
              Edit FAQs
            </span>
          </Divider>

          <div className="px-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="title" className="">
                  Enter Title
                </label>
                <span className=" w-full">
                  <InputText
                    ref={inputRef}
                    maxLength={90}
                    id="title"
                    name="title"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.title}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              {formik.touched?.title && formik.errors?.title && (
                <div className="p-error">{formik.errors?.title}</div>
              )}
            </div>
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="status" className="">
                  Status
                </label>
                <SelectButton
                  name="status"
                  id="status"
                  options={statusOptions}
                  optionLabel="name"
                  optionValue="value"
                  className="flex"
                  pt={{
                    root: { className: "flex" },
                    button: ({ context }) => ({
                      className: context.selected
                        ? "p-primary-highlight-btn w-full text-lg text-center"
                        : "w-full text-lg text-center",
                    }),
                  }}
                  value={formik.values.status}
                  onChange={formik.handleChange}
                />
                {formik.touched.status && formik.errors.status && (
                  <div className="p-error">{formik.errors.status}</div>
                )}
              </div>
            </div>
          </div>
          <div className=" mt-10 px-4 gap-8 grid grid-cols-1">
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="">
                  Enter Description
                </label>
                <span className=" w-full">
                  <InputTextarea
                    id="description"
                    name="description"
                    className="w-full text-lg p-primary-input"
                    autoResize
                    rows={5}
                    cols={30}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              {formik.touched?.description && formik.errors?.description && (
                <div className="p-error">{formik.errors?.description}</div>
              )}
            </div>
          </div>
          <div className="mt-16">
            <div className="flex justify-end gap-4">
              <Button
                label="Clear"
                icon="pi pi-times"
                className="p-red-btn w-28"
                type="button"
                onClick={() => {
                  formik.resetForm();
                  dispatch({ type: RESET_SPECIFIC_FAQS });
                }}
              />
              <Button
                label={"Edit"}
                icon="pi pi-check"
                className="p-secondary-btn w-28"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

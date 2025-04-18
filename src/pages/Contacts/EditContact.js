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
  getPolicies,
  getspecificPolicies,
  updatePolicies,
} from "../../store/AsyncMethods/PoliciesMethod";
import { RESET_SPECIFIC_CONTACTS } from "../../store/Types/ContactTypes";
import InputFocus from "../../hooks/InputFocus";
import { getContacts, getspecificContacts } from "../../store/AsyncMethods/ContactMethod";

export default function EditPolicies() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const inputRef = InputFocus();

  const statusOptions = [
    { name: "Enabled", value: true },
    { name: "Disabled", value: false },
  ];
  const { specificCONTACTS } = useSelector((state) => state.ContactReducer);

  useEffect(() => {
    
    if (specificCONTACTS) {
      
      const contact = specificCONTACTS[0];
      formik.setFieldValue("name", contact?.name || "");
      formik.setFieldValue("phone", contact?.phone || "");
      formik.setFieldValue("description", contact?.description || "");
      formik.setFieldValue("appointment_date", contact?.appointment_date?.split("T")[0] || "");
      formik.setFieldValue("appointment_time", contact?.appointment_time || "");
      formik.setFieldValue("number_of_persons", contact?.number_of_persons || 1); // Default to 1 if not provided
      formik.setFieldValue("address", contact?.address || "");
      formik.setFieldValue("status", contact?.status ? true : false);
    }
  }, [specificCONTACTS]);
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
      dispatch(updatePolicies(data, id)).then((success) => {
        if (success) {
          formik.resetForm();
          dispatch(getContacts());
          dispatch({ type: RESET_SPECIFIC_CONTACTS });
          navigate("/contact");
        }
      });
    },
  });

  useEffect(() => {
    dispatch(getspecificContacts(id));
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
              View Contact Appointment
            </span>
          </Divider>

          <div className="px-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {/* Name Field */}
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="">
                   Name
                </label>
                <span className="w-full">
                  <InputText
                    id="name"
                    name="name"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    readOnly
                    disabled
                  />
                </span>
              </div>
              {formik.touched?.name && formik.errors?.name && (
                <div className="p-error">{formik.errors?.name}</div>
              )}
            </div>

            {/* Phone Field */}
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="">
                  Phone Number
                </label>
                <span className="w-full">
                  <InputText
                    id="phone"
                    name="phone"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                    readOnly
                    disabled
                  />
                </span>
              </div>
              {formik.touched?.phone && formik.errors?.phone && (
                <div className="p-error">{formik.errors?.phone}</div>
              )}
            </div>

            {/* Appointment Date Field */}
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="appointment_date" className="">
                  Appointment Date
                </label>
                <span className="w-full">
                  <InputText
                    id="appointment_date"
                    name="appointment_date"
                    type="date"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.appointment_date}
                    onChange={formik.handleChange}
                    disabled
                    
                  />
                </span>
              </div>
              {formik.touched?.appointment_date && formik.errors?.appointment_date && (
                <div className="p-error">{formik.errors?.appointment_date}</div>
              )}
            </div>

            {/* Appointment Time Field */}
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="appointment_time" className="">
                  Appointment Time
                </label>
                <span className="w-full">
                  <InputText
                    id="appointment_time"
                    name="appointment_time"
                    type="time"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.appointment_time}
                    onChange={formik.handleChange}
                    disabled
                    
                  />
                </span>
              </div>
              {formik.touched?.appointment_time && formik.errors?.appointment_time && (
                <div className="p-error">{formik.errors?.appointment_time}</div>
              )}
            </div>

            {/* Number of Persons Field */}
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="number_of_persons" className="">
                  Number of Persons
                </label>
                <span className="w-full">
                  <InputText
                    id="number_of_persons"
                    name="number_of_persons"
                    type="number"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.number_of_persons}
                    onChange={formik.handleChange}
                    readOnly
                    disabled
                  />
                </span>
              </div>
              {formik.touched?.number_of_persons && formik.errors?.number_of_persons && (
                <div className="p-error">{formik.errors?.number_of_persons}</div>
              )}
            </div>
          </div>

          {/* Address Field */}
          <div className="mt-10 px-4 gap-8 grid grid-cols-1">
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="address" className="">
                  Enter Address
                </label>
                <span className="w-full">
                  <InputTextarea
                    id="address"
                    name="address"
                    className="w-full text-lg p-primary-input"
                    autoResize
                    rows={5}
                    cols={30}
                    value={formik.values.address}
                    onChange={formik.handleChange}
                    readOnly
                    disabled
                  />
                </span>
              </div>
              {formik.touched?.address && formik.errors?.address && (
                <div className="p-error">{formik.errors?.address}</div>
              )}
            </div>
          </div>

          {/* Description Field */}
          <div className="mt-10 px-4 gap-8 grid grid-cols-1">
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="description" className="">
                  Enter Description
                </label>
                <span className="w-full">
                  <InputTextarea
                    id="description"
                    name="description"
                    className="w-full text-lg p-primary-input"
                    autoResize
                    rows={5}
                    cols={30}
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    readOnly
                    disabled
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
              {/* <Button
                label="Clear"
                icon="pi pi-times"
                className="p-red-btn w-28"
                type="button"
                onClick={() => {
                  formik.resetForm();
                  dispatch({ type: RESET_SPECIFIC_CONTACTS });
                }}
              /> */}
              {/* <Button
                label={"Edit"}
                icon="pi pi-check"
                className="p-secondary-btn w-28"
              /> */}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RESET_SPECIFIC_CATEGORIES } from "../../store/Types/CategoryTypes";
import { useTranslation } from "react-i18next";
import { Dropdown } from "primereact/dropdown";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Country, State, City } from "country-state-city";
import { toast } from "react-toastify";
import { Divider } from "primereact/divider";
import { useState } from "react";
import { SelectButton } from "primereact/selectbutton";

import {
  addVendors,
  getVendors,
  getspecificVendor,
  updateVendor,
} from "../../store/AsyncMethods/VendorMethod";
import InputFocus from "../../hooks/InputFocus";

export default function AddVendor() {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const inputRef = InputFocus();
  const countries = Country.getAllCountries();
  const [allStates, setStates] = useState([]);
  const [allCities, setCities] = useState([]);
  const navigate = useNavigate();
  const { vendorId } = useParams();
  const { specificVendor } = useSelector((state) => state.VendorReducer);

  const statusOptions = [
    { name: t("Active"), value: true },
    { name: t("Deactive"), value: false },
  ];

  useEffect(() => {
    if (specificVendor) {
      formik.setValues({
        name: specificVendor.name || "",
        email: specificVendor.email || "",
        phone: specificVendor.phone || "",
        phone2: specificVendor.phone2 || "",
        telephone: specificVendor.telephone || "",
        fax: specificVendor.fax || "",
        address1: specificVendor.address1 || "",
        address2: specificVendor.address2 || "",
        country: specificVendor.country || "",
        state: specificVendor.state || "",
        city: specificVendor.city || "",
        latitude: specificVendor.latitude || "",
        longitude: specificVendor.longitude || "",
        status: specificVendor.is_active === 1 ? true : false,
      });
    }
  }, [specificVendor]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      phone2: "",
      address1: "",
      address2: "",
      country: "",
      state: "",
      city: "",
      latitude: "",
      longitude: "",
      telephone: "",
      fax: "",
      status: true,
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Name Required"),
      phone: Yup.string().required("Phone Required"),
      address1: Yup.string().required("Address Required"),
      country: Yup.string().required("Country Required"),
      state: Yup.string().required("State Required"),
      city: Yup.string().required("City Required"),
      status: Yup.boolean().required("Status Required"),
    }),

    onSubmit: async (data) => {
      if (vendorId) {
        dispatch(updateVendor(data, vendorId)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch(getVendors());
            navigate("/manage-vendor");
          }
        });
      } else {
        dispatch(addVendors(data)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch(getVendors());
            navigate("/manage-vendor");
          }
        });
      }
    },
  });

  useEffect(() => {
    if (vendorId) {
      dispatch(getspecificVendor(vendorId));
    }
  }, []);
  useEffect(() => {
    setStates(State.getStatesOfCountry(formik.values.country));
    console.log(formik.values.country);
  }, [formik.values.country]);
  useEffect(() => {
    setCities(
      City.getCitiesOfState(formik.values.country, formik.values.state)
    );
    console.log(formik.values.state);
  }, [formik.values.state]);
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
        <div className="card shadow-md rounded-lg p-4 mt-3">
          <Divider>
            <span className="text-2xl font-bold text-center text-primary mx-1">
              {vendorId ? t("Edit") : t("Add")} {t("Vendors")}
            </span>
          </Divider>

          <div className="px-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="">
                  {t("Name")}*
                </label>
                <span className=" w-full">
                  <InputText
                    ref={inputRef}
                    id="name"
                    name="name"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              {formik.touched?.name && formik.errors?.name && (
                <div className="p-error">{formik.errors?.name}</div>
              )}
            </div>

            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="">
                  {t("Email")}
                </label>
                <span className=" w-full">
                  <InputText
                    id="email"
                    name="email"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              {formik.touched?.email && formik.errors?.email && (
                <div className="p-error">{formik.errors?.email}</div>
              )}
            </div>

            {/* <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="">
                  {t("Phone Number")}
                </label>
                <span className=" w-full">
                  <InputText
                    id="phone"
                    name="phone"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.phone}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              {formik.touched?.phone && formik.errors?.phone && (
                <div className="p-error">{formik.errors?.phone}</div>
              )}
            </div> */}

            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="status" className="">
                  {t("Status")}*
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
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <div className="card shadow-md rounded-lg p-4 pt-1 mt-3">
            <Divider>
              <span className="text-2xl font-bold text-center text-primary mx-1">
                Country Detail
              </span>
            </Divider>

            <div className="px-4 gap-4 grid grid-cols-1 lg:grid-cols-2">
              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="country" className="">
                    Select Country
                  </label>
                  <Dropdown
                    placeholder="Select"
                    id="country"
                    name="country"
                    className="!w-full text-lg p-primary-input"
                    value={formik.values.country}
                    onChange={formik.handleChange}
                    options={countries}
                    optionLabel="name"
                    optionValue="isoCode"
                    filter
                    pt={{
                      root: { className: "w-full" },
                      input: { className: "w-full p-primary-input" },
                      filterIcon: { className: "ml-1" },
                      filterInput: { className: "pl-6" },
                    }}
                  />
                </div>
                {formik.touched?.country && formik.errors?.country && (
                  <div className="p-error">{formik.errors?.country}</div>
                )}
              </div>

              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="state" className="">
                    Select State
                  </label>
                  <Dropdown
                    placeholder="Select"
                    id="state"
                    name="state"
                    className="!w-full text-lg p-primary-input"
                    value={formik.values.state}
                    onChange={formik.handleChange}
                    options={allStates}
                    optionLabel="name"
                    optionValue="isoCode"
                    filter
                    pt={{
                      root: { className: "w-full" },
                      input: { className: "w-full p-primary-input" },
                      filterIcon: { className: "ml-1" },
                      filterInput: { className: "pl-6" },
                    }}
                  />
                </div>
                {formik.touched?.state && formik.errors?.state && (
                  <div className="p-error">{formik.errors?.state}</div>
                )}
              </div>

              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="city" className="">
                    Select City
                  </label>
                  <Dropdown
                    placeholder="Select"
                    id="city"
                    name="city"
                    className="!w-full text-lg p-primary-input"
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    options={allCities}
                    optionLabel="name"
                    optionValue="name"
                    filter
                    pt={{
                      root: { className: "w-full" },
                      input: { className: "w-full p-primary-input" },
                      filterIcon: { className: "ml-1" },
                      filterInput: { className: "pl-6" },
                    }}
                  />
                </div>
                {formik.touched?.city && formik.errors?.city && (
                  <div className="p-error">{formik.errors?.city}</div>
                )}
              </div>
            </div>

            <Divider>
              <span className="text-2xl font-bold text-center text-primary mx-1">
                Phone Line Detail
              </span>
            </Divider>

            <div className="px-4 gap-4 grid grid-cols-1 lg:grid-cols-2">
              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone" className="">
                    {t("Phone Line 1")}*
                  </label>
                  <span className=" w-full">
                    <InputText
                      id="phone"
                      name="phone"
                      className="w-full text-lg p-primary-input"
                      value={formik.values.phone}
                      onChange={formik.handleChange}
                    />
                  </span>
                </div>
                {formik.touched?.phone && formik.errors?.phone && (
                  <div className="p-error">{formik.errors?.phone}</div>
                )}
              </div>

              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="phone2" className="">
                    {t("Phone Line 2")}
                  </label>
                  <span className=" w-full">
                    <InputText
                      id="phone2"
                      name="phone2"
                      className="w-full text-lg p-primary-input"
                      value={formik.values.phone2}
                      onChange={formik.handleChange}
                    />
                  </span>
                </div>
                {formik.touched?.phone2 && formik.errors?.phone2 && (
                  <div className="p-error">{formik.errors?.phone2}</div>
                )}
              </div>

              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="telephone" className="">
                    {t("Telephone")}
                  </label>
                  <span className=" w-full">
                    <InputText
                      id="telephone"
                      name="telephone"
                      className="w-full text-lg p-primary-input"
                      value={formik.values.telephone}
                      onChange={formik.handleChange}
                    />
                  </span>
                </div>
                {formik.touched?.telephone && formik.errors?.telephone && (
                  <div className="p-error">{formik.errors?.telephone}</div>
                )}
              </div>

              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="fax" className="">
                    {t("Fax Number")}
                  </label>
                  <span className=" w-full">
                    <InputText
                      id="fax"
                      name="fax"
                      className="w-full text-lg p-primary-input"
                      value={formik.values.fax}
                      onChange={formik.handleChange}
                    />
                  </span>
                </div>
                {formik.touched?.fax && formik.errors?.fax && (
                  <div className="p-error">{formik.errors?.fax}</div>
                )}
              </div>
            </div>
          </div>
          <div className="card shadow-md rounded-lg p-4 pt-1 mt-3">
            <Divider>
              <span className="text-2xl font-bold text-center text-primary mx-1">
                Address Detail
              </span>
            </Divider>

            <div className="px-4 gap-4 grid grid-cols-1 lg:grid-cols-2">
              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="latitude" className="">
                    {t("Latitude")}
                  </label>
                  <span className=" w-full">
                    <InputText
                      id="latitude"
                      name="latitude"
                      className="w-full text-lg p-primary-input"
                      value={formik.values.latitude}
                      onChange={formik.handleChange}
                    />
                  </span>
                </div>
                {formik.touched?.latitude && formik.errors?.latitude && (
                  <div className="p-error">{formik.errors?.latitude}</div>
                )}
              </div>

              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="longitude" className="">
                    {t("Longitude")}
                  </label>
                  <span className=" w-full">
                    <InputText
                      id="longitude"
                      name="longitude"
                      className="w-full text-lg p-primary-input"
                      value={formik.values.longitude}
                      onChange={formik.handleChange}
                    />
                  </span>
                </div>
                {formik.touched?.longitude && formik.errors?.longitude && (
                  <div className="p-error">{formik.errors?.longitude}</div>
                )}
              </div>

              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="address1" className="">
                    {t("Address 1")}*
                  </label>
                  <span className=" w-full">
                    <InputText
                      id="address1"
                      name="address1"
                      className="w-full text-lg p-primary-input"
                      value={formik.values.address1}
                      onChange={formik.handleChange}
                    />
                  </span>
                </div>
                {formik.touched?.address1 && formik.errors?.address1 && (
                  <div className="p-error">{formik.errors?.address1}</div>
                )}
              </div>

              <div className="">
                <div className="flex flex-col gap-2">
                  <label htmlFor="address2" className="">
                    {t("Address 2")}
                  </label>
                  <span className=" w-full">
                    <InputText
                      id="address2"
                      name="address2"
                      className="w-full text-lg p-primary-input"
                      value={formik.values.address2}
                      onChange={formik.handleChange}
                    />
                  </span>
                </div>
                {formik.touched?.address2 && formik.errors?.address2 && (
                  <div className="p-error">{formik.errors?.address2}</div>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-end gap-4">
            <Button
              label={t("Clear")}
              icon="pi pi-times"
              className="p-red-btn"
              type="button"
              onClick={() => {
                formik.resetForm();
              }}
            />
            <Button
              label={t("Submit")}
              icon="pi pi-check"
              className="p-secondary-btn"
            />
          </div>
        </div>
      </form>
    </div>
  );
}

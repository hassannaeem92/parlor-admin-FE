import { useFormik } from "formik";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "yup";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { RESET_ERROR } from "../../store/Types/AuthTypes";
import { toast } from "react-toastify";
import { SelectButton } from "primereact/selectbutton";
import { Divider } from "primereact/divider";
import {
  addUser,
  getUsers,
  getspecificUser,
  updateUser,
} from "../../store/AsyncMethods/UserMethod";
import { RESET_SPECIFIC_USERS } from "../../store/Types/UserTypes";
import InputFocus from "../../hooks/InputFocus";

export default function AddUser() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userId } = useParams();
  const inputRef = InputFocus();

  const { user, error } = useSelector((state) => state.AuthReducer);
  const { specificUser } = useSelector((state) => state.UserReducer);

  const isActiveOptions = [
    { name: "Active", value: true },
    { name: "Deactive", value: false },
  ];

  useEffect(() => {
    if (specificUser) {
      formik.setValues({
        fname: specificUser.first_name || "",
        lname: specificUser.last_name || "",
        email: specificUser.email || "",
        isActive: specificUser.is_active === 1 ? true : false,
        userId: user ? user.id : 0,
      });
    }
  }, [specificUser]);

  const formik = useFormik({
    initialValues: {
      fname: "",
      lname: "",
      email: "",
      isActive: true,
      userId: user.id,
    },
    validationSchema: Yup.object({
      fname: Yup.string().required("First name is required"),
      lname: Yup.string().required("Last name is required"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      isActive: Yup.boolean().required("isActive is required"),
    }),

    onSubmit: async (data) => {
      if (specificUser) {
        dispatch(updateUser(data, userId)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch({ type: RESET_SPECIFIC_USERS });
            dispatch(getUsers());
            navigate("/manage-users");
          }
        });
      } else {
        dispatch(addUser(data)).then((success) => {
          if (success) {
            formik.resetForm();
            dispatch(getUsers());
            navigate("/manage-users");
          }
        });
      }
    },
  });

  const navigateBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (userId) {
      dispatch(getspecificUser(userId));
    }
  }, []);

  return (
    <div className="mx-4">
      <div>
        <Button
          label="Back"
          icon="pi pi-arrow-left"
          className="p-black-btn"
          onClick={() => {
            formik.resetForm();
            dispatch({ type: RESET_SPECIFIC_USERS });
            navigate(-1);
          }}
        />
      </div>
      <form onSubmit={formik.handleSubmit}>
        <div className="card shadow-md rounded-lg p-4 mt-4">
          <Divider>
            <span className="text-2xl font-bold text-center text-primary mx-1">
              {userId ? "Edit" : "Add"} User
            </span>
          </Divider>

          <div className="px-4 gap-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="fname" className="">
                  First Name
                </label>
                <span className=" w-full">
                  <InputText
                    ref={inputRef}
                    keyfilter="alpha"
                    id="fname"
                    name="fname"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.fname}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              {formik.touched?.fname && formik.errors?.fname && (
                <div className="p-error">{formik.errors?.fname}</div>
              )}
            </div>

            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="">
                  Last Name
                </label>
                <span className=" w-full">
                  <InputText
                    keyfilter="alpha"
                    id="lname"
                    name="lname"
                    className="w-full text-lg p-primary-input"
                    value={formik.values.lname}
                    onChange={formik.handleChange}
                  />
                </span>
              </div>
              {formik.touched?.lname && formik.errors?.lname && (
                <div className="p-error">{formik.errors?.lname}</div>
              )}
            </div>

            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="category" className="">
                  Email
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

            <div className="">
              <div className="flex flex-col gap-2">
                <label htmlFor="isActive" className="">
                  Status
                </label>
                <SelectButton
                  name="isActive"
                  id="isActive"
                  options={isActiveOptions}
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
                  value={formik.values.isActive}
                  onChange={formik.handleChange}
                />
                {formik.touched.isActive && formik.errors.isActive && (
                  <div className="p-error">{formik.errors.isActive}</div>
                )}
              </div>
            </div>
          </div>
          <div className="mt-16">
            <div className="flex justify-end gap-4">
              <Button
                label="Clear"
                icon="pi pi-times"
                className="p-red-btn"
                type="button"
                onClick={() => {
                  formik.resetForm();
                  dispatch({ type: RESET_SPECIFIC_USERS });
                }}
              />
              <Button
                label={"Submit"}
                icon="pi pi-check"
                className="p-secondary-btn"
                onClick={() => navigateBack()}
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

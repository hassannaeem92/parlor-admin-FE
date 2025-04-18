import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import { userLogin } from "../../store/AsyncMethods/AuthMethod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RESET_ERROR, RESET_SUCCESS } from "../../store/Types/AuthTypes";
import { toast } from "react-toastify";
import { PrimeIcons } from "primereact/api";

export default function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, success } = useSelector((state) => state.AuthReducer);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: RESET_ERROR });
    }
  }, [error]);

  useEffect(() => {
    if (success) {
      toast.success(success);
      setTimeout(() => {
        dispatch({ type: RESET_SUCCESS });
      }, 2000);
    }
  }, [success]);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid Email").required("Email Required"),
      password: Yup.string().required("Password Required"),
    }),

    onSubmit: async (data) => {
      dispatch(userLogin(data, formik)).then((success) => {
        if (success) {
          navigate("/categories");
        }
      });
    },
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card shadow-lg w-11/12 sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12 px-5 pb-5">
        <div className="flex justify-center">
          {/* <img src="/images/beauty-logo.jpeg" className="w-20" /> */}
        </div>

        <h1 className="text-3xl font-bold text-center mt-5">
          Sign In
        </h1>

        <div className="w-full mt-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full">
              <div className="grid grid-cols-1 px-4 gap-8">
                <div className="">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="email" className="">
                      Email
                    </label>
                    <span className="p-float-label w-full">
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
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="password" className="">
                      Password
                    </label>
                    <span className="w-full">
                      <Password
                        id="password"
                        name="password"
                        className="p-primary-input w-full text-lg"
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        feedback={false}
                        toggleMask
                        showIcon={PrimeIcons.EYE_SLASH}
                        hideIcon={PrimeIcons.EYE}
                        pt={{
                          root: { className: "w-full" },
                          input: "w-full text-lg p-primary-input",
                        }}
                      />
                    </span>
                  </div>
                  {formik.touched?.password && formik.errors?.password && (
                    <div className="p-error">{formik.errors?.password}</div>
                  )}
                </div>
              </div>

              <div className="my-8 flex justify-center gap-6 w-full px-4">
                <Button
                  type="submit"
                  label={loading ? "..." : "Login"}
                  className="p-black-btn px-10 w-full"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

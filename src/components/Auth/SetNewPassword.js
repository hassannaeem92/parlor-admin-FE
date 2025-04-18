import { useFormik } from "formik";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { Password } from "primereact/password";
import React, { useEffect } from "react";
import * as Yup from "yup";
import { setNewPassword, userLogin } from "../../store/AsyncMethods/AuthMethod";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RESET_ERROR } from "../../store/Types/AuthTypes";
import { toast } from "react-toastify";

export default function SetNewPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id, token } = useParams();
  const { loading, error } = useSelector((state) => state.AuthReducer);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch({ type: RESET_ERROR });
    }
  }, [error]);

  const formik = useFormik({
    initialValues: {
      password: "",
      cPassword: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().required("Password Required"),
      cPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Password Not Matched")
        .required("Confirm Password Required"),
    }),

    onSubmit: async (data) => {
      const url = `/${id}/set-new-password/${token}`;

      dispatch(setNewPassword(data, url)).then((success) => {
        if (success) {
          navigate("/");
        }
      });
    },
  });
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="card shadow-lg w-11/12 sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12 px-5 pb-5">
        <div className="flex justify-center">
          {/* <img src="/images/logo.png" className="w-48" /> */}
        </div>

        <h1 className="text-3xl font-bold text-center mt-4">
          Set Your Password
        </h1>

        <div className="w-full mt-8">
          <form onSubmit={formik.handleSubmit}>
            <div className="w-full">
              <div className="grid grid-cols-1 px-4 gap-8">
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

                <div className="">
                  <div className="flex flex-col gap-2 w-full">
                    <label htmlFor="cPassword" className="">
                      Confirm Password
                    </label>
                    <span className="w-full">
                      <Password
                        id="cPassword"
                        name="cPassword"
                        className="p-primary-input w-full text-lg"
                        value={formik.values.cPassword}
                        onChange={formik.handleChange}
                        feedback={false}
                        toggleMask
                        pt={{
                          root: { className: "w-full" },
                          input: "w-full text-lg p-primary-input",
                        }}
                      />
                    </span>
                  </div>
                  {formik.touched?.cPassword && formik.errors?.cPassword && (
                    <div className="p-error">{formik.errors?.cPassword}</div>
                  )}
                </div>
              </div>

              <div className="my-8 flex justify-center gap-6 w-full px-4">
                <Button
                  type="submit"
                  label={loading ? "..." : "Submit"}
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

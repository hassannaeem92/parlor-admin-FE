import { ProgressSpinner } from "primereact/progressspinner";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const { loading, token } = useSelector((state) => state.AuthReducer);
  console.log("Loading:", loading);
  console.log("Token:", token);
  return (
    <>
      {loading && (
        <div className="flex justify-center items-center z-50 w-screen h-full fixed top-0 left-0 bg-white bg-opacity-50 ">
          <ProgressSpinner />
        </div>
      )}

      {token ? <Outlet /> : <Navigate to="/" />}
    </>
  );
};

export default PrivateRoutes;

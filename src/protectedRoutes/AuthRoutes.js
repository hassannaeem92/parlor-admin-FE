import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
const AuthRoutes = () => {
  const { token } = useSelector((state) => state.AuthReducer);
  return !token ? <Outlet /> : <Navigate to="/" />;
};

export default AuthRoutes;

import { Navigate, Outlet } from "react-router-dom";
import parseJwt from "../utils/checkToken";

export default function ProtectedRoutes() {
  let auth = localStorage.getItem("token");
  if (auth !== null) {
    parseJwt(auth);
  }

  return auth !== null ? <Outlet /> : <Navigate to="/" />;
}

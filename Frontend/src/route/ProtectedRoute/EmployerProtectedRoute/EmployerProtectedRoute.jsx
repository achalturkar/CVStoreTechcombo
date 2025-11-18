import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const EmployerProtectedRoute = ({ allowedRoles }) => {
  const token = Cookies.get("jwtToken");

  if (!token) return <Navigate to="/recruit/login" replace />;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp < currentTime) {
      Cookies.remove("jwtToken");
      return <Navigate to="/recruit/login" replace />;
    }

    if (!allowedRoles.includes(decoded.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
  } catch {
    Cookies.remove("jwtToken");
    return <Navigate to="/recruit/login" replace />;
  }
};

export default EmployerProtectedRoute;

import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const EmployerPublicRoute = () => {
  const token = Cookies.get("jwtToken");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp < currentTime) {
        Cookies.remove("jwtToken");
        return <Outlet />;
      }

      switch (decoded.role) {
        case "HR":
          return <Navigate to="/hr-dashboard" replace />;
        case "ADMIN":
          return <Navigate to="/admin-dashboard" replace />;
        case "SUPERADMIN":
          return <Navigate to="/superadmin-dashboard" replace />;
        default:
          return <Navigate to="/" replace />;
      }
    } catch {
      Cookies.remove("jwtToken");
      return <Outlet />;
    }
  }

  return <Outlet />;
};

export default EmployerPublicRoute;

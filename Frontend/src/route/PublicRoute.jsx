// src/routes/ProtectedRoute/PublicRoute.jsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const PublicRoute = () => {
  const token = Cookies.get("jwtToken");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      if (decoded.exp && decoded.exp < currentTime) {
        Cookies.remove("jwtToken");
        return <Outlet />; // expired → allow access to public
      }

      if (decoded.role === "CANDIDATE") {
        return <Navigate to="/candidate-home" replace />;
      }

      if (["HR", "ADMIN", "SUPERADMIN"].includes(decoded.role)) {
        return <Navigate to="/hr-dashboard" replace />;
      }
    } catch {
      Cookies.remove("jwtToken");
    }
  }

  // No token → allow access to Home and other public pages
  return <Outlet />;
};

export default PublicRoute;

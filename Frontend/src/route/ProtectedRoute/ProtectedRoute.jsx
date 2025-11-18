import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ allowedRoles }) => {
  const token = Cookies.get("jwtToken");

  if (!token) {
    return <Navigate to="/recruit/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Check token expiration
    if (decoded.exp < currentTime) {
      Cookies.remove("jwtToken");
      return <Navigate to="/recruit/login" replace />;
    }

    // ✅ Check role directly from JWT
    if (!allowedRoles.includes(decoded.role)) {
      return <Navigate to="/unauthorized" replace />;
    }

    return <Outlet />;
  } catch (error) {
    console.error("Invalid or corrupted token:", error);
    Cookies.remove("jwtToken");
    return <Navigate to="/recruit/login" replace />;
  }
};

export default ProtectedRoute;

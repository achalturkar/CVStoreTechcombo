import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const CandidatePublicRoute = () => {
  const token = Cookies.get("jwtToken");

  if (token) {
    try {
      const decoded = jwtDecode(token);
      const currentTime = Date.now() / 1000;

      // ✅ If token is valid and belongs to candidate, redirect them
      if (decoded.role === "CANDIDATE" && (!decoded.exp || decoded.exp > currentTime)) {
        return <Navigate to="/candidate-home" replace />;
      }

      // ✅ If token is valid but not candidate, logout
      if (decoded.role !== "CANDIDATE") {
        Cookies.remove("jwtToken");
        localStorage.removeItem("role");
        return <Navigate to="/" replace />;
      }

    } catch (error) {
      Cookies.remove("jwtToken");
      localStorage.removeItem("role");
    }
  }

  return <Outlet />; // ✅ Show public routes only if not logged in
};

export default CandidatePublicRoute;

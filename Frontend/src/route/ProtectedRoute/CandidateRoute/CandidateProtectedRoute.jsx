// import React from "react";
// import { Navigate, Outlet } from "react-router-dom";
// import Cookies from "js-cookie";
// import { jwtDecode } from "jwt-decode";

// const CandidateProtectedRoute = () => {
//   const token = Cookies.get("jwtToken");

//   if (!token) return <Navigate to="/candidate/login" replace />;

//   try {
//     const decoded = jwtDecode(token);
//     if (decoded.role !== "CANDIDATE") {
//       return <Navigate to="/" replace />;
//     }
//     return <Outlet />;
//   } catch (error) {
//     Cookies.remove("jwtToken");
//     return <Navigate to="/candidate/login" replace />;
//   }
// };

// export default CandidateProtectedRoute;
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

const CandidateProtectedRoute = () => {
  const token = Cookies.get("jwtToken");
  const role = localStorage.getItem("role");


  if (!token){ 
      setRole(null);    
    return <Navigate to="/candidate/login" replace />
  }

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    // Expired token → logout
    if (decoded.exp && decoded.exp < currentTime) {
      Cookies.remove("jwtToken");
      return <Navigate to="/candidate/login" replace />;
    }

    // Allow only CANDIDATE role
    if (decoded.role !== "CANDIDATE") {
      return <Navigate to="/" replace />;
    }

    return <Outlet />; // ✅ Access granted
  } catch (error) {
    Cookies.remove("jwtToken");
    return <Navigate to="/candidate/login" replace />;
  }
};

export default CandidateProtectedRoute;

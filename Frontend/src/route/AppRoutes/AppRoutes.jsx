import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import Login from "../../pages/auth/recruiter/Login/Login"
import Forget from "../../pages/auth/recruiter/Forget/Forget";
import Unauthorized from "../../pages/Unauthorized/unauthorized";
import NotFound from "../../pages/NotFound/NotFound";
import Home from "../../pages/publicPage/Home/Home"

// // Layouts
import DashboardLayout from "../../layout/DashboardLayout/DashboardLayout";
import AuthLayout from "../../layout/AuthLayout/AuthLayout";

// Pages
 import CVList from "../../pages/CVList/CVList";
 import CVUpload from "../../pages/CVUpload/CVUpload";
 import CandidateUpdate from "../../pages/CandidateUpdate/CandidateUpdate";
 import CandidateDetail from "../../pages/CandidateDetail/CandidateDetail";
 import ResumeUpload from "../../pages/ResumeUpload/ResumeUpload";
 import SearchResult from "../../pages/SearchResult/SearchResult";
 import SuperAdminDashboard from "../../pages/dashboard/SuperAdminDashboard/SuperAdminDashboard"
 import HrDashboard from "../../pages/dashboard/HrDashboard/HrDashboard";
 import AdminDashboard from "../../pages/dashboard/AdminDashboard/AdminDashboard"
import Register from "../../pages/auth/recruiter/Register/Register";
import ResetPassword from "../../pages/auth/recruiter/ResetPassword/ResetPassword";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/" element={<Home />} />
    <Route path="/unauthorized" element={<Unauthorized />} />

    {/* Auth Routes */}
    <Route element={<AuthLayout />}>
      <Route path="/recruit/login" element={<Login />} />
      <Route path="/recruit/forget" element={<Forget />} />
      <Route path="/recruit/register" element={<Register />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />
    </Route>

    {/* HR Dashboard */}
    <Route element={<ProtectedRoute allowedRoles={["HR", "ADMIN", "SUPERADMIN"]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/hr-dashboard" element={<HrDashboard />} />
         <Route path="/cvupload" element={<CVUpload />} />
        <Route path="/update/:id" element={<CandidateUpdate />} />
        <Route path="/candidate/:id" element={<CandidateDetail />} />
        <Route path="/fileupload" element={<ResumeUpload />} />
        <Route path="/cvlist" element={<CVList />} />
      </Route>
    </Route>

    {/* Admin Dashboard */}
    <Route element={<ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>

    {/* SuperAdmin Dashboard */}
    <Route element={<ProtectedRoute allowedRoles={["SUPERADMIN"]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/superadmin-dashboard" element={<SuperAdminDashboard />} />
        <Route path="/cvupload" element={<CVUpload />} />
        <Route path="/update/:id" element={<CandidateUpdate />} />
        <Route path="/candidate/:id" element={<CandidateDetail />} />
        <Route path="/fileupload" element={<ResumeUpload />} />
        <Route path="/cvlist" element={<CVList />} />
        <Route path="/searchResult" element={<SearchResult />} />
      </Route>
    </Route>

    {/* 404 Page */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;

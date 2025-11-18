import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";


import Login from "../../pages/employer/auth/Login/Login"
import Forget from "../../pages/employer/auth/Forget/Forget";
import Unauthorized from "../../pages/common/unauthorized/Unauthorized";
import NotFound from "../../pages/common/NotFound/NotFound";

// // Layouts
import DashboardLayout from "../../layout/DashboardLayout/DashboardLayout";

// Pages
import CVList from "../../pages/resumeData/CVList/CVList";
import CVUpload from "../../pages/resumeData/CVUpload/CVUpload";
import CandidateUpdate from "../../pages/resumeData/CandidateUpdate/CandidateUpdate";
import CandidateDetail from "../../pages/resumeData/CandidateDetail/CandidateDetail";
import ResumeUpload from "../../pages/resumeData/ResumeUpload/ResumeUpload";
import SearchResult from "../../pages/resumeData/SearchResult/SearchResult";
import SuperAdminDashboard from "../../pages/dashboard/SuperAdminDashboard/SuperAdminDashboard"
import HrDashboard from "../../pages/employer/HR/HrDashboard/HrDashboard";
import AdminDashboard from "../../pages/dashboard/AdminDashboard/AdminDashboard"
import Register from "../../pages/employer/auth/Register/Register";
import ResetPassword from "../../pages/employer/auth/ResetPassword/ResetPassword";
import CandidateLogin from "../../pages/candidate/auth/Login/CandidateLogin";
import CandidateRegister from "../../pages/candidate/auth/Register/CandidateRegister";
import Home from "../../pages/public/Home/Home";
import CandidateDashboard from "../../pages/candidate/Dashboard/CandidateDashboard";
import CandidateProtectedRoute from "../ProtectedRoute/CandidateRoute/CandidateProtectedRoute";
import CandidatePublicRoute from "../ProtectedRoute/CandidateRoute/CandidatePublicRoute";
import CandidateHome from "../../pages/candidate/CandidateHome/CandidateHome";
import CandidateProfile from "../../pages/candidate/profile/CandidateProfile";
import EmployerPublicRoute from "../ProtectedRoute/EmployerProtectedRoute/EmployerPublicRoute";
import EmployerProtectedRoute from "../ProtectedRoute/EmployerProtectedRoute/EmployerProtectedRoute";
import PublicRoute from "../PublicRoute";
import LoginWithOtp from "../../pages/employer/auth/LoginWithOtp/LoginWithOtp";
import OtpVerify from "../../pages/employer/auth/OtpVerify/OtpVerify";
import ResumeSearchPage from "../../pages/resumeData/ResumeSearchPage/ResumeSearchPage";
import FilteredCandidatesPage from "../../pages/resumeData/FilteredCandidatesPage/FilteredCandidatesPage";
import CandidateDetailsPage from "../../pages/resumeData/CandidateDetailsPage/CandidateDetailsPage";
import JobPost from "../../pages/jobs/JobPost";

const AppRoutes = () => (
  <Routes>
    {/* Public Routes */}
    <Route path="/unauthorized" element={<Unauthorized />} />
    <Route path="/ch" element={<CandidateHome />} />

     <Route element={<PublicRoute />}>
    <Route path="/" element={<Home />} />
          <Route path="/candidate/login" element={<CandidateLogin/>} />?
      <Route path="/candidate/register" element={<CandidateRegister />} />
        <Route path="/recruit/login" element={<Login />} />
      <Route path="/recruit/register" element={<Register />} />
      <Route path="/recruit/forget" element={<Forget />} />
      <Route path="/reset-password/:token" element={<ResetPassword />} />

      <Route path="/recruit/login/otp" element={<LoginWithOtp/>} />
<Route path="/recruit/verify-otp" element={<OtpVerify/>} />

  </Route>

    {/* Auth Routes */}
    <Route element={<EmployerPublicRoute/>}>
    
    </Route>

    {/*  Public Routes */}
    <Route element={<CandidatePublicRoute />}>


    </Route>


    {/* Candidate Protected */}
    <Route element={<CandidateProtectedRoute />}>
      <Route path="/candidate-home" element={<CandidateDashboard />} />
      <Route path="/candidate/profile" element={<CandidateProfile />} />

      
      <Route path="*" element={<NotFound />} />

    </Route>


    {/* HR Dashboard */}
    <Route element={<EmployerProtectedRoute allowedRoles={["HR", "ADMIN", "SUPERADMIN"]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/hr-dashboard" element={<HrDashboard />} />
        <Route path="/cvupload" element={<CVUpload />} />
        <Route path="/update/:id" element={<CandidateUpdate />} />
        <Route path="/candidate/:id" element={<CandidateDetail />} />
        <Route path="/fileupload" element={<ResumeUpload />} />
        <Route path="/cvlist" element={<CVList />} />
        <Route path="/job-post" element={<JobPost/>} />

        <Route path="/search" element={<ResumeSearchPage/>} />
        <Route path="/filtered" element={<FilteredCandidatesPage />} />
        <Route path="/candidateDetail/:id" element={<CandidateDetailsPage/>} />
      </Route>
    </Route>

    {/* Admin Dashboard */}
    <Route element={<EmployerProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]} />}>
      <Route element={<DashboardLayout />}>
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
      </Route>
    </Route>

    {/* SuperAdmin Dashboard */}
    <Route element={<EmployerProtectedRoute allowedRoles={["SUPERADMIN", "HR"]} />}>
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
    <Route path="/*" element={<NotFound />} />
  </Routes>
);

export default AppRoutes;

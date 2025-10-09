import { Routes, Route } from "react-router-dom";
import React from "react";

// Layouts
import DashboardLayout from "./layout/DashboardLayout/DashboardLayout";
import AuthLayout from "./layout/AuthLayout/AuthLayout"; // create this file

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/auth/Login/Login";
import Forget from "./pages/auth/Forget/Forget";
import CVList from "./pages/CVList/CVList";
import CVUpload from "./pages/CVUpload/CVUpload";
import CandidateUpdate from "./pages/CandidateUpdate/CandidateUpdate";
import CandidateDetail from "./pages/CandidateDetail/CandidateDetail";
import ResumeUpload from "./pages/ResumeUpload/ResumeUpload";
import SearchResult from "./pages/SearchResult/SearchResult";
import NotFound from "./pages/NotFound/NotFound";

// Components
import ProtectedRoute from "./components/common/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      {/*  Auth Pages (no navbar) */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/forget" element={<Forget />} />
      </Route>

      {/* Dashboard Pages (with navbar + sidebar) */}
      <Route element={<DashboardLayout />}>
        <Route path="/" element={<ProtectedRoute element={Home} />} />
        <Route path="/cvlist" element={<ProtectedRoute element={CVList} />} />
        <Route path="/cvupload" element={<ProtectedRoute element={CVUpload} />} />
        <Route path="/update/:id" element={<ProtectedRoute element={CandidateUpdate} />} />
        <Route path="/candidate/:id" element={<ProtectedRoute element={CandidateDetail} />} />
        <Route path="/fileupload" element={<ProtectedRoute element={ResumeUpload} />} />
        <Route path="/searchResult" element={<ProtectedRoute element={SearchResult} />} />
      </Route>

      {/*  404 Page */}
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
};

export default App;

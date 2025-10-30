
// import { Routes, Route } from "react-router-dom";
// import React from "react";

// // Layouts
// import DashboardLayout from "./layout/DashboardLayout/DashboardLayout";
// import AuthLayout from "./layout/AuthLayout/AuthLayout";

// // Pages
// import Home from "./pages/Home/Home";
// import Login from "./pages/auth/Login/Login";
// import Forget from "./pages/auth/Forget/Forget";
// import CVList from "./pages/CVList/CVList";
// import CVUpload from "./pages/CVUpload/CVUpload";
// import CandidateUpdate from "./pages/CandidateUpdate/CandidateUpdate";
// import CandidateDetail from "./pages/CandidateDetail/CandidateDetail";
// import ResumeUpload from "./pages/ResumeUpload/ResumeUpload";
// import SearchResult from "./pages/SearchResult/SearchResult";
// import NotFound from "./pages/NotFound/NotFound";

// // Components
// import ProtectedRoute from "./route/ProtectedRoute/ProtectedRoute";

// const App = () => {
//   return (
//     <Routes>
//       {/*  Auth Pages (no navbar) */}
//       <Route element={<AuthLayout />}>
//         <Route path="/login" element={<Login />} />
//         <Route path="/forget" element={<Forget />} />
//       </Route>

//       <Route element={<ProtectedRoute element={DashboardLayout} />}>
//         {/* These routes are now inside the ProtectedRoute's logic */}
//         <Route path="/" element={<Home />} />
//         <Route path="/cvlist" element={<CVList />} />
//         <Route path="/cvupload" element={<CVUpload />} />
//         <Route path="/update/:id" element={<CandidateUpdate />} />
//         <Route path="/candidate/:id" element={<CandidateDetail />} />
//         <Route path="/fileupload" element={<ResumeUpload />} />
//         <Route path="/searchResult" element={<SearchResult />} />
//       </Route>

//       {/*  404 Page */}
//       <Route path="/*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default App;


// import { Routes, Route } from "react-router-dom";
// import React from "react";

// import Login from "./pages/auth/Login/Login";
// import Forget from "./pages/auth/Forget/Forget";
// import NotFound from "./pages/NotFound/NotFound"; ''
// import ProtectedRoute from "./route/ProtectedRoute/ProtectedRoute";
// import Unauthorized from "./pages/unauthorized/Unauthorized"
// import Home from "./pages/Home/Home"

// import { Navigate } from "react-router-dom";

// import CVUpload from "./pages/CVUpload/CVUpload";
// import CandidateUpdate from "./pages/CandidateUpdate/CandidateUpdate";
// import CandidateDetail from "./pages/CandidateDetail/CandidateDetail";
// import SearchResult from "./pages/SearchResult/SearchResult";

// // Dashboards

// import HrDashboard from './pages/dashboard/HrDashboard/HrDashboard'
// import AdminDashboard from './pages/dashboard/AdminDashboard/AdminDashboard'
// import SuperAdminDashboard from './pages/dashboard/SuperAdminDashboard/SuperAdminDashboard'
// import AuthLayout from "./layout/AuthLayout/AuthLayout";
// import DashboardLayout from "./layout/DashboardLayout/DashboardLayout";
// import ResumeUpload from "./pages/ResumeUpload/ResumeUpload";
// import CVList from "./pages/CVList/CVList";


// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />



//       {/* Auth Routes */}

//       <Route element={<AuthLayout />}>
//         <Route path="/login" element={<Login />} />
//         <Route path="/forget" element={<Forget />} />

//       </Route>
//       <Route path="/unauthorized" element={<Unauthorized />} />

//       <Route element={<DashboardLayout />}>


//          {
//           [].map(()=>{
//              <Route
//           path="/superadmin-dashboard"
//           element={
//             <ProtectedRoute allowedRoles={["SUPERADMIN"]}>
//               <SuperAdminDashboard />
//             </ProtectedRoute>
//           }
//         />


//           })
//          }
       

//         <Route path="/cvupload" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>
//           <CVUpload />
//         </ProtectedRoute>} />
//         <Route path="/update/:id" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>
//           <CandidateUpdate />
//         </ProtectedRoute>} />
//         <Route path="/candidate/:id" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>
//           <CandidateDetail />
//         </ProtectedRoute>} />
//         <Route path="/fileupload" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>
//           <ResumeUpload />
//         </ProtectedRoute>} />
//         <Route path="/cvlist" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>
//            <CVList/>
//         </ProtectedRoute>} />
//         <Route path="/searchResult" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>
//            <SearchResult/>
//         </ProtectedRoute>} />

//       </Route>





//       {/* Role Based Dashboards */}
//       <Route
//         path="/admin-dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["ADMIN", "SUPERADMIN"]}>
//             <AdminDashboard />
//           </ProtectedRoute>
//         }
//       />

//       <Route
//         path="/hr-dashboard"
//         element={
//           <ProtectedRoute allowedRoles={["HR", "ADMIN", "SUPERADMIN"]}>
//             <HrDashboard />
//           </ProtectedRoute>
//         }
//       />



//       {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}


//       {/* 404 Page */}
//       <Route path="/*" element={<NotFound />} />
//     </Routes>
//   );
// };

// export default App;

import React from "react";
// import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./route/AppRoutes/AppRoutes"
import Footer from "./components/layout/Footer/Footer";

function App() {
  return (
    <div>
          <AppRoutes />
      <Footer/>



    </div>
  )
  
}

export default App;

import { Routes, Route } from "react-router-dom";
import React from "react";

import ProtectedRoute from "./api/ProtectedRoute"

// const Home = React.lazy(() => import("./pages/Home/Home"))

import Home from "./pages/Home/Home"
import CVList from "./pages/CVList/CVList"
import CVUpload from "./pages/CVUpload/CVUpload"
import NotFound from "./pages/NotFound/NotFound";
import CandidateUpdate from "./pages/CandidateUpdate/CandidateUpdate";
import ResumeUpload from "./pages/ResumeUpload/ResumeUpload";



const App = () => (

  <>

    <Routes>
      <Route path="/" element={<Home />}></Route>
      <Route path="/cvlist" element={<CVList />}></Route>
      <Route path="/cvupload" element={<CVUpload />}></Route>
      <Route path="/*" element={<NotFound />}></Route>
      <Route path="/update/:id" element={<CandidateUpdate />}> </Route>
      <Route path="/fileupload" element={<ResumeUpload />}> </Route>


    </Routes>
  </>

)


export default App;
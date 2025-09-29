import { Routes, Route } from "react-router-dom";
import React from "react";

// Components
import Navbar from './components/Navbar/Navbar';

// Pages
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import CVList from "./pages/CVList/CVList";
import CVUpload from "./pages/CVUpload/CVUpload";
import NotFound from "./pages/NotFound/NotFound";
import CandidateUpdate from "./pages/CandidateUpdate/CandidateUpdate";
import ResumeUpload from "./pages/ResumeUpload/ResumeUpload";
import CandidateDetail from "./pages/CandidateDetail/CandidateDetail";
import SearchResult from "./pages/SearchResult/SearchResult";
import Forget from "./pages/Forget/Forget";

const App = () => {
  return (
    <div className="flex h-screen">
      <div className="  ">
        <Navbar />
      </div>

      <main className="flex-1  p-1 overflow-y-auto py-10">
        <Routes>
          
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Home />} />
          <Route path="/cvlist" element={<CVList />} />
          <Route path="/cvupload" element={<CVUpload />} />
          <Route path="/update/:id" element={<CandidateUpdate />} />
          <Route path="/candidate/:id" element={<CandidateDetail />} />
          <Route path="/fileupload" element={<ResumeUpload />} />
          <Route path="/searchResult" element={<SearchResult />} />
          <Route path="/forget" element={<Forget />} />
          <Route path="/*" element={<NotFound />} />
        </Routes>
      </main>

      {/* <div className="lg:hidden">
        <Navbar />
      </div> */}
    </div>
  );
};

export default App;


import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FaBars, FaTimes } from "react-icons/fa";
import UserProfile from "../../UserProfile/UserProfile";
import CandidateProfileIcon from "../CandidateProfile/CandidateProfileIcon";

const CandidateNavbar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();


  return (
    <nav className="bg-white shadow-md px-6 py-3 fixed top-0 left-0 w-full z-50">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <Link to="/candidate-home">
          <img
            // src="/bigints.png"
            src="/cvsto.webp"
            alt="CvStore Logo"
            className="h-10 w-auto object-contain"
          />        </Link>

        {/* Desktop Menu */}
        <div className=" md:flex items-center">
          <div className="hidden md:flex gap-6 items-center">
            <Link to="/candidate/dashboard" className="hover:text-blue-600 font-medium">
              Dashboard
            </Link>
            <Link to="/candidate/jobs" className="hover:text-blue-600 font-medium">
              Jobs
            </Link>
            <Link to="/candidate/applied-jobs" className="hover:text-blue-600 font-medium">
              Applied Jobs
            </Link>
            <Link to="/candidate/saved-jobs" className="hover:text-blue-600 font-medium">
              Saved Jobs
            </Link>
            {/* <Link to="/candidate/profile" className="hover:text-blue-600 font-medium">
            Profile
          </Link> */}
          </div>




        </div>
        <div className=" flex gap-4">

          <CandidateProfileIcon />
          {/* Mobile menu button */}
          <button
            onClick={() => setOpen(!open)}
            className="md:hidden text-gray-700 text-2xl"
          >
            {open ? <FaTimes /> : <FaBars />}
          </button>
        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden mt-3 bg-gray-100 rounded-md shadow-lg p-4 space-y-3">
          <Link
            to="/candidate/dashboard"
            className="block hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Dashboard
          </Link>
          <Link
            to="/candidate/jobs"
            className="block hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Jobs
          </Link>
          <Link
            to="/candidate/applied-jobs"
            className="block hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Applied Jobs
          </Link>
          <Link
            to="/candidate/saved-jobs"
            className="block hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Saved Jobs
          </Link>
          <Link
            to="/candidate/profile"
            className="block hover:text-blue-600"
            onClick={() => setOpen(false)}
          >
            Profile
          </Link>
          {/* <CandidateProfileIcon /> */}
          <button
            onClick={() => {
              handleLogout();
              setOpen(false);
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-md"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
};

export default CandidateNavbar;

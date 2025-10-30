import React, { useState } from "react";
import { FaUserCircle, FaBriefcase, FaBars, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-white/90 backdrop-blur-lg shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 md:px-12 py-3">
        {/* Logo */}
        <div
          className="flex items-center space-x-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/cvsto.webp"
            alt="CvStore Logo"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center space-x-10 font-medium text-gray-700">
          <Link
            to="/jobs"
            className="relative group hover:text-blue-600 transition"
          >
            Find Jobs
            <span className="absolute left-0 bottom-[-4px] w-0 group-hover:w-full h-[2px] bg-blue-600 transition-all duration-300"></span>
          </Link>
          <Link
            to="/companies"
            className="relative group hover:text-blue-600 transition"
          >
            Companies
            <span className="absolute left-0 bottom-[-4px] w-0 group-hover:w-full h-[2px] bg-blue-600 transition-all duration-300"></span>
          </Link>
          <Link
            to="/about"
            className="relative group hover:text-blue-600 transition"
          >
            About
            <span className="absolute left-0 bottom-[-4px] w-0 group-hover:w-full h-[2px] bg-blue-600 transition-all duration-300"></span>
          </Link>
          <Link
            to="/contact"
            className="relative group hover:text-blue-600 transition"
          >
            Contact
            <span className="absolute left-0 bottom-[-4px] w-0 group-hover:w-full h-[2px] bg-blue-600 transition-all duration-300"></span>
          </Link>
        </div>

        {/* Right Buttons */}
        <div className="hidden md:flex items-center space-x-6">
          <button
            onClick={() => navigate("/login")}
            className="flex items-center gap-1 hover:bg-green-600 transition bg-green-500 px-5 py-2 rounded-full text-white font-medium"
          >
            Login
          </button>

          <button
            onClick={() => navigate("/register")}
            className="text-gray-700 hover:bg-orange-600 transition bg-orange-500 px-5 py-2 rounded-full text-white font-medium"
          >
            Sign Up
          </button>

          <button
            onClick={() => navigate("/recruit/register")}
            className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-5 py-2 rounded-full shadow hover:shadow-lg transform hover:scale-105 transition flex items-center gap-2"
          >
            <FaBriefcase /> For Employers
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-2xl text-gray-800 focus:outline-none"
          >
            {isOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg flex flex-col items-center py-6 space-y-6 text-gray-700 font-medium animate-slideDown">
          <Link to="/jobs" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Find Jobs</Link>
          <Link to="/companies" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Companies</Link>
          <Link to="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-600">About</Link>
          <Link to="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Contact</Link>
          <button
            onClick={() => { setIsOpen(false); navigate("/login"); }}
            className="w-3/4 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => { setIsOpen(false); navigate("/register"); }}
            className="w-3/4 border border-blue-600 text-blue-600 py-2 rounded-full hover:bg-blue-50 transition"
          >
            Sign Up
          </button>
          <button
            onClick={() => { setIsOpen(false); navigate("/recruit/register"); }}
            className="w-3/4 bg-green-600 text-white py-2 rounded-full hover:bg-green-700 transition"
          >
            For Employers
          </button>
        </div>
      )}
    </nav>
  );
};

export default PublicNavbar;

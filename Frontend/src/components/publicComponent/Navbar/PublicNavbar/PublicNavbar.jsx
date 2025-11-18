import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaBriefcase,
  FaUserCircle,
  FaSearch,
  FaMapMarkerAlt,
  FaLaptopCode,
  FaIndustry,
  FaUserGraduate,
} from "react-icons/fa";

const PublicNavbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-3">
        {/* Left: Logo */}
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img
            src="/cvsto.webp"
            alt="CVStore"
            className="h-10 w-auto object-contain"
          />
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex items-center space-x-10 text-gray-700 font-medium">
          {/* Jobs with dropdown */}
          <div
            className="relative group cursor-pointer"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <span className="hover:text-blue-600 flex items-center gap-1">
              Jobs
            </span>
            {dropdownOpen && (
              <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md py-2 border border-gray-100 transition-all">
                <Link
                  to="/jobs/it"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-gray-700"
                >
                  <FaLaptopCode className="text-blue-500" /> IT Jobs
                </Link>
                <Link
                  to="/jobs/non-it"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-gray-700"
                >
                  <FaIndustry className="text-orange-500" /> Non-IT Jobs
                </Link>
                <Link
                  to="/jobs/location"
                  className="flex items-center gap-2 px-4 py-2 hover:bg-blue-50 text-gray-700"
                >
                  <FaMapMarkerAlt className="text-green-500" /> Jobs by Location
                </Link>
              </div>
            )}
          </div>

          <Link to="/companies" className="hover:text-blue-600">
            Companies
          </Link>
          <Link to="/contact" className="hover:text-blue-600">
            Contact
          </Link>
        </div>

        {/* Right: Buttons */}
        <div className="hidden md:flex items-center gap-4">
          <button
            onClick={() => navigate("/candidate/login")}
            className="flex items-center gap-2 bg-blue-600 text-white  px-5 py-2 rounded-full shadow hover:scale-105 hover:bg-blue-700 transition"
          >
            <FaUserGraduate /> Find a Job
          </button>
          <button
            onClick={() => navigate("/recruit/login")}
            className="flex items-center gap-2 bg-orange-500 text-white   px-5 py-2 rounded-full shadow hover:scale-105 hover:bg-orange-600 transition"
          >
            <FaBriefcase /> Hire Talent
          </button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-2xl text-gray-700"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Sidebar */}
      <div
        className={`fixed top-0 right-0 h-full w-[60%] bg-white shadow-lg transform ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-300 ease-in-out z-40`}
      >
        <div className="flex justify-between items-center px-6 py-4 border-b">
          <div className="flex items-center gap-2">
            <img src="/cvsto.webp" alt="logo" className="h-8" />
          </div>
          <button onClick={() => setMenuOpen(false)}>
            <FaTimes className="text-2xl text-gray-700" />
          </button>
        </div>

        {/* Search bar */}
        <div className="flex items-center gap-2 mx-5 mt-4 border px-3 py-2 rounded-full shadow-sm">
          <FaSearch className="text-gray-400" />
          <input
            type="text"
            placeholder="Search jobs..."
            className="outline-none flex-1 text-sm"
          />
        </div>

        {/* Links */}
        <div className="flex flex-col mt-6 space-y-4 px-6 text-gray-700 font-medium">
          <div>
            <p
              className="flex justify-between items-center hover:text-blue-600 cursor-pointer"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              Jobs <span>{dropdownOpen ? "▲" : "▼"}</span>
            </p>
            {dropdownOpen && (
              <div className="ml-4 mt-2 space-y-2">
                <Link to="/jobs/it" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-blue-500">
                  <FaLaptopCode /> IT Jobs
                </Link>
                <Link to="/jobs/non-it" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-orange-500">
                  <FaIndustry /> Non-IT Jobs
                </Link>
                <Link to="/jobs/location" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 hover:text-green-500">
                  <FaMapMarkerAlt /> Jobs by Location
                </Link>
              </div>
            )}
          </div>
          <Link to="/companies" onClick={() => setMenuOpen(false)}>Companies</Link>
          <Link to="/contact" onClick={() => setMenuOpen(false)}>Contact</Link>

          <button
            onClick={() => { setMenuOpen(false); navigate("/candidate/login"); }}
            className="mt-4 bg-blue-600 text-white py-2 rounded-full hover:bg-blue-600 transition flex items-center justify-center gap-2 shadow"
          >
            <FaUserGraduate /> Find a Job
          </button>
          <button
            onClick={() => { setMenuOpen(false); navigate("/recruit/login"); }}
            className="bg-orange-500 text-white py-2 rounded-full hover:bg-orange-600 transition flex items-center justify-center gap-2 shadow"
          >
            <FaBriefcase /> Hire Talent
          </button>
        </div>
      </div>
    </nav>
  );
};

export default PublicNavbar;



import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaHome, FaSearch, FaListAlt, FaUpload, FaFileAlt } from "react-icons/fa";
import SearchBar from "../../../SearchBar/SearchBar"
import UserProfile from "../../../UserProfile/UserProfile";

const AdminNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: "/admin-dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "/search", label: "Search", icon: <FaSearch /> },
    { path: "/cvlist", label: "CV List", icon: <FaSearch /> },
    { path: "/job-Post", label: "Job Post", icon: <FaListAlt /> },
    { path: "/previous-job", label: "Previous Post", icon: <FaListAlt /> },
    { path: "/shortlist", label: "Shortlist Candidate", icon: <FaListAlt /> },
    { path: "/view-hr", label: "View HR", icon: <FaListAlt /> },
    { path: "/cvupload", label: "CV Upload", icon: <FaUpload /> },
    { path: "/fileupload", label: "Resume Upload", icon: <FaFileAlt /> },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* Top Navbar */}
      <div className="flex items-center bg-white px-4 py-2 fixed top-0 left-0 w-full z-50 shadow">
        <button onClick={toggleSidebar} className="text-xl text-gray-700 mr-4 hidden md:block">
          <FaBars />
        </button>

        {/* Logo */}
        <div className="flex items-center">
          <img src="/cvsto.webp" alt="CvStore Logo" className="h-8 md:h-10 w-auto object-contain" />
        </div>

        {/* Search */}
        <SearchBar/>

        <UserProfile/>

        {/* <Logout/> */}
      </div>

      {/* Sidebar + Main */}
      <div className="flex flex-1 pt-[70px]">
        <div
          className={`hidden md:flex flex-col bg-white transition-all duration-100 ${
            isOpen ? "w-48" : "w-16"
          }`}
        >
          <ul className="flex flex-col space-y-2  fixed">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                  location.pathname === item.path
                    ? "bg-green-100 text-green-500 font-semibold"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {isOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </ul>
        </div>

        <div className="flex-1 p-2 overflow-y-auto bg-gray-50"></div>
      </div>

      {/* Mobile bottom nav */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 flex justify-around items-center py-2 md:hidden z-50">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center text-xs ${
              location.pathname === item.path ? "text-gray-900 font-semibold" : "text-gray-900"
            }`}
          >
            <span className="text-lg">{item.icon}</span>
            <span>{item.label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default AdminNavbar;

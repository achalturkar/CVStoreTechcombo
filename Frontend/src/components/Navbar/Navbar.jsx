import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaSearch,
  FaListAlt,
  FaUpload,
  FaFileAlt,
} from "react-icons/fa";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false); // Sidebar expand/collapse
  const location = useLocation();

  const toggleSidebar = () => setIsOpen(!isOpen);

  const menuItems = [
    { path: "/", label: "Dashboard", icon: <FaHome /> },
    { path: "/searchCandidate", label: "Search", icon: <FaSearch /> },
    { path: "/cvlist", label: "CV List", icon: <FaListAlt /> },
    { path: "/cvupload", label: "CV Upload", icon: <FaUpload /> },
    { path: "/fileupload", label: "Resume Upload", icon: <FaFileAlt /> },
  ];

  return (
    <div className="h-screen flex flex-col">
      {/* 🔹 Top Navbar */}
      <div className="flex items-center bg-white  px-4 py-2 fixed top-0 left-0 w-full z-50 ">
        {/* Left: Toggle + Logo */}
        <button
          onClick={toggleSidebar}
          className="text-2xl text-gray-700 mr-4 hidden md:block"
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div className="text-xl font-bold text-blue-600">CV Store</div>

        {/* Center: Search Bar */}
        <div className="flex-1 flex justify-center">
          <div className="w-full md:w-1/2 flex items-center bg-gray-100 rounded-lg px-3 py-1">
            <input
              type="text"
              placeholder="Search candidates..."
              className="w-full bg-transparent focus:outline-none"
            />
            <FaSearch className="text-gray-500 ml-2" />
          </div>
        </div>
      </div>

      {/* 🔹 Desktop Layout (Sidebar + Content) */}
      <div className="flex flex-1 pt-[55px]">
        {/* Sidebar (desktop only) */}
        <div
          className={`hidden md:flex flex-col bg-white  transition-all duration-300
          ${isOpen ? "w-48" : "w-16"}`}
        >
          <ul className="flex flex-col space-y-2 mt-6">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                  ${
                    location.pathname === item.path
                      ? "bg-blue-100 text-blue-600 font-semibold"
                      : "hover:bg-gray-100 text-gray-700"
                  }`}
              >
                <span className="text-xl">{item.icon}</span>
                
                {isOpen && <span>{item.label}</span>}
              </Link>
            ))}
          </ul>
        </div>

        {/* Main Content */}
        {/* <div className="flex-1 p-4 overflow-y-auto bg-gray-50"> */}
          {/* ✅ Routed pages will render here */}
          {/* <div className="pb-16 md:pb-4">Main Content Area</div> */}
        {/* </div> */}
      </div>

      {/* 🔹 Bottom Navbar (mobile only) */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200  flex justify-around items-center py-2 md:hidden z-50">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center text-xs
              ${
                location.pathname === item.path
                  ? "text-blue-600 font-semibold"
                  : "text-gray-600"
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

export default Navbar;

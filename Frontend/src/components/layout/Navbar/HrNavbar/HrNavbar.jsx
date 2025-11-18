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

import { MdPostAdd } from "react-icons/md";



// import SearchBar from "../../../resumeData/SearchBar/SearchBar";
import UserProfile from "../../../UserProfile/UserProfile";
import { HiOutlineDocumentText } from "react-icons/hi";

const HrNavbar = () => {
  const [isOpen, setIsOpen] = useState(false); // controls sidebar expanded on desktop & drawer on mobile
  const [mobileOpen, setMobileOpen] = useState(false); // strictly mobile drawer control
  const location = useLocation();

  const menuItems = [
    { path: "/hr-dashboard", label: "Dashboard", icon: <FaHome /> },
    { path: "/search", label: "Search", icon: <FaSearch /> },
    { path: "/job-post", label: "Job Post", icon: <MdPostAdd size={24} /> },
    { path: "/cvupload", label: "CV Upload", icon: <FaUpload /> },
    { path: "/fileupload", label: "Resume Upload", icon: <FaFileAlt /> },
    { path: "/cvlist", label: "CV List", icon: <HiOutlineDocumentText size={24}/> },
  ];

  // classes for sidebar width on desktop
  const desktopSidebarClass = isOpen ? "md:w-48" : "md:w-16";
  // margin-left for main content on desktop; md:ml-48 or md:ml-16
  const mainMarginClass = isOpen ? "md:ml-48" : "md:ml-16";

  return (
    <div className="min-h-screen bg-gray-50 ">
      {/* Top Navbar (fixed) */}
      <div className="flex items-center bg-white px-4 py-2 fixed top-0 left-0 w-full z-50 shadow">
        {/* Sidebar toggle (desktop) */}
        <button
          onClick={() => setIsOpen(prev => !prev)}
          className="text-xl text-gray-700 mr-4 hidden md:inline-flex"
          aria-label="Toggle sidebar"
        >
          <FaBars />
        </button>

        {/* Mobile hamburger (mobile only) */}
        <button
          onClick={() => setMobileOpen(true)}
          className="text-2xl text-gray-700 mr-4 md:hidden"
          aria-label="Open menu"
        >
          <FaBars />
        </button>

        {/* Logo */}
        <div className="flex items-center cursor-pointer" onClick={() => window.location.href = "/"}>
          <img src="/cvsto.webp" alt="CvStore Logo" className="h-8 md:h-10 w-auto object-contain" />
        </div>

        {/* Search center (hidden on small screens) */}
        {/* <div className="flex-1 hidden md:flex justify-center px-6">
          <SearchBar />
        </div> */}

        {/* Right items */}
        <div className="flex items-center gap-3 ml-auto">
          <UserProfile />
        </div>
      </div>

      {/* Desktop Sidebar (not fixed) */}
      <aside
        className={`hidden md:flex flex-col top-0 left-0 bg-white border-r border-gray-100 h-auto transition-all duration-200 ease-in-out ${desktopSidebarClass}`}
        style={{ paddingTop: 70 }}  
      >
        <ul className="flex flex-col space-y-1 px-2 ">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all
                ${location.pathname === item.path
                  ? "bg-green-100 text-green-600 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"}`}
            >
              <span className="text-lg">{item.icon}</span>
              {isOpen && <span className="whitespace-nowrap">{item.label}</span>}
            </Link>
          ))}
        </ul>
      </aside>

      {/* Mobile sliding drawer (overlays content) */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out md:hidden
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <div className="flex items-center gap-2">
            <img src="/cvsto.webp" alt="logo" className="h-8" />
          </div>
          <button onClick={() => setMobileOpen(false)} className="text-2xl">
            <FaTimes />
          </button>
        </div>

        {/* <div className="p-4">
          <SearchBar />
        </div> */}

        <nav className="px-2 py-4">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors block
                ${location.pathname === item.path ? "bg-green-100 text-green-600 font-semibold" : "text-gray-700 hover:bg-gray-100"}`}
            >
              <span className="text-lg">{item.icon}</span>
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Clickable backdrop when mobile drawer open */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main content area; add top padding for fixed navbar and left margin for sidebar on md+ */}
      {/* <main className={`pt-[70px] transition-all duration-200 ${mainMarginClass}`}>
        <div className="p-4 min-h-[calc(100vh-70px)]">
          <div className="bg-white rounded-xl p-6 shadow">
            <h2 className="text-xl font-semibold">Dashboard Content</h2>
            <p className="text-gray-600 mt-2">This area is your main content. On desktop it shifts based on sidebar width. On mobile the sidebar is a drawer.</p>
          </div>
        </div>
      </main> */}
    </div>
  );
};

export default HrNavbar;

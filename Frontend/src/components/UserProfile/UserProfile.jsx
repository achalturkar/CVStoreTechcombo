import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { FaUserCircle, FaSignOutAlt, FaCog, FaBuilding, FaUserEdit, FaMoon } from "react-icons/fa";
import { MdEmail, MdPhone, MdBadge } from "react-icons/md";

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("jwtToken");

  const fetchProfile = async () => {
    try {
      const res = await fetch(`${baseUrl}/auth/recruit/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) throw new Error("Failed to load profile");

      const data = await res.json();
      setProfile(data);
    } catch (err) {
      console.error("Profile Fetch Error:", err);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  if (!profile) return null;

  return (
    <div className="relative inline-block" ref={dropdownRef}>
      {/* Button (Profile Icon) */}
      <button
        onClick={() => setShowProfile((prev) => !prev)}
        className="flex items-center gap-2 text-gray-900 hover:text-blue-600 transition-all"
      >
        <FaUserCircle size={32} />
      </button>

      {/* Dropdown */}
      {showProfile && (
        <div className="absolute right-0 mt-4 w-80 bg-white shadow-lg  border border-gray-100 z-50 p-4 animate-fadeIn">

          {/* TOP SECTION */}
          <div className="flex gap-3 items-center pb-3 border-b">
            <FaUserCircle size={58} className="text-blue-500" />

            <div>
              <h3 className="text-lg font-semibold text-gray-900 leading-tight">
                {profile.fullName}
              </h3>

              <p className="text-sm text-gray-600 capitalize">{profile.role}</p>

              <p className="text-[11px] text-gray-500 tracking-wide">
                ID: {profile.uniqueId}
              </p>
            </div>
          </div>

          {/* DETAILS */}
          <div className="mt-3 space-y-1 text-[16px] text-gray-700">

            <div className="flex items-center gap-2">
              <MdEmail className="text-blue-600" />
              <span>{profile.email}</span>
            </div>

            <div className="flex items-center gap-2">
              <MdPhone className="text-green-600" />
              <span>{profile.mobile || "N/A"}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaBuilding className="text-purple-600" />
              <span>{profile.companyName || "No Company Assigned"}</span>
            </div>

            <div className="flex items-center gap-2">
              <MdBadge className="text-orange-600" />
              <span>Recruiter Access Level: Recruit</span>
            </div>
          </div>

          {/* MENU OPTIONS */}
          <div className="mt-2 border-t pt-2 space-y-1">

            <button
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-800 text-sm"
              onClick={() => (window.location.href = "/profile")}
            >
              <FaUserEdit /> Edit Profile
            </button>

            <button
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-800 text-sm"
              onClick={() => (window.location.href = "/settings")}
            >
              <FaCog /> Account Settings
            </button>

            <button
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-800 text-sm"
            >
              <FaBuilding /> Company Settings
            </button>

            {/* <button
              className="flex items-center gap-2 w-full px-3 py-2 rounded-lg hover:bg-gray-100 text-gray-800 text-sm"
            >
              <FaMoon /> Theme: Dark Mode (Coming Soon)
            </button> */}
          </div>

          {/* LOGOUT */}
          <button
            onClick={() => {
              Cookies.remove("jwtToken");
              Cookies.remove("Role");
              window.location.href = "/recruit/login";
            }}
            className="w-full mt-4 bg-red-600 hover:bg-red-700 text-white font-medium py-2 rounded-xl transition-all text-sm flex items-center justify-center gap-2"
          >
            <FaSignOutAlt />
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default UserProfile;

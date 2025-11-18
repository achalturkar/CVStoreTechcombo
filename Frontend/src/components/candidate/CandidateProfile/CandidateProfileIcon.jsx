import React, { useEffect, useState, useRef } from "react";
import Cookies from "js-cookie";
import { FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const CandidateProfileIcon= () => {
  const [profile, setProfile] = useState(null);
  const [showProfile, setShowProfile] = useState(false);
  const dropdownRef = useRef(null);

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("jwtToken");

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/candidate/me`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setProfile(data);
    } catch (err) {
      console.error("Error fetching profile:", err);
    }
  };

  useEffect(() => {
    if (token) fetchProfile();
  }, [token]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowProfile(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!profile) return null; 

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setShowProfile(!showProfile)}
        className="flex items-center gap-2 text-gray-800 hover:text-blue-600 transition"
      >
        <FaUserCircle size={28} />
      </button>

      {/* Dropdown */}
      {showProfile && (
        <div
          className="absolute right-0 mt-3 w-60 bg-white border border-gray-200 rounded-2xl shadow-lg p-4 z-50 animate-fadeIn"
        >
          <div className=" flex gap-2">
            <div className="w-1/4">
            <FaUserCircle size={48} className="mx-auto text-blue-500" />
            </div>
            <div className="w-3/4 ">
            <h3 className="text-lg font-semibold">{ profile.fullName }</h3>
            <p className="text-sm text-gray-500">{profile.role }</p>
            </div>
          </div>

          <div className="text-blue-400 hover:text-blue-700">
            <Link to="/candidate/profile">View Profile</Link>
          </div>

          <div className="text-sm text-gray-700 space-y-1 mt-2">
            <p><strong>User ID:</strong> {profile.id}</p>
            <p><strong>Email:</strong> {profile.email}</p>
            <p><strong>Mobile:</strong> {profile.mobileNumber || profile.phone || "N/A"}</p>
          </div>

          <button
            onClick={() => {
              Cookies.remove("jwtToken");
              window.location.href = "/candidate/login";
            }}
            className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-3 rounded-xl transition"
          >
            Logout
          </button>
          {/* <Logout/> */}
        </div>
      )}
    </div>
  );
};

export default CandidateProfileIcon;

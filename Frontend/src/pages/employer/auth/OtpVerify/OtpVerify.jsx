import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";

const baseUrl = import.meta.env.VITE_API_BASE_URL; 

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const verifyOtp = async () => {
    try {
      const response = await fetch(`${baseUrl}/auth/recruit/verify`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: state.email,
          otp,
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Invalid OTP");
      }

      const data = await response.json();

      if (data.token) {
        document.cookie = `token=${data.token}; path=/; secure`;
      }

      navigate("/hr-dashboard");
    } catch (error) {
      alert(error.message || "OTP verification failed");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col">

      {/* ----------- HEADER ----------- */}
      <header className="flex justify-between items-center p-5">
        <Link to="/" className="flex items-center">
          <img src="/cvsto.webp" alt="Logo" className="w-32" />
        </Link>

        <Link
          to="/recruit/login"
          className="text-sm text-blue-700 font-semibold hover:underline"
        >
          Are you an Employer?
        </Link>
      </header>

      {/* ----------- CONTENT CENTER ----------- */}
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center text-gray-700 mb-3">
            Verify OTP
          </h2>

          <p className="text-gray-600 text-center mb-6">
            OTP sent to <span className="font-bold">{state?.email}</span>
          </p>

          <input
            type="text"
            maxLength={6}
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-5"
          />

          <button
            onClick={verifyOtp}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-lg transition-all"
          >
            Verify OTP
          </button>
        </div>
      </div>

    </div>
  );
};

export default OtpVerify;

import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const baseUrl = import.meta.env.VITE_API_BASE_URL;

const LoginWithOtp = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const sendOtp = async () => {
    if (!email) {
      alert("Please enter an email");
      return;
    }

    try {
      const response = await fetch(`${baseUrl}/auth/recruit/send`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.message || "Failed to send OTP");
      }

      navigate("/recruit/verify-otp", { state: { email } });
    } catch (error) {
      alert(error.message || "Error sending OTP");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col">

      {/* -------- HEADER -------- */}
      <header className="flex justify-between items-center p-5">
        <Link to="/" className="flex items-center">
          <img src="/cvsto.webp" alt="Logo" className="w-32" />
        </Link>

        <Link
          to="/recruit/login"
          className="text-sm text-blue-700 font-semibold hover:underline"
        >
          Login with Password
        </Link>
      </header>

      {/* -------- CENTER CARD -------- */}
      <div className="flex flex-1 justify-center items-center px-4">
        <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">

          <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
            Login with OTP
          </h2>

          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500 mb-6"
          />

          <button
            onClick={sendOtp}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl text-lg transition-all"
          >
            Send OTP
          </button>

          <p className="text-center text-gray-600 text-sm mt-5">
            Don’t have an account?{" "}
            <Link
              to="/recruit/register"
              className="text-blue-700 font-semibold hover:underline"
            >
              Register here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
};

export default LoginWithOtp;

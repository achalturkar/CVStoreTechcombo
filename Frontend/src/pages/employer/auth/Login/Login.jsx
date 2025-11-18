import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    errMsg: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Normal Login
  const userDetailSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`${baseUrl}/auth/recruit/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: value.email,
          password: value.password,
        }),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (response.ok) {
        Cookies.set("jwtToken", data.token, { expires: 7 });
        Cookies.set("role", data.role, { expires: 7 });

        if (data.role === "SUPERADMIN") navigate("/superadmin-dashboard");
        else if (data.role === "ADMIN") navigate("/admin-dashboard");
        else if (data.role === "HR") navigate("/hr-dashboard");
        else navigate("/");
      } else {
        // let msg = "Login failed";

        if (data.message) {
          msg = data.message; 
        }

        if (response.status === 401) {
          msg = "Incorrect password. Please try again.";
        }

        if (response.status === 404) {
          msg = "No account found with this email.";
        }

        setValue({ ...value, errMsg: msg });
      }

    } catch (error) {
      console.error(error);
      setValue({ ...value, errMsg: "Please check Email & Password" });
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${baseUrl}/oauth2/authorization/google`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-4">

      {/* ------------------- HEADER ------------------- */}
      <header className="flex justify-between items-center py-6 max-w-6xl mx-auto">

        {/* LEFT - LOGO */}
        <Link to="/" className="flex items-center gap-2">
          <img src="/cvsto.webp" alt="logo" className="w-32" />
        </Link>

        {/* Right - Candidate link */}
        <Link
          to="/candidate/login"
          className="text-blue-700 font-semibold hover:underline text-sm"
        >
          Are you a Candidate?
        </Link>
      </header>

      {/* ------------------- LOGIN CARD ------------------- */}
      <div className="flex items-center justify-center">
        <div className="w-full max-w-md bg-white shadow-2xl rounded-2xl p-8">

          {/* Heading */}
          <h2 className="text-3xl font-extrabold text-gray-800 text-center">
            Welcome Back Employer
          </h2>
          <p className="text-center text-gray-500 text-sm mb-6">
            Sign in to continue your journey
          </p>

          {/* Google OAuth Button */}
          <button
            onClick={handleGoogleLogin}
            type="button"
            className="flex items-center justify-center w-full border border-gray-300 rounded-full py-2 font-medium text-gray-700 hover:bg-gray-100 transition mb-5 shadow-sm"
          >
            <FcGoogle className="text-xl mr-2" />
            Continue with Google
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-400 text-sm">or</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          {/* Login Form */}
          <form onSubmit={userDetailSubmit} className="flex flex-col gap-4">

            {/* Email */}
            <input
              type="email"
              placeholder="Enter your Email"
              className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition"
              value={value.email}
              onChange={(e) => setValue({ ...value, email: e.target.value })}
              required
            />

            {/* Password + Eye Toggle */}
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter Password"
                className="border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 transition w-full pr-12"
                value={value.password}
                onChange={(e) => setValue({ ...value, password: e.target.value })}
                required
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-blue-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Error Message */}
            {value.errMsg && (
              <p className="text-red-500 text-sm text-center">
                {value.errMsg}
              </p>
            )}

            {/* Links Row */}
            <div className="flex justify-between text-sm font-medium mb-2">
              <Link
                to="/recruit/forget"
                className="text-blue-600 hover:underline"
              >
                Forgot Password?
              </Link>

              <Link
                to="/recruit/login/otp"
                className="text-gray-600 hover:text-blue-600 transition"
              >
                Login with OTP
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-1 bg-blue-600 text-white rounded-xl py-3 font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
            >
              Login
            </button>
          </form>

          {/* ------------------- Register Section ------------------- */}
          <div className="flex items-center my-6">
            <div className="flex-grow border-t border-gray-300"></div>
            <span className="mx-3 text-gray-400 text-sm">New Here?</span>
            <div className="flex-grow border-t border-gray-300"></div>
          </div>

          <div className="text-center">
            <Link
              to="/recruit/register"
              className="text-blue-700 font-semibold text-sm hover:underline"
            >
              Create a New Employer Account →
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Login;

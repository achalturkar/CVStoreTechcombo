import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const CandidateLoginComp = () => {
  const [value, setValue] = useState({
    email: "",
    password: "",
    errMsg: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  // Normal email/password login
  const userDetailSubmit = async (e) => {
    e.preventDefault();

    const userDetail = {
      email: value.email,
      password: value.password,
    };

    try {
      const response = await fetch(`${baseUrl}/auth/candidate/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userDetail),
      });

      const data = await response.json();
      console.log("Login Response:", data);

      if (response.ok) {
        Cookies.set("jwtToken", data.token, { expires: 7 });
         navigate("/candidate-home");
      } else {
        setValue({ ...value, errMsg: data.message || "Login failed" });
      }
    } catch (error) {
      console.error("Error:", error);
      setValue({ ...value, errMsg: "Please Check Email & Password Combination" });
    }
  };

  // Google OAuth2 login
  const handleGoogleLogin = () => {
    window.location.href = `${baseUrl}/oauth2/authorization/google`;
  };

  return (
    <div className="flex items-center justify-center max-h-screen  px-4">
      <div className="w-full max-w-md bg-white shadow-xl rounded-2xl p-8 transition-transform transform hover:scale-[1.01]">

        {/* Heading */}
        <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-1">
          Welcome Back
        </h2>
        <p className="text-center text-gray-500 text-sm mb-6">
          Sign in to your account to explore opportunities
        </p>

        {/* Google OAuth2 Button */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="flex items-center justify-center w-full border border-gray-300 rounded-full py-2 font-medium text-gray-700 hover:bg-gray-100 transition mb-4 shadow-sm"
        >
          <FcGoogle className="text-xl mr-2" />
          Continue with Google
        </button>

        {/* Divider */}
        <div className="flex items-center my-4">
          <div className="flex-grow border-t border-gray-300"></div>
          <span className="mx-3 text-gray-400 text-sm">or</span>
          <div className="flex-grow border-t border-gray-300"></div>
        </div>

        {/* Login Form */}
        <form onSubmit={userDetailSubmit} className="flex flex-col gap-4">
          {/* Email */}
          <input
            type="email"
            placeholder="Enter Email"
            className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition"
            value={value.email}
            onChange={(e) => setValue({ ...value, email: e.target.value })}
            required
          />

          {/* Password with Eye Toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Enter Password"
              className="border border-gray-300 rounded-full px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 transition w-full pr-10"
              value={value.password}
              onChange={(e) => setValue({ ...value, password: e.target.value })}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {value.errMsg && (
            <p className="text-red-500 text-sm text-center">{value.errMsg}</p>
          )}

          {/* Links */}
          <div className="flex justify-between items-center text-sm">
            <Link
              to="/recruit/forget"
              className="text-blue-600 hover:underline font-medium"
            >
              Forgot Password?
            </Link>
            
            <Link
              to="/candidate/register"
              className="text-gray-600 hover:text-blue-600 transition font-medium"
            >
              New Candidate? Register
            </Link>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="mt-2 bg-blue-600 text-white rounded-full py-2 font-semibold hover:bg-blue-700 transition-all shadow-md hover:shadow-lg"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default CandidateLoginComp;

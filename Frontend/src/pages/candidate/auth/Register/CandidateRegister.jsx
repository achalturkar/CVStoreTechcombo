import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const CandidateRegister = () => {
  const [register, setRegister] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [emailExists, setEmailExists] = useState(false);

  const navigate = useNavigate();
  const baseurl = import.meta.env.VITE_API_BASE_URL;

  // handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone") {
      const onlyNumbers = value.replace(/\D/g, ""); // remove non-digits
      if (onlyNumbers.length > 10) return;
      setRegister({ ...register, [name]: onlyNumbers });
    } else {
      setRegister({ ...register, [name]: value });
    }
  };

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setEmailExists(false);

    // ✅ Validate phone number
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(register.phone)) {
      setMessage("❌ Please enter a valid 10-digit phone number.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${baseurl}/auth/candidate/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(register),
      });


      if (!response.ok) throw new Error("Registration failed");

      const data = await response.json();
      setMessage("✅ Registration successful! Redirecting to login...");
      console.log("Registered Candidate:", data);

      setRegister({
        fullName: "",
        email: "",
        phone: "",
        password: "",
      });

      setTimeout(() => navigate("/candidate/login"), 2000);
    } catch (error) {
      console.error("Error:", error);
      // Only show generic error if it’s not email conflict
      if (!emailExists)
        setMessage("Email already Present");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 px-8">

      <header className="flex justify-between items-center p-5">
        <div className="flex items-center gap-2">
          <Link
            to="/"
            className="text-lg font-bold text-blue-700 hover:text-blue-900 transition"
          >
            <img src="/cvsto.webp" alt="TechCombo" className=" w-28" />
          </Link>
        </div>

        <Link
          to="/recruit/login"
          className="text-sm text-blue-700 font-semibold hover:underline"
        >
          Are you an Employer?
        </Link>
      </header>

      <div className="flex flex-col md:flex-row justify-center items-center mt-2 px-6 py-8">

        {/* Left Section */}
        <div className="md:flex flex-col justify-center md:w-1/2 space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-800 leading-tight">
            Grow Your Career with{" "}
            <span className="text-green-400">TechCombo</span>
          </h2>
          <p className="text-gray-600 text-lg">
            🚀 Find verified jobs, connect with top employers, and apply easily.
          </p>

          <ul className="space-y-3 text-gray-700">
            <li>✅ Explore 1000+ verified job listings</li>
            <li>✅ Upload your resume and apply in one click</li>
            <li>✅ Track your application status in real-time</li>
            <li>✅ Get matched with jobs that suit your skills</li>
          </ul>

          <p className="text-sm text-gray-500 mt-4">
            Join 10,000+ candidates building their future with TechCombo.
          </p>
        </div>

        {/* Right Section: Registration Form */}
        <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl transition-transform transform hover:scale-[1.01]">
          <div className="flex items-center justify-center mb-4 text-blue-600">
            <h2 className="text-xl font-bold">Candidate Registration</h2>
          </div>

          {message && (
            <p
              className={`text-center mb-4 font-medium ${message.includes("✅")
                  ? "text-green-600"
                  : message.includes("already")
                    ? "text-yellow-600"
                    : "text-red-600"
                }`}
            >
              {message}
            </p>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Full Name<span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="fullName"
                value={register.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-1 focus:ring-blue-400 transition"
                placeholder="Enter your full name"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Email<span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={register.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-1 focus:ring-blue-400 transition"
                placeholder="Enter your email address"
              />
            </div>

            {/* Mobile */}
            <div>
              <label className="block text-gray-700 font-semibold mb-1">
                Mobile Number<span className="text-red-500">*</span>
              </label>
              <div className="flex items-center border border-gray-300 rounded-full px-3 focus-within:ring-1 focus-within:ring-blue-400">
                <span className="text-gray-600 font-semibold">+91</span>
                <input
                  type="tel"
                  name="phone"
                  value={register.phone}
                  onChange={handleChange}
                  required
                  maxLength="10"
                  className="w-full px-2 py-2 rounded-full outline-none"
                  placeholder="Enter 10-digit mobile number"
                />
              </div>
            </div>

            {/* Password */}
            <div className="relative">
              <label className="block text-gray-700 font-semibold mb-1">
                Password<span className="text-red-500">*</span>
              </label>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={register.password}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-full outline-none focus:ring-1 focus:ring-blue-400 transition pr-10"
                placeholder="Create a password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-12 transform -translate-y-1/2 text-gray-500 hover:text-blue-600 transition"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-full transition-all shadow-md hover:shadow-lg"
            >
              {loading ? "Registering..." : "Register as Candidate"}
            </button>

            {/* Login Link */}
            {emailExists && (
              <p className="text-center text-gray-600 mt-4">
                Already registered?{" "}
                <a
                  href="/candidate/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login here
                </a>
              </p>
            )}
            {!emailExists && (
              <p className="text-center text-gray-600 mt-4">
                Already have an account?{" "}
                <a
                  href="/candidate/login"
                  className="text-blue-600 font-semibold hover:underline"
                >
                  Login here
                </a>
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default CandidateRegister;

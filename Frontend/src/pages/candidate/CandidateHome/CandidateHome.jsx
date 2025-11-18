import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserCheck, FaUpload, FaBriefcase } from "react-icons/fa";

const CandidateHome = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex flex-col md:flex-row items-center justify-between bg-gradient-to-br from-blue-50 to-blue-100 px-6 md:px-16 py-10 overflow-hidden">
      {/* LEFT SECTION */}
      <div className="flex flex-col items-start text-left space-y-6 md:w-1/2">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 leading-tight">
          Find Your <span className="text-blue-600">Dream Job</span> with Ease 🚀
        </h1>

        <p className="text-gray-600 text-lg max-w-md">
          Explore thousands of job opportunities tailored to your skills. Apply instantly,
          upload your resume, and connect with top employers on <strong>CVStore</strong>.
        </p>

        <div className="flex flex-wrap gap-4 mt-4">
          <button
            onClick={() => navigate("/candidate/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 flex items-center gap-2"
          >
            <FaUserCheck /> Login
          </button>
          <button
            onClick={() => navigate("/candidate/register")}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold shadow-md transition-transform transform hover:scale-105 flex items-center gap-2"
          >
            <FaUpload /> Register
          </button>
        </div>

        {/* Key features */}
        <div className="mt-8 flex flex-col md:flex-row gap-6">
          <div className="flex items-center gap-3">
            <FaBriefcase className="text-blue-600 text-2xl" />
            <span className="text-gray-700 font-medium">Browse Jobs</span>
          </div>
          <div className="flex items-center gap-3">
            <FaUpload className="text-green-600 text-2xl" />
            <span className="text-gray-700 font-medium">Upload Resume</span>
          </div>
          <div className="flex items-center gap-3">
            <FaUserCheck className="text-orange-500 text-2xl" />
            <span className="text-gray-700 font-medium">Get Hired Fast</span>
          </div>
        </div>
      </div>

      {/* RIGHT SECTION (Hero Image / Illustration) */}
      <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
        <img
          src="https://cdn.dribbble.com/users/1162077/screenshots/3848914/jobs.gif"
          alt="Job search illustration"
          className="w-full max-w-lg rounded-lg shadow-xl"
        />
      </div>
    </section>
  );
};

export default CandidateHome;

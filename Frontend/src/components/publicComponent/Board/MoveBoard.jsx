import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUserTie, FaUserGraduate } from "react-icons/fa";
import { motion } from "framer-motion";

const MoveBoard = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex flex-col items-center justify-center px-6 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-5xl font-bold text-gray-800 mb-8 text-center"
      >
        Welcome to <span className="text-blue-600">TechCombo</span> Careers
      </motion.h1>

      <p className="text-gray-600 text-center max-w-xl mb-10 text-lg">
        Whether you're looking for your dream job or hiring top talent, choose
        your role to continue.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-4xl">
        {/* Job Seeker Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition"
        >
          <FaUserGraduate className="text-blue-600 text-5xl mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Job Seeker</h2>
          <p className="text-gray-600 mb-6">
            Explore job opportunities, upload your resume, and build your
            career with us.
          </p>
          <button
            onClick={() => navigate("/candidate/login")}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-5 rounded-xl flex items-center gap-2 transition"
          >
            <FaUserGraduate /> Go to Job Seeker
          </button>
        </motion.div>

        {/* Employer Card */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          className="bg-white rounded-2xl shadow-lg p-8 flex flex-col items-center text-center border border-gray-100 hover:shadow-xl transition"
        >
          <FaUserTie className="text-orange-500 text-5xl mb-4" />
          <h2 className="text-2xl font-semibold mb-2">Employer</h2>
          <p className="text-gray-600 mb-6">
            Post jobs, manage applicants, and hire the right talent for your
            company.
          </p>
          <button
            onClick={() => navigate("/recruit/login")}
            className="bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 px-5 rounded-xl flex items-center gap-2 transition"
          >
            <FaUserTie /> Go to Employer
          </button>
        </motion.div>
      </div>

     
    </div>
  );
};

export default MoveBoard;

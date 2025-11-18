import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import CandidateLoginComp from "../../../../components/candidate/Login/CandidateLoginComp";

const CandidateLogin = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-blue-200 flex flex-col">
      {/* ✅ Header with logo and links */}
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

      {/* ✅ Center Animated Login Card */}
      <div className="flex-grow flex justify-center items-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          <CandidateLoginComp />
        </motion.div>
      </div>
    </div>
  );
};

export default CandidateLogin;

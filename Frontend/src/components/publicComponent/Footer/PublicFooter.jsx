import React from "react";
import {
  FaFacebookF,
  FaLinkedinIn,
  FaTwitter,
  FaInstagram,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";

const PublicFooter = () => {
  return (
    <footer className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-900 text-gray-200 pt-16 pb-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        {/* Company Info */}
        <div>
          <h2 className="text-2xl font-bold text-white mb-4">TechCombo</h2>
          <p className="text-gray-300 text-sm leading-relaxed mb-4">
            Empowering connections between skilled professionals and trusted
            employers. Your one-stop solution for hiring, staffing, and
            freelancing opportunities.
          </p>

          <div className="flex space-x-3 mt-4">
            <a
              href="#"
              className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition"
            >
              <FaFacebookF />
            </a>
            <a
              href="#"
              className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition"
            >
              <FaLinkedinIn />
            </a>
            <a
              href="#"
              className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition"
            >
              <FaTwitter />
            </a>
            <a
              href="#"
              className="bg-blue-700 p-2 rounded-full hover:bg-blue-600 transition"
            >
              <FaInstagram />
            </a>
          </div>
        </div>

        {/* Job Seekers */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">
            For Job Seekers
          </h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white transition">Find Jobs</a></li>
            <li><a href="#" className="hover:text-white transition">Upload Resume</a></li>
            <li><a href="#" className="hover:text-white transition">Career Advice</a></li>
            <li><a href="#" className="hover:text-white transition">Internship Opportunities</a></li>
            <li><a href="#" className="hover:text-white transition">My Dashboard</a></li>
          </ul>
        </div>

        {/* Employers */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">For Employers</h3>
          <ul className="space-y-2 text-gray-300 text-sm">
            <li><a href="#" className="hover:text-white transition">Post a Job</a></li>
            <li><a href="#" className="hover:text-white transition">Search Candidates</a></li>
            <li><a href="#" className="hover:text-white transition">Recruitment Solutions</a></li>
            <li><a href="#" className="hover:text-white transition">Payroll Outsourcing</a></li>
            <li><a href="#" className="hover:text-white transition">Client Login</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h3 className="text-xl font-semibold text-white mb-4">Contact Us</h3>
          <ul className="space-y-3 text-gray-300 text-sm">
            <li className="flex items-center space-x-2">
              <FaMapMarkerAlt className="text-blue-400" />
              <span>Nagpur, Maharashtra, India</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaPhone className="text-blue-400" />
              <span>+91 98765 43210</span>
            </li>
            <li className="flex items-center space-x-2">
              <FaEnvelope className="text-blue-400" />
              <span>support@techcombo.in</span>
            </li>
          </ul>

          <button className="mt-6 bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 font-semibold px-5 py-2 rounded-full hover:scale-105 transition">
            Contact Support
          </button>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-blue-700 mt-12 pt-6 text-center text-sm text-gray-400">
        <p>
          © {new Date().getFullYear()} <span className="text-white font-semibold">TechCombo</span>. 
          All Rights Reserved.
        </p>
        <div className="mt-2 space-x-4">
          <a href="#" className="hover:text-white transition">Privacy Policy</a> |
          <a href="#" className="hover:text-white transition">Terms of Service</a> |
          <a href="#" className="hover:text-white transition">FAQs</a>
        </div>
      </div>
    </footer>
  );
};

export default PublicFooter;

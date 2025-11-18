import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaLinkedin,
  FaGithub,
  FaWhatsapp,
  FaDownload,
  FaPhoneAlt,
} from "react-icons/fa";

import {
  MdEmail,
  MdCall,
  MdWork,
  MdLocationOn
} from "react-icons/md";

import { FiDownload } from "react-icons/fi";
import { TbArrowBackUp } from "react-icons/tb";

import { handleDownload } from "../../../utils/handleDownload";

const CandidateDetail = () => {
  const { id } = useParams();
  const [candidate, setCandidate] = useState(null);
  const [activeTab, setActiveTab] = useState("profile");

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("jwtToken");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const res = await fetch(`${baseUrl}/resume-data/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setCandidate(data);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };

    fetchCandidate();
  }, [id]);

  if (!candidate)
    return <p className="p-6 text-gray-500 text-center">Loading candidate...</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">

      {/* BACK BUTTON */}
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-gray-700 hover:text-black mb-4"
      >
        <TbArrowBackUp size={20} /> Back
      </button>

      {/* MAIN PROFILE HEADER */}
      <div className="bg-white shadow-lg border rounded-xl p-6">

        {/* TOP SECTION */}
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6">

          {/* Profile Image */}
          <div className="w-24 h-24 bg-blue-700 text-white rounded-full text-3xl flex items-center justify-center font-semibold shadow">
            {candidate.fullName?.split(" ").map(n => n[0]).join("")}
          </div>

          {/* Name + Basic Info */}
          <div className="flex-1 text-center md:text-left">
            <h2 className="text-3xl font-semibold text-gray-900">{candidate.fullName}</h2>

            <div className="mt-3 space-y-1 text-gray-700 text-sm">
              <p className="flex items-center justify-center md:justify-start gap-2">
                <MdEmail size={16} className="text-gray-500" /> {candidate.email}
              </p>

              <p className="flex items-center justify-center md:justify-start gap-2">
                <MdCall size={16} className="text-gray-500" /> {candidate.phoneNumber}
              </p>

              <p className="flex items-center justify-center md:justify-start gap-2">
                <MdLocationOn size={16} className="text-gray-500" /> {candidate.address || "Location not provided"}
              </p>

              <p className="flex items-center justify-center md:justify-start gap-2">
                <MdWork size={16} className="text-gray-500" /> {candidate.company || "Company not provided"}
              </p>
            </div>
          </div>

        </div>

        {/* CONTACT BUTTON ROW */}
        <div className="mt-6  gap-3">

          <div className="flex flex-wrap items-center gap-3 mt-4">


            <a
              href={`tel:${candidate.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 text-xs rounded-md"
            >
              <FaPhoneAlt />
              Call
            </a>

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${candidate.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 text-xs rounded-md"
            >
              <FaEnvelope/>
              Email
            </a>

            <a
              href={`https://wa.me/${candidate.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-white text-green-700 font-semibold px-3 py-1 text-xs rounded-md border"
            >
              <FaWhatsapp />
              WhatsApp
            </a>


            <a
              href={`https://www.linkedin.com/in/${candidate.phoneNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 bg-white text-blue-700 font-semibold px-3 py-1 text-xs rounded-md border"
            >
              <FaLinkedin />
              LinkedIN
            </a>

            {candidate.filePath && (
              <a
                onClick={() =>
                  handleDownload(
                    candidate.id,
                    candidate.fullName,
                    candidate.skills,
                    candidate.experience
                  )
                }
                className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 text-xs rounded-md cursor-pointer"
              >
                <FaDownload />
                CV
              </a>
            )}
          </div>

        </div>

      </div>

      {/* ------- DO NOT MODIFY THIS SECTION BELOW (TABS) ------- */}

      {/* TABS */}
      <div className="mt-6 flex gap-6 border-b text-gray-700 font-semibold">
        <button
          className={`pb-2 ${activeTab === "profile" ? "border-b-2 border-blue-600 text-blue-600" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Profile Details
        </button>

        <button
          className={`pb-2 ${activeTab === "cv" ? "border-b-2 border-blue-600 text-blue-600" : ""}`}
          onClick={() => setActiveTab("cv")}
        >
          CV
        </button>
      </div>

      {/* PROFILE DETAILS SECTION */}
      {activeTab === "profile" && (
        <div className="bg-white shadow-md p-6 rounded-xl border mt-5">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Complete Profile</h2>

          <div className="grid grid-cols-2 gap-5 text-sm text-gray-700">
            <p><strong>Full Name:</strong> {candidate.fullName}</p>
            <p><strong>Email:</strong> {candidate.email}</p>
            <p><strong>Phone:</strong> {candidate.phoneNumber}</p>
            <p><strong>Experience:</strong> {candidate.experience} years</p>
            <p><strong>Skills:</strong> {candidate.skills}</p>
            <p><strong>Company:</strong> {candidate.company}</p>
            <p><strong>Education:</strong> {candidate.education}</p>
            <p><strong>Address:</strong> {candidate.address}</p>
            <p><strong>Notice Period:</strong> {candidate.noticePeriod || "Not Provided"}</p>
            <p><strong>Current CTC:</strong> {candidate.currentCtc || "Not Provided"}</p>
            <p><strong>Expected CTC:</strong> {candidate.expectedCtc || "Not Provided"}</p>
            <p><strong>Summary:</strong> {candidate.summary || "Not Provided"}</p>
          </div>
        </div>
      )}

      {/* CV SECTION */}
      {activeTab === "cv" && (
        <div className="bg-white shadow-md p-6 rounded-xl border mt-5">
          <button
            onClick={() => window.open(`${baseUrl}/resume-data/view/${id}`, "_blank")}
            className="bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            View CV
          </button>
        </div>
      )}


    </div>

  );
};

export default CandidateDetail;

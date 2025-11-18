import React from "react";
import {
  FaEnvelope,
  FaWhatsapp,
  FaPhoneAlt,
  FaMapMarkerAlt,
  FaBriefcase,
  FaDownload,
  FaLinkedin,
} from "react-icons/fa";

import { highlight } from "../../utils/highlight";
import { handleDownload } from "../../utils/handleDownload";
import { useNavigate } from "react-router-dom";

const CandidateCard = ({ c, searchKeyword }) => {
  const navigate = useNavigate();

  const formatDate = (date) =>
    date
      ? new Date(date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      : "N/A";

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition p-6">
      <div className="flex items-start gap-4">

        {/* Avatar */}
        <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 text-xl font-bold">
          {c.fullName ? c.fullName.charAt(0) : "U"}
        </div>

        <div className="flex-1">
          {/* Name + button */}
          <div className="flex justify-between">
            <h3
              className="text-xl font-semibold text-gray-900 hover:text-blue-600"
              dangerouslySetInnerHTML={{
                __html: highlight(c.fullName, searchKeyword),
              }}
            />

            <button
              onClick={() => navigate(`/candidate/${c.id}`)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-md text-xs"
            >
              View Profile
            </button>
          </div>

          {/* Email + Phone */}
          <div className="flex flex-col md:flex-row gap-2 text-sm text-gray-600 mt-1">

            <a
              href={`https://mail.google.com/mail/?view=cm&fs=1&to=${c.email}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1"
            >
              <FaEnvelope className="text-blue-500" />
              <span
                dangerouslySetInnerHTML={{
                  __html: highlight(c.email, searchKeyword),
                }}
              />
            </a>

            <span className="flex items-center gap-1">
              <FaPhoneAlt className="text-green-600" />
              <span
                dangerouslySetInnerHTML={{
                  __html: highlight(c.phoneNumber, searchKeyword),
                }}
              />
            </span>
          </div>

          {/* Designation + Company */}
          <div className="flex items-center gap-2 mt-2 text-gray-700 text-sm">
            <FaBriefcase className="text-gray-500" />
            <span
              dangerouslySetInnerHTML={{
                __html: highlight(
                  c.designation || "Not Mentioned",
                  searchKeyword
                ),
              }}
            />

            {c.company && (
              <>
                •
                <span
                  className="text-blue-600 font-medium ml-2"
                  dangerouslySetInnerHTML={{
                    __html: highlight(c.company, searchKeyword),
                  }}
                />
              </>
            )}
          </div>

          {/* Location */}
          <div className="flex items-center gap-2 mt-1 text-gray-700 text-sm">
            <FaMapMarkerAlt className="text-red-500" />
            <span
              dangerouslySetInnerHTML={{
                __html: highlight(c.address || "N/A", searchKeyword),
              }}
            />
          </div>
        </div>
      </div>

      {/* Skills */}
      <div className="mt-2 text-sm">
        <p className="text-xs font-semibold text-gray-500">Skills</p>
        <p
          dangerouslySetInnerHTML={{
            __html: highlight(c.skills || "N/A", searchKeyword),
          }}
        />
      </div>

      {/* Education */}
      <div className="mt-2 text-sm">
        <p className="text-xs font-semibold text-gray-500">Education</p>
        <p
          dangerouslySetInnerHTML={{
            __html: highlight(c.education || "N/A", searchKeyword),
          }}
        />
      </div>

      {/* Buttons */}
      <div className="flex flex-wrap items-center gap-3 mt-4">

        <a
          href={`tel:${c.phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 bg-blue-500 text-white px-3 py-1 text-xs rounded-md"
        >
          <FaPhoneAlt /> Call
        </a>

        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${c.email}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 bg-gray-700 text-white px-3 py-1 text-xs rounded-md"
        >
          <FaEnvelope /> Email
        </a>

        <a
          href={`https://wa.me/${c.phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 bg-white text-green-700 border font-semibold px-3 py-1 text-xs rounded-md"
        >
          <FaWhatsapp /> WhatsApp
        </a>

        <a
          href={`https://www.linkedin.com/in/${c.phoneNumber}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 bg-white text-blue-700 border font-semibold px-3 py-1 text-xs rounded-md"
        >
          <FaLinkedin /> LinkedIn
        </a>

        {c.filePath && (
          <button
            onClick={() =>
              handleDownload(c.id, c.fullName, c.skills, c.experience)
            }
            className="flex items-center gap-1 bg-purple-600 text-white px-3 py-1 text-xs rounded-md"
          >
            <FaDownload /> CV
          </button>
        )}
      </div>

      {/* Dates */}
      <div className="flex justify-between text-xs text-gray-500 mt-4 border-t pt-2">
        <p>Created: {formatDate(c.createdDate)}</p>
        <p>Updated: {formatDate(c.updatedDate)}</p>
      </div>
    </div>
  );
};

export default CandidateCard;

import React from "react";

const CandidateDetailsModal = ({ candidate, onClose }) => {
  if (!candidate) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-lg w-full max-w-2xl p-6 relative animate-fadeIn">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-xl font-bold"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Candidate Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-gray-700">Full Name:</p>
            <p className="text-gray-800">{candidate.fullName}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Email:</p>
            <p className="text-gray-800">{candidate.email}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Phone Number:</p>
            <p className="text-gray-800">{candidate.phoneNumber}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Experience:</p>
            <p className="text-gray-800">{candidate.experience} years</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Company:</p>
            <p className="text-gray-800">{candidate.company}</p>
          </div>

          <div>
            <p className="font-semibold text-gray-700">Designation:</p>
            <p className="text-gray-800">{candidate.designation}</p>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold text-gray-700">Skills:</p>
            <p className="text-gray-800">{candidate.skills}</p>
          </div>

          <div className="md:col-span-2">
            <p className="font-semibold text-gray-700">Address:</p>
            <p className="text-gray-800">{candidate.address}</p>
          </div>

          {candidate.resumeUrl && (
            <div className="md:col-span-2">
              <p className="font-semibold text-gray-700">Resume:</p>
              <a
                href={candidate.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline"
              >
                View Resume
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CandidateDetailsModal;

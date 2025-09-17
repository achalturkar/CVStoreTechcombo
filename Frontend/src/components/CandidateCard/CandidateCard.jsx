
"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDownloadForOffline, MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";

const CandidateCard = () => {
  const [candidates, setCandidates] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async (page = 0) => {
    try {
      const response = await fetch(`${baseUrl}/api/candidate/all/${page}/10`);
      const data = await response.json();

      setCandidates(data.content);
      setTotalPages(data.totalPages);
      setPageNo(data.number);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    fetchData(0);
  }, []);

  const handleDownload = async (id, fullName, skills, experience) => {
    try {
      const response = await fetch(`${baseUrl}/api/candidate/download/${id}`, {
        method: "GET",
      });

      if (!response.ok) throw new Error("Failed to download file");

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `[Techcombo_${fullName}_${skills}_${experience}]`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to download CV.");
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this candidate?"
    );
    if (!confirmDelete) return;

    try {
      const response = await fetch(`${baseUrl}/api/candidate/delete/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Delete failed");

      alert("Candidate deleted successfully.");
      fetchData();
    } catch (error) {
      console.error("Delete error:", error);
      alert("Failed to delete candidate.");
    }
  };

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Candidate Profiles</h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-6">
        {candidates.map((each) => (
          <div
            key={each.id}
            className="bg-white shadow-lg rounded-2xl p-5 flex flex-col justify-between hover:shadow-2xl transition"
                // onClick={() => navigate(`/candidate/${each.id}`)}
          >
            {/* Candidate Info */}
            <div>
              {/* <div className="flex flex-col lg:flex-row "> */}
              <h2 className="text-xl font-semibold text-gray-800">
                {each.fullName}
              </h2>
              <p className="text-sm text-gray-600">{each.email}</p>
              <p className="text-sm text-gray-600">{each.phoneNumber}</p>

              {/* </div> */}

              <p className="mt-2">
                <span className="font-medium">Experience:</span>{" "}
                {each.experience || "N/A"}
              </p>
              <p>
                <span className="font-medium">Skills:</span>{" "}
                {each.skills
                  ? each.skills.split(",").slice(0, 5).join(", ") +
                    (each.skills.split(",").length > 5 ? " ..." : "")
                  : "N/A"}
              </p>
              <p>
                <span className="font-medium">Education:</span>{" "}
                {each.education ? each.education.split(",").slice(0,2).join(",") : "N/A"}
              </p>
              <p>
                <span className="font-medium">Company:</span>{" "}
                {each.company
                  ? each.company.split(",").slice(0, 2).join(", ")
                  : "N/A"}
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Added:{" "}
                {each.createdDate
                  ? new Date(each.createdDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })
                  : "N/A"}
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-around mt-4 border-t pt-2 text-2xl text-gray-700">
              <button
                title="Download CV"
                onClick={() =>
                  handleDownload(
                    each.id,
                    each.fullName,
                    each.skills,
                    each.experience
                  )
                }
                className="hover:text-blue-600"
              >
                <MdDownloadForOffline />
              </button>

              <button
                title="View Profile"
                onClick={() => navigate(`/candidate/${each.id}`)}
                className="hover:text-green-600"
              >
                <IoEyeSharp />
              </button>

              <button
                title="Update Profile"
                onClick={() => navigate(`/update/${each.id}`)}
                className="hover:text-yellow-600"
              >
                <FaEdit />
              </button>

              <button
                title="Delete Profile"
                onClick={() => handleDelete(each.id)}
                className="hover:text-red-600"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => fetchData(pageNo - 1)}
          disabled={pageNo === 0}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Previous
        </button>

        <span>
          Page {pageNo + 1} of {totalPages}
        </span>

        <button
          onClick={() => fetchData(pageNo + 1)}
          disabled={pageNo + 1 === totalPages}
          className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CandidateCard;

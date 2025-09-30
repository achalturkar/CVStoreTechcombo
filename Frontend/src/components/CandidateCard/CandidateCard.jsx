
"use client";
import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdDownloadForOffline, MdDelete } from "react-icons/md";
import { IoEyeSharp } from "react-icons/io5";
import { FaEdit } from "react-icons/fa";
import { handleDownload } from "../../utils/handleDownload";
import { handleDelete } from "../../utils/delete";
import Pagination from "../Common/Pagination/Pagination";

const CandidateCard = () => {
  const [candidates, setCandidates] = useState([]);
  const [pageNo, setPageNo] = useState(0);
  const [totalPages, setTotalPages] = useState(0);

  const navigate = useNavigate();
  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const fetchData = async (page= pageNo) => {
    try {
      const response = await fetch(`${baseUrl}/candidate/all/${page}/9`);
      const data = await response.json();

      setCandidates(data.content);
      setTotalPages(data.totalPages);
      setPageNo(data.number);
    } catch (error) {
      console.error("Error fetching candidates:", error);
    }
  };

  useEffect(() => {
    fetchData(pageNo);
  }, [pageNo]);



  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Candidate Profiles</h1>

      {/* Card Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {candidates.map((each) => (
          <div
            key={each.id}
            className="bg-white shadow-md rounded-2xl p-5 flex flex-col justify-between hover:shadow-xl transition"
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
                {each.education ? each.education.split(",").slice(0, 2).join(",") : "N/A"}
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
                  ? new Date(each.createdDate).toLocaleDateString("en-Uk", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit"
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
                onClick={() => handleDelete(each.id, fetchData)}
                className="hover:text-red-600"
              >
                <MdDelete />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}

      <Pagination page={pageNo} 
      totalPages={totalPages}
      onPageChange={newPage =>{setPageNo(newPage)}} />
    </div>
  );
};

export default CandidateCard;

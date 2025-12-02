import React, { useState } from "react";

export default function DeleteCandidates() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [skipCount, setSkipCount] = useState(0);
  const [result, setResult] = useState([]);
  const [message, setMessage] = useState("");

  const baseUrl = import.meta.env.VITE_API_BASE_URL;

  const convertDate = (dt) => dt.replace("T", " ");

  const fetchData = async () => {
    const url = `${baseUrl}/resume-data/range?startDate=${convertDate(startDate)}&endDate=${convertDate(
      endDate
    )}`;

    const res = await fetch(url);
    let data = await res.json();

    // implement skip logic
    if (skipCount > 0) {
      data = data.slice(skipCount);
    }

    setResult(data);
  };

  const deleteData = async () => {
    const url = `${baseUrl}/resume-data/range?startDate=${convertDate(startDate)}&endDate=${convertDate(
      endDate
    )}`;

    if (!window.confirm("Are you sure you want to delete these resumes?")) return;

    const res = await fetch(url, { method: "DELETE" });
    const text = await res.text();
    setMessage(text);
    setResult([]);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-gray-100 rounded-xl shadow-md mt-10">

      <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
        Delete Candidates (Date Range)
      </h2>

      {/* Date Selectors */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">

        <div>
          <label className="font-semibold text-gray-700">Start Date</label>
          <input
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg"
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">End Date</label>
          <input
            type="datetime-local"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="w-full p-2 mt-1 border rounded-lg"
          />
        </div>

        <div>
          <label className="font-semibold text-gray-700">Skip Candidates</label>
          <select
            className="w-full p-2 mt-1 border rounded-lg"
            value={skipCount}
            onChange={(e) => setSkipCount(parseInt(e.target.value))}
          >
            <option value="0">Show All</option>
            <option value="10">Skip 10</option>
            <option value="20">Skip 20</option>
            <option value="50">Skip 50</option>
            <option value="100">Skip 100</option>
            <option value="200">Skip 200</option>
            <option value="500">Skip 500</option>
          </select>
        </div>

      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mb-6">
        <button
          onClick={fetchData}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-md"
        >
          Show Data
        </button>

        <button
          onClick={deleteData}
          className="bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-md"
        >
          Delete Data
        </button>
      </div>

      {/* Message */}
      {message && <p className="text-green-700 font-semibold mb-4">{message}</p>}

      {/* Count */}
      {result.length > 0 && (
        <p className="text-gray-700 font-semibold mb-3">
          Showing <span className="text-blue-600">{result.length}</span> candidates
        </p>
      )}

      {/* Table */}
      {result.length > 0 && (
        <div className="overflow-auto border rounded-lg shadow-sm bg-white">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">ID</th>
                <th className="p-3">Full Name</th>
                <th className="p-3">Email</th>
                <th className="p-3">Phone</th>
                <th className="p-3">Uploaded</th>
              </tr>
            </thead>

            <tbody>
              {result.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="p-3">{item.id}</td>
                  <td className="p-3">{item.fullName}</td>
                  <td className="p-3">{item.email}</td>
                  <td className="p-3">{item.phoneNumber}</td>
                  <td className="p-3">{item.createdDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {result.length === 0 && (
        <p className="text-gray-500 text-center mt-4 text-sm">No candidates found.</p>
      )}
    </div>
  );
}

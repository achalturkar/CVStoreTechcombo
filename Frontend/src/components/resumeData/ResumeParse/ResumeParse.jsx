import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import {
  FaUpload,
  FaFilePdf,
  FaFileWord,
  FaChevronDown,
  FaChevronUp,
  FaArrowUp,
  FaExclamationTriangle,
} from "react-icons/fa";
import BackToTop from "../../common/BackToTop/BackToTp";

const MAX_FILES = 500;
const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const ACCEPTED_TYPES = [".pdf", ".docx"];

const ResumeParse = () => {
  const [files, setFiles] = useState([]);
  const [parsedData, setParsedData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [summary, setSummary] = useState(null);

  const [showFilesDropdown, setShowFilesDropdown] = useState(true);
  const [showParsedDropdown, setShowParsedDropdown] = useState(true);


  const baseUrl = import.meta.env.VITE_API_BASE_URL;


  // ---------------- FILE SELECT ----------------
  const handleFileChange = (e) => {
    setError(null);
    const selected = Array.from(e.target.files || []);

    if (selected.length === 0) return setFiles([]);

    if (selected.length > MAX_FILES) {
      setError(`Select at most ${MAX_FILES} files.`);
      return setFiles([]);
    }

    const validated = selected.map((f) => {
      const lower = f.name.toLowerCase();
      const extOk = ACCEPTED_TYPES.some((ext) => lower.endsWith(ext));
      const sizeOk = f.size <= MAX_FILE_SIZE;

      return {
        file: f,
        fileName: f.name,
        size: f.size,
        status: extOk && sizeOk ? "ready" : "invalid",
        validationMessage: !extOk
          ? "Invalid file type (only PDF & DOCX allowed)"
          : !sizeOk
          ? "File exceeds 2MB size limit"
          : "",
      };
    });

    setFiles(validated);
    setParsedData([]);
    setSummary(null);
  };

  // ---------------- UPLOAD ----------------
  const handleUpload = async () => {
    setError(null);

    const readyFiles = files.filter((f) => f.status === "ready");
    const invalidFiles = files.filter((f) => f.status !== "ready");

    if (readyFiles.length === 0)
      return setError("No valid files to upload.");

    const token = Cookies.get("jwtToken");
    if (!token) return setError("Session expired. Login again.");

    const formData = new FormData();
    readyFiles.forEach((f) => formData.append("files", f.file));

    setLoading(true);

    try {
      const resp = await fetch(`${baseUrl}/resume-data/parse-multiple-resumes`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!resp.ok) throw new Error("Server error: " + resp.status);

      const json = await resp.json();
      const serverDetails = json.details || [];

      const invalidDetails = invalidFiles.map((f) => ({
        fileName: f.fileName,
        status: "invalid",
        message: f.validationMessage,
      }));

      setParsedData([...invalidDetails, ...serverDetails]);
      setSummary(json.summary || null);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // ---------------- COMPONENT UI ----------------
  return (
    <div className="max-w-6xl mx-auto p-6 bg-white shadow-xl rounded-xl mt-8">

   
      <h2 className="text-xl font-bold text-gray-900  mb-6">
        Upload & Parse Multiple Resumes
      </h2>

         {/* ----- Upload Instructions ----- */}
      <p className="text-sm text-red-600 font-semibold mb-4">
        Allowed Files: PDF, DOCX — Max 500 files — 2MB per file — Recommended total max 500MB
      </p>


      <div className="flex flex-col md:flex-row items-center gap-4 mb-6">
        <input
          type="file"
          accept=".pdf,.docx"
          multiple
          onChange={handleFileChange}
          className="w-full md:w-2/3 p-3 border rounded"
        />

        <button
          onClick={handleUpload}
          disabled={loading}
          className={`flex items-center gap-2 px-4 py-2 rounded text-white font-semibold ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          <FaUpload />
          {loading ? "Uploading..." : "Upload & Parse"}
        </button>
      </div>

      {/* ERROR BAR */}
      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded mb-6">
          <FaExclamationTriangle className="inline mr-2" /> {error}
        </div>
      )}

      {/* SUMMARY CARDS */}
      {summary && (
        <div className="mt-6 grid grid-cols-2 md:grid-cols-5 gap-4">
          <SummaryCard title="Total" value={summary.total} color="blue" />
          <SummaryCard title="Saved" value={summary.success} color="green" />
          <SummaryCard title="Duplicate" value={summary.duplicates} color="yellow" />
          <SummaryCard title="Skipped" value={summary.skipped} color="red" />
          <SummaryCard title="Errors" value={summary.errors} color="red" />
        </div>
      )}

      {/* ---------------- SIDE-BY-SIDE DROPDOWN LAYOUT ---------------- */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">

        {/* LEFT - SELECTED FILES */}
        {files.length > 0 && (
          <Dropdown
            title={`Selected Files (${files.length})`}
            open={showFilesDropdown}
            onToggle={() => setShowFilesDropdown(!showFilesDropdown)}
          >
            {files.map((f, i) => (
              <div key={i} className="flex items-center gap-3 p-2 border rounded mb-2">
                <div className="text-xl">
                  {f.fileName.endsWith(".pdf") ? (
                    <FaFilePdf className="text-red-600" />
                  ) : (
                    <FaFileWord className="text-blue-600" />
                  )}
                </div>

                <div className="flex-1">
                  <div className="font-medium text-sm">{f.fileName}</div>
                  <div className="text-xs text-gray-500">
                    {(f.size / 1024).toFixed(1)} KB
                  </div>
                  {f.validationMessage && (
                    <div className="text-xs text-red-600 mt-1">
                      {f.validationMessage}
                    </div>
                  )}
                </div>

                <span
                  className={`text-sm font-semibold ${
                    f.status === "ready" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {f.status.toUpperCase()}
                </span>
              </div>
            ))}
          </Dropdown>
        )}

        {/* RIGHT - PARSED RESULTS */}
        {parsedData.length > 0 && (
          <Dropdown
            title={`Parsed Results (${parsedData.length})`}
            open={showParsedDropdown}
            onToggle={() => setShowParsedDropdown(!showParsedDropdown)}
          >
            {parsedData.map((d, i) => {
              const status = (d.status || "").toLowerCase();
              let bg =
                status === "saved"
                  ? "bg-green-50"
                  : status === "duplicate"
                  ? "bg-yellow-50"
                  : "bg-red-50";

              return (
                <div key={i} className={`p-3 border rounded mb-2 ${bg}`}>
                  <div className="flex justify-between font-semibold">
                    <span>{d.fileName}</span>
                    <span className="uppercase">{d.status}</span>
                  </div>

                  {d.message && (
                    <div className="text-sm text-gray-700 mt-2">{d.message}</div>
                  )}

                  <ul className="mt-2 text-sm grid grid-cols-1 md:grid-cols-2 gap-1">
                    {Object.entries(d).map(([k, v]) =>
                      ["fileName", "status", "message"].includes(k) ? null : (
                        <li key={k}>
                          <strong>{k}:</strong> {v || "N/A"}
                        </li>
                      )
                    )}
                  </ul>
                </div>
              );
            })}
          </Dropdown>
        )}
      </div>

      {/* BUTTON TO CV SEARCH */}
      {parsedData.length > 0 && (
        <div className="mt-6 text-center">
          <a
            href="/search"
            className="bg-gray-800 text-white px-4 py-2 rounded hover:bg-black"
          >
            Go to CV Search
          </a>
        </div>
      )}

      {/* FLOATING BACK-TO-TOP BUTTON */}
     <BackToTop/>
    </div>
  );
};

export default ResumeParse;

/* ---------------- DROPDOWN COMPONENT ---------------- */
const Dropdown = ({ title, open, onToggle, children }) => (
  <div className="border rounded shadow-sm">
    <button
      onClick={onToggle}
      className="w-full flex justify-between items-center p-3 bg-gray-100 hover:bg-gray-200 font-semibold"
    >
      {title}
      {open ? <FaChevronUp /> : <FaChevronDown />}
    </button>

    {open && <div className="p-3 animate-fadeIn">{children}</div>}
  </div>
);

/* ---------------- SUMMARY CARD ---------------- */
const SummaryCard = ({ title, value, color }) => {
  const styles = {
    blue: "bg-blue-50 text-blue-800 border-blue-300",
    green: "bg-green-50 text-green-800 border-green-300",
    yellow: "bg-yellow-50 text-yellow-800 border-yellow-300",
    red: "bg-red-50 text-red-800 border-red-300",
  };

  return (
    <div className={`p-3 text-center border rounded ${styles[color]}`}>
      <div className="text-xs uppercase">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
};

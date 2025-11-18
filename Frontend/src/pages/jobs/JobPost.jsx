import React, { useState } from "react";

const JobPost = () => {
  const [job, setJob] = useState({
    title: "",
    company: "",
    location: "",
    type: "",
    experience: "",
    salary: "",
    skills: "",
    description: "",
  });

  const handleChange = (e) => {
    setJob({ ...job, [e.target.name]: e.target.value });
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* LEFT — JOB POST FORM */}
        <div className="bg-white p-6 rounded-xl shadow-lg border">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Post a New Job</h2>

          <div className="space-y-4">
            <InputField label="Job Title" name="title" value={job.title} onChange={handleChange} />
            <InputField label="Company Name" name="company" value={job.company} onChange={handleChange} />
            <InputField label="Location" name="location" value={job.location} onChange={handleChange} />

            {/* Job Type */}
            <div>
              <label className="text-sm font-semibold">Job Type</label>
              <select
                name="type"
                value={job.type}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1"
              >
                <option value="">Select Type</option>
                <option>Full Time</option>
                <option>Part Time</option>
                <option>Remote</option>
                <option>Internship</option>
              </select>
            </div>

            <InputField label="Experience (e.g. 2+ Years)" name="experience" value={job.experience} onChange={handleChange} />
            <InputField label="Salary (Optional)" name="salary" value={job.salary} onChange={handleChange} />
            <InputField label="Skills (comma-separated)" name="skills" value={job.skills} onChange={handleChange} />

            {/* Description */}
            <div>
              <label className="text-sm font-semibold">Job Description</label>
              <textarea
                name="description"
                value={job.description}
                onChange={handleChange}
                className="w-full p-2 border rounded mt-1 h-24"
                placeholder="Write job details..."
              ></textarea>
            </div>

            {/* Submit button */}
            <button className="w-full bg-blue-600 text-white py-3 rounded-lg shadow hover:bg-blue-700">
              Post Job
            </button>
          </div>
        </div>

        {/* RIGHT — LIVE PREVIEW */}
        <div className="bg-white p-6 rounded-xl shadow-lg border h-fit sticky top-10">
          <h2 className="text-xl font-bold mb-4 text-gray-800">Preview Job Post</h2>

          <div className="space-y-4">
            {/* Title */}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {job.title || "Job Title Appears Here"}
              </h1>
              <p className="text-gray-600 mt-1">{job.company || "Company Name"}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-gray-700">
              <Info label="📍 Location" value={job.location || "Not specified"} />
              <Info label="💼 Type" value={job.type || "Not selected"} />
              <Info label="⏳ Experience" value={job.experience || "Not mentioned"} />
              <Info label="💰 Salary" value={job.salary || "Not provided"} />
            </div>

            {/* Skills */}
            <div>
              <h3 className="font-semibold mb-1">Skills Required:</h3>
              <div className="flex flex-wrap gap-2">
                {(job.skills
                  ? job.skills.split(",").map((s) => s.trim())
                  : ["React", "JavaScript", "HTML"])
                .map((skill, i) => (
                  <span
                    key={i}
                    className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="font-semibold mb-1">Job Description:</h3>
              <p className="text-gray-700 leading-relaxed">
                {job.description || "Job description will appear here when you type."}
              </p>
            </div>

            {/* Fake Button */}
            <div className="mt-4">
              <button className="bg-gray-900 text-white px-6 py-3 rounded-lg w-full">
                Apply Now (Preview Only)
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobPost;

/* -------------------- REUSABLE INPUT FIELD -------------------- */
const InputField = ({ label, name, value, onChange }) => (
  <div>
    <label className="text-sm font-semibold">{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      className="w-full p-2 border rounded mt-1"
      placeholder={label}
    />
  </div>
);

/* -------------------- PREVIEW INFO SMALL BOX -------------------- */
const Info = ({ label, value }) => (
  <p className="text-sm bg-gray-100 p-2 rounded border">
    <strong>{label}:</strong> {value}
  </p>
);

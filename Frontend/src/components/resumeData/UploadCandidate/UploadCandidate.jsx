import React, { useState } from "react";
import Cookies from "js-cookie";

const UploadCandidate = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    designation: "",
    company: "",
    experience: "",
    skills: "",
    address: "",
    file: null,
  });

  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const token = Cookies.get("jwtToken");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));

    try {
      const response = await fetch(`${baseUrl}/resume-data/upload`, {
        method: "POST",
        headers: {
          authorization: `Bearer ${token}`,
        },
        body: data,
      });

      if (response.ok) {
        alert("✅ Candidate uploaded successfully!");
        setFormData({
          fullName: "",
          email: "",
          phoneNumber: "",
          designation: "",
          company: "",
          experience: "",
          skills: "",
          address: "",
          file: null,
        });
        document.getElementById("file").value = "";
      } else {
        alert("❌ Failed to upload candidate. Please try again.");
      }
    } catch (error) {
      console.error("Upload error:", error);
      alert("⚠️ An error occurred. Please check the console for details.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-100 mb-6 md:p-6">
      <div className="w-full max-w-4xl bg-white shadow-xl rounded-2xl overflow-hidden border border-gray-100">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-6">
          <h1 className="text-2xl font-bold uppercase tracking-wide">
            Upload New Candidate
          </h1>
          <p className="text-sm text-blue-100 mt-1">
            Fill in the details to add a new candidate manually
          </p>
        </div>

        {/* Form */}
        <form
          className="px-6 md:px-10 py-4 grid grid-cols-1 md:grid-cols-2 gap-4"
          onSubmit={handleSubmit}
        >
          {/* Input Field Component */}
          {[
            { label: "Full Name", name: "fullName", type: "text" },
            { label: "Email", name: "email", type: "email" },
            { label: "Phone Number", name: "phoneNumber", type: "number" },
            { label: "Designation", name: "designation", type: "text" },
            { label: "Company", name: "company", type: "text" },
          ].map((field) => (
            <div key={field.name} className="flex flex-col">
              <label
                htmlFor={field.name}
                className="text-gray-700 font-semibold mb-2"
              >
                {field.label} <span className="text-red-500">*</span>
              </label>
              <input
                id={field.name}
                name={field.name}
                type={field.type}
                value={formData[field.name]}
                onChange={handleChange}
                required
                className="p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
              />
            </div>
          ))}

          {/* Experience */}
          <div className="flex flex-col">
            <label htmlFor="experience" className="text-gray-700 font-semibold mb-2">
              Experience (Years) <span className="text-red-500">*</span>
            </label>
            <select
              id="experience"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
            >
              <option value="">Select</option>
              {[...Array(20).keys()].map((num) => (
                <option key={num + 1} value={num + 1}>
                  {num + 1}
                </option>
              ))}
              <option value="20+">20+</option>
            </select>
          </div>

          {/* Skills */}
          <div className="flex flex-col">
            <label htmlFor="skills" className="text-gray-700 font-semibold mb-2">
              Skills <span className="text-red-500">*</span>
            </label>
            <input
              id="skills"
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all"
            />
          </div>

          {/* Address */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="address" className="text-gray-700 font-semibold mb-2">
              Address <span className="text-red-500">*</span>
            </label>
            <textarea
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              rows="2"
              className="p-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-300 outline-none transition-all resize-none"
            ></textarea>
          </div>

          {/* Resume Upload */}
          <div className="flex flex-col md:col-span-2">
            <label htmlFor="file" className="text-gray-700 font-semibold mb-2">
              Resume File <span className="text-red-500">*</span>
            </label>
            <input
              type="file"
              id="file"
              name="file"
              onChange={handleFileChange}
              accept="application/pdf"
              required
              className="block w-full text-gray-700 border border-gray-300 rounded-lg p-3 cursor-pointer bg-gray-50 hover:bg-gray-100 transition-all"
            />
            <p className="text-sm text-gray-500 mt-1">Only PDF files allowed</p>
          </div>

          {/* Submit Button */}
          <div className="md:col-span-2 flex justify-center mt-6">
            <button
              type="submit"
              className="px-10 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
            >
              Submit Candidate
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadCandidate;

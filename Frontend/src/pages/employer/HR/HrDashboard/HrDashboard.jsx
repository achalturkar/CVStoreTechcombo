import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  ResponsiveContainer,
} from "recharts";

const HrDashboard = () => {
  const [totalResumes, setTotalResumes] = useState(0); // API Value
  const parsedResumes = 980; // Static
  const pending = totalResumes - parsedResumes;

    const baseUrl = import.meta.env.VITE_API_BASE_URL;


  // Fetch only TOTAL COUNT from API
  useEffect(() => {
    axios
      .get(`${baseUrl}/resume-data/count`)
      .then((res) => setTotalResumes(res.data))
      .catch((err) => console.log("Error fetching total resumes:", err));
  }, []);

  // Weekly Resume Upload Data (Static)
  const weeklyData = [
    { week: "Mon", count: 40 },
    { week: "Tue", count: 55 },
    { week: "Wed", count: 70 },
    { week: "Thu", count: 50 },
    { week: "Fri", count: 85 },
    { week: "Sat", count: 30 },
    { week: "Sun", count: 20 },
  ];

  // Technology Wise Candidates (Static)
  const techData = [
    { name: "Java", value: 320 },
    { name: "Oracle", value: 220 },
    { name: "React", value: 150 },
    { name: "Python", value: 180 },
    { name: "PHP", value: 110 },
  ];

  const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#A020F0"];

  return (
    <div className="p-6">
      {/* Top Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white border rounded-lg p-5 shadow">
          <h2 className="text-gray-700 text-sm font-medium">Total Resumes</h2>
          <p className="text-3xl font-bold mt-2">{totalResumes}</p>
        </div>

        <div className="bg-white border rounded-lg p-5 shadow">
          <h2 className="text-gray-700 text-sm font-medium">Parsed Resumes</h2>
          <p className="text-3xl font-bold mt-2">{parsedResumes}</p>
        </div>

        <div className="bg-white border rounded-lg p-5 shadow">
          <h2 className="text-gray-700 text-sm font-medium">Pending</h2>
          <p className="text-3xl font-bold mt-2">{pending >= 0 ? pending : 0}</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Uploads */}
        <div className="bg-white border rounded-lg p-5 shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Weekly Resume Uploads
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#4F46E5" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Technology-wise Distribution */}
        <div className="bg-white border rounded-lg p-5 shadow">
          <h2 className="text-lg font-semibold mb-4 text-gray-800">
            Candidates by Technology
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={techData}
                cx="50%"
                cy="50%"
                outerRadius={110}
                dataKey="value"
                label
              >
                {techData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default HrDashboard;

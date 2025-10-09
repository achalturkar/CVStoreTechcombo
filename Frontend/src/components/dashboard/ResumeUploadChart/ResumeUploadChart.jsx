import React, { useState, useEffect } from "react";
import {
  LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer,
  ComposedChart,
  Bar
} from "recharts";
import Cookies from "js-cookie";

const ResumeUploadChart = () => {
  const [data, setData] = useState([]);
  const [filter, setFilter] = useState("daily");

  const token = Cookies.get("jwtToken");


  useEffect(() => {
  fetch(`/candidate/visuals?filter=${filter}`,{
    method: "GET",
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .then((json) => {
      const formatted = (Array.isArray(json) ? json : [json]).map(item => {
        const d = new Date(item.date.replace(" ", "T")); 
        let label;

        if (filter === "daily") {
          label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        } else if (filter === "weekly") {
          const weekStart = new Date(d);
          weekStart.setDate(d.getDate() - d.getDay());
          const weekEnd = new Date(weekStart);
          weekEnd.setDate(weekStart.getDate() + 6);
          label = `${weekStart.toLocaleDateString("en-US", { month: "short", day: "numeric" })} - ${weekEnd.toLocaleDateString("en-US", { day: "numeric" })}`;
        } else if (filter === "monthly") {
          label = d.toLocaleDateString("en-US", { month: "short", year: "numeric" });
        }

        return { count: item.count, date: label };
      });

      console.log("Formatted data:", formatted);
      setData(formatted);
    });
}, [filter]);



  return (
    <div className="p-4 bg-white rounded-2xl shadow w-1/2">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Resume Uploads ({filter})</h2>
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="border rounded p-1"
        >
          <option value="daily">Daily</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

    <ResponsiveContainer width="100%" height={300}>
  <ComposedChart data={data}>
    <CartesianGrid strokeDasharray="3 3" />
    <XAxis dataKey="date" />
    <YAxis allowDecimals={false} />
    <Tooltip />
    <Bar dataKey="count" barSize={20} fill="#60A5FA" />
    <Line type="monotone" dataKey="count" stroke="#4F46E5" />
  </ComposedChart>
</ResponsiveContainer>

    </div>
  );
};

export default ResumeUploadChart;

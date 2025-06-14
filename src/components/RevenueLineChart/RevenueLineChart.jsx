import React, { useEffect, useState } from "react";
import axios from "axios";
import Paper from "@mui/material/Paper";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const RevenueLineChart = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenue = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:8080/api/v1/Teacher/getRevenue/Courses",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCourses(response.data.data.courses || []);
      } catch (error) {
        console.error("Error fetching revenue data:", error.response?.data || error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRevenue();
  }, []);

  return (
    <Paper
      sx={{
        p: 3,
        maxWidth: 900,
        mx: "auto",
        mt: 5,
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <h2 style={{ marginBottom: 24, fontWeight: "bold", fontSize: 24 }}>
        📈 Course Revenue (Line Chart)
      </h2>

      {loading ? (
        <p style={{ color: "#888" }}>Loading data...</p>
      ) : (
        <ResponsiveContainer width="100%" height={350}>
          <LineChart
            data={courses}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="courseName" />
            <YAxis allowDecimals={false} />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              name="Revenue"
              stroke="#1976d2"
              strokeWidth={3}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </Paper>
  );
};

export default RevenueLineChart;
import React, { useEffect, useState } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { PieChart, Pie, Cell } from "recharts";

import { Chip } from "@mui/material";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const CourseStatisticsTable = () => {
  const [courseStats, setCourseStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [courseStatusStats, setCourseStatusStats] = useState({
    totalApproved: 0,
    totalPending: 0,
    totalRejected: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "http://localhost:8080/api/v1/Teacher/getStatistics/Courses",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("📦 Data from API:", response.data);

        const data = response.data?.data;
        const stats = data?.listCourseStatistics;

        if (Array.isArray(stats)) {
          setCourseStats(stats);

          // Update data for pie chart
          setCourseStatusStats({
            totalApproved: data?.totalapprovedCourse || 0,
            totalPending: data?.totalPendingCourse || 0,
            totalRejected: data?.totalRejectCourse || 0,
          });
        } else {
          console.warn("❗ listCourseStatistics is not an array:", stats);
          setCourseStats([]);
          setCourseStatusStats({
            totalApproved: 0,
            totalPending: 0,
            totalRejected: 0,
          });
        }
      } catch (error) {
        console.error(
          "Error fetching statistics data:",
          error.response?.data || error.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
        📊 Student Statistics by Course
      </h2>
      {loading ? (
        <p style={{ color: "#888" }}>Loading data...</p>
      ) : (
        <>
          <TableContainer>
            <Table aria-label="course statistics table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Course Name</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>New Students</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Growth</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Warning</strong>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {courseStats.map((course, idx) => (
                  <TableRow
                    key={idx}
                    sx={{
                      backgroundColor: course.warning
                        ? "rgba(255, 0, 0, 0.1)"
                        : "inherit",
                    }}
                  >
                    <TableCell>{course.courseName}</TableCell>
                    <TableCell align="center">{course.newStudents}</TableCell>
                    <TableCell
                      align="center"
                      sx={{ color: course.growth > 0 ? "green" : "inherit" }}
                    >
                      {course.growth > 0 ? `+${course.growth}` : course.growth}
                    </TableCell>
                    <TableCell align="center">
                      {course.warning ? (
                        <Chip label="Warning" color="error" variant="outlined" />
                      ) : (
                        <Chip label="Stable" variant="outlined" />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {/* --- Bar Chart comparing new students & previous month students --- */}
          <h3
            style={{
              marginTop: 40,
              marginBottom: 20,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            📈 Comparison of New Students & Previous Month Students by Course
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={courseStats}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="courseName" />
              <YAxis allowDecimals={false} />
              <Tooltip />
              <Legend />
              <Bar dataKey="newStudents" name="New Students" fill="#1976d2" />
              <Bar
                dataKey="prevMonthStudents"
                name="Previous Month Students"
                fill="#9e9e9e"
              />
            </BarChart>
          </ResponsiveContainer>
          {/* --- Pie Chart: Course status distribution --- */}
          <h3
            style={{
              marginTop: 50,
              marginBottom: 20,
              fontWeight: "bold",
              fontSize: 20,
            }}
          >
            🧮 Course Status Distribution
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={[
                  { name: "Approved", value: courseStatusStats.totalApproved },
                  { name: "Pending", value: courseStatusStats.totalPending },
                  { name: "Rejected", value: courseStatusStats.totalRejected },
                ]}
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                <Cell fill="#4caf50" /> {/* Approved - green */}
                <Cell fill="#ffc107" /> {/* Pending - yellow */}
                <Cell fill="#f44336" /> {/* Rejected - red */}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </>
      )}
    </Paper>
  );
};

export default CourseStatisticsTable;

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
          setCourseStats([]);
          setCourseStatusStats({
            totalApproved: 0,
            totalPending: 0,
            totalRejected: 0,
          });
        }
      } catch (error) {
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
        📊 Thống kê sinh viên theo khóa học
      </h2>
      {loading ? (
        <p style={{ color: "#888" }}>Đang tải dữ liệu..."</p>
      ) : (
        <>
          <TableContainer>
            <Table aria-label="course statistics table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Tên khóa học</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Học sinh mới</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Tăng trưởng</strong>
                  </TableCell>
                  <TableCell align="center">
                    <strong>Cảnh báo</strong>
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
                        <Chip label="Cảnh báo" color="error" variant="outlined" />
                      ) : (
                        <Chip label="Ổn định" variant="outlined" />
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
            📈 So sánh số sinh viên mới và sinh viên của tháng trước theo khóa học
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
              <Bar dataKey="newStudents" name="Sinh viên mới" fill="#1976d2" />
              <Bar
                dataKey="prevMonthStudents"
                name="Sinh viên của tháng trước"
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
            🧮 Phân bố trạng thái khóa học
          </h3>

          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={true}
                data={[
                  { name: "Đã duyệt", value: courseStatusStats.totalApproved },
                  { name: "Chờ duyệt", value: courseStatusStats.totalPending },
                  { name: "Từ chối", value: courseStatusStats.totalRejected },
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

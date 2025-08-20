import React from "react";
import { useNavigate } from "react-router-dom";
import CourseStatisticsTable from "../CourseStatisticsTable/CourseStatisticsTable";
import RevenueLineChart from "../../components/RevenueLineChart/RevenueLineChart";
import { Button, Box } from "@mui/material";

function DashboardTeacher() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        backgroundColor: "#f5f7fa", // light soft background
        minHeight: "100vh",
        padding: 4,
      }}
    >
      <Button
        variant="outlined"
        onClick={() => navigate(-1)} // go back to previous page
        sx={{ mb: 3 }}
      >
        Quay lại
      </Button>

      {/* Course statistics table (MUI) */}
      <CourseStatisticsTable />

      {/* Revenue line chart */}
      <RevenueLineChart />
    </Box>
  );
}

export default DashboardTeacher;

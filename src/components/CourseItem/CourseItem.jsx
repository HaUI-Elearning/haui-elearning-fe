import { useEffect, useState } from "react";
import { Container, Typography } from "@mui/material";
import Course from "../Course/Course";
import SkeletonList from "./CourseItemSkeleton";
import axios from "axios";

const CourseItem = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  const loadAllCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get(
        "http://localhost:8080/api/v1/courses/categorycourse",
        accessToken
          ? {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          : {}
      );

      setCourses(res.data.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllCourses();
  }, []);

  if (loading) {
    return <SkeletonList />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        What to learn next?
      </Typography>
      <Course courses={courses} />
    </Container>
  );
};

export default CourseItem;

import React, { useEffect, useState } from "react";
import axios from "axios";
import RenderStar from "../../components/Course/RenderStar/RenderStar";
import math from '../../assets/images/maths.png';
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CourseListTeacher.scss";

const CourseListTeacher = () => {
  const [courses, setCourses] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const token = localStorage.getItem("accessToken")?.trim();

  const fetchCourses = () => {
    if (!token) {
      console.error("No access token found, redirecting to login...");
      window.location.href = "/login";
      return;
    }

    axios
      .get("http://localhost:8080/api/v1/Teacher/getAll/Courses", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setCourses(res.data.data || []);
      })
      .catch((err) => {
        console.error("API error:", err.response?.data || err.message);
        if (err.response?.status === 401) {
          window.location.href = "/login";
        }
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleMenuClick = (event, courseId) => {
    setAnchorEl(event.currentTarget);
    setSelectedCourseId(courseId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedCourseId(null);
  };

  const handleMenuAction = (action, courseId) => {
    switch (action) {
      case "edit":
        console.log(`Chỉnh sửa khóa học ${courseId}`);
        break;
      case "delete":
        handleDeleteCourse(courseId);
        break;
      case "view":
        console.log(`Xem chi tiết khóa học ${courseId}`);
        break;
      default:
        break;
    }
    handleMenuClose();
  };

  const handleDeleteCourse = async (courseId) => {
    const confirmed = window.confirm("Bạn có chắc muốn xóa khóa học này?");
    if (!confirmed) return;

    try {
      await axios.delete(`http://localhost:8080/api/v1/Teacher/Course/delete/${courseId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Cập nhật lại danh sách sau khi xóa
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.courseId !== courseId)
      );

      toast.success("Xóa khóa học thành công!");
    } catch (err) {
      console.error("Lỗi khi xóa khóa học:", err.response?.data || err.message);
      toast.error("Không thể xóa khóa học. Vui lòng thử lại!");
    }
  };

  return (
    <div className="course-list">
      <ToastContainer position="top-right" autoClose={3000} />
      {courses.length > 0 ? (
        courses.map((course) => (
          <Card key={course.courseId} className="course-card">
            <CardMedia
              component="img"
              height="140"
              image={course.thumbnail}
              alt={course.name}
              className="course-img"
            />
            <div className="content">
              <CardContent className="course-info">
                <Typography variant="h6" className="course-title">
                  {course.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" className="course-author">
                  {course.author}
                </Typography>
                <Box>
                  <RenderStar numStars={course.star}></RenderStar>
                </Box>
              </CardContent>
              <IconButton
                aria-label="more"
                onClick={(event) => handleMenuClick(event, course.courseId)}
              >
                <MoreVertIcon />
              </IconButton>
            </div>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedCourseId === course.courseId}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={() => handleMenuAction("edit", course.courseId)}>Chỉnh sửa</MenuItem>
              <MenuItem onClick={() => handleMenuAction("delete", course.courseId)}>Xóa</MenuItem>
              <MenuItem onClick={() => handleMenuAction("view", course.courseId)}>Xem chi tiết</MenuItem>
            </Menu>
          </Card>
        ))
      ) : (
        <div className="box-not-courses">
          <div className="not-courses">
            <img src={math} alt="" />
          </div>
          <p>Hiện tại chưa có khoá học nào!!</p>
        </div>
      )}
    </div>
  );
};

export default CourseListTeacher;

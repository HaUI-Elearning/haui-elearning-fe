import React, { useEffect, useState } from "react";
import axios from "axios";
import RenderStar from "../../components/Course/RenderStar/RenderStar";
import math from "../../assets/images/maths.png";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import CancelIcon from "@mui/icons-material/Cancel";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CourseListTeacher.scss";
import { useNavigate } from "react-router-dom";

const CourseListTeacher = () => {
  const [courses, setCourses] = useState([]);
  const [anchorEl, setAnchorEl] = useState(null);
  const [openParticipantsDialog, setOpenParticipantsDialog] = useState(false);
  const [participants, setParticipants] = useState([]);
  const [loadingParticipants, setLoadingParticipants] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const token = localStorage.getItem("accessToken")?.trim();
  const navigate = useNavigate();

  const fetchParticipants = async (courseId) => {
    try {
      setLoadingParticipants(true);
      const token = localStorage.getItem("accessToken");
      const res = await axios.get(
        `http://localhost:8080/api/v1/Teacher/getParticipants/${courseId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      // res.data.data là mảng participants như:
      // [{ name: "...", joinDate: [2025,6,10,13,25,22] }, ...]
      setParticipants(res.data.data || []);
      setOpenParticipantsDialog(true);
    } catch (err) {
      console.error(
        "Lỗi khi lấy danh sách học viên:",
        err.response?.data || err.message
      );
      toast.error("Không thể tải danh sách học viên.");
    } finally {
      setLoadingParticipants(false);
    }
  };
  const handleCloseParticipantsDialog = () => {
    setOpenParticipantsDialog(false);
    setParticipants([]);
  };

  const fetchCourses = () => {
    if (!token) {
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
        navigate(`/chapter/${courseId}`);
        break;
      case "delete":
        handleDeleteCourse(courseId);
        break;
      case "view":
        navigate(`/courses/${courseId}`);
        break;
      default:
        break;
    }
    handleMenuClose();
  };

  const handleDeleteCourse = async (courseId) => {
    const confirmed = window.confirm("Bạn có chắc chắn muốn xóa khóa học này không?");
    if (!confirmed) return;

    try {
      await axios.delete(
        `http://localhost:8080/api/v1/Teacher/Course/delete/${courseId}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );

      // Cập nhật lại danh sách sau khi xóa
      setCourses((prevCourses) =>
        prevCourses.filter((course) => course.courseId !== courseId)
      );

      toast.success("Xóa khóa học thành công!");
    } catch (err) {
      console.error("Lỗi khi xóa khóa học:", err.response?.data || err.message);
      toast.error("Không thể xóa khóa học.");
    }
  };

  return (
    <div className="course-list">
      
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
                <Typography
                  variant="body2"
                  color="text.secondary"
                  className="course-author"
                >
                  {course.author}
                </Typography>
                <Box>
                  <RenderStar numStars={course.star}></RenderStar>
                </Box>
                <Box display="flex" alignItems="center" lineHeight={1}>
                  {/* Số lượt bán + icon người */}
                  <PersonIcon fontSize="medium" color="action" />
                  <Typography
                    variant="subtitle1"
                    color="text.secondary"
                    fontWeight="bold"
                    sx={{ mt: "5px", ml: 0.5 }}
                  >
                    {course.sold}
                  </Typography>

                  {/* Icon trạng thái, tách biệt với bên trái */}
                </Box>
              </CardContent>
              <div className="menu-content">
                <IconButton
                  aria-label="more"
                  onClick={(event) => handleMenuClick(event, course.courseId)}
                >
                  <MoreVertIcon />
                </IconButton>
                <Box ml={4} sx={{ mt: "5px", ml: 1 }}>
                  {course.approvalStatus === "approved" && (
                    <CheckCircleIcon color="success" />
                  )}
                  {course.approvalStatus === "pending" && (
                    <HourglassEmptyIcon color="warning" />
                  )}
                  {course.approvalStatus === "rejected" && (
                    <CancelIcon color="error" />
                  )}
                </Box>
              </div>
            </div>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl) && selectedCourseId === course.courseId}
              onClose={handleMenuClose}
            >
              <MenuItem
                onClick={() => handleMenuAction("edit", course.courseId)}
              >
                Chỉnh Sửa
              </MenuItem>
              <MenuItem
                onClick={() => handleMenuAction("delete", course.courseId)}
              >
                Xóa Khóa Học
              </MenuItem>
              
              {course.approvalStatus === "approved" && (
                <MenuItem
                onClick={() => handleMenuAction("view", course.courseId)}
              >
                xem chi tiết
              </MenuItem>
              )}
              {course.approvalStatus === "approved" && (
                <MenuItem
                  onClick={() => {
                    fetchParticipants(course.courseId);
                    handleMenuClose();
                  }}
                >
                  Danh Sách Học Viên
                </MenuItem>
              )}
            </Menu>
          </Card>
        ))
      ) : (
        <div className="box-not-courses">
          <div className="not-courses">
            <img src={math} alt="" />
          </div>
          <p>Hiện tại không có khóa học nào!!</p>
        </div>
      )}
      {/* … sau khi render danh sách courses hết */}
{ /* Dialog hiển thị danh sách người học */ }
<Dialog
  open={openParticipantsDialog}
  onClose={handleCloseParticipantsDialog}
  fullWidth
  maxWidth="md"
>
  <DialogTitle>Danh sách người học</DialogTitle>
  <DialogContent dividers>
    {loadingParticipants ? (
      <Box display="flex" justifyContent="center" my={2}>
        <CircularProgress />
      </Box>
    ) : participants.length > 0 ? (
      <TableContainer component={Paper}>
        <Table aria-label="participants table">
          <TableHead>
            <TableRow>
              <TableCell><strong>Tên</strong></TableCell>
              <TableCell align="center"><strong>Thời gian đăng ký</strong></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {participants.map((p, idx) => {
              const [y, m, d, hh, mm, ss] = p.joinDate;
              const dateObj = new Date(y, m - 1, d, hh, mm, ss);
              const formatted = dateObj.toLocaleString("vi-VN", {
                year: "numeric",
                month: "2-digit",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
              });
              return (
                <TableRow key={idx}>
                  <TableCell>{p.name}</TableCell>
                  <TableCell align="center">{formatted}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Typography>Chưa có sinh viên nào.</Typography>
    )}
  </DialogContent>
  <DialogActions>
    <Button onClick={handleCloseParticipantsDialog} color="primary">
      Đóng
    </Button>
  </DialogActions>
</Dialog>

    </div>
  );
};

export default CourseListTeacher;

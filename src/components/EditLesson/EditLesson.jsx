import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import toast from "react-hot-toast";
import axios from "axios";
import bgImage from "../../assets/images/b2.jpg";

const EditLesson = () => {
  const {chapterId, lessonId } = useParams(); // lấy id bài học từ url param
  const navigate = useNavigate();
  console.log(chapterId, lessonId); 

  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingData, setLoadingData] = useState(true);

  // Load dữ liệu bài học khi component mount
  useEffect(() => {
    const fetchLesson = async () => {
      try {
        setLoadingData(true);
        const token = localStorage.getItem("accessToken");
        const res = await axios.get(
          `http://localhost:8080/api/v1/Teacher/getlesson/${chapterId}/${lessonId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const data = res.data.data;
        setTitle(data.title || "");
        setPosition(data.position?.toString() || "");
        // Lưu ý: videoFile, pdfFile không thể set trực tiếp từ file,
        // nếu bạn muốn show tên file, có thể dùng data.videoFileName hoặc tương tự nếu có
        setLoadingData(false);
      } catch (error) {
        console.error("Fetch lesson failed:", error);
        toast.error("Lấy dữ liệu bài học thất bại");
        setLoadingData(false);
        
      }
    };
    fetchLesson();
  }, [lessonId, navigate]);

  const handleSubmit = async () => {
    if (!title.trim() || !position.trim()) {
      toast.error("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    if (isNaN(Number(position)) || Number(position) < 1) {
      toast.error("Vị trí bài học phải là số nguyên dương.");
      return;
    }

    const formData = new FormData();
    formData.append("chapterId", chapterId);
    formData.append("title", title);
    formData.append("Position", Number(position));
    if (videoFile) formData.append("videoFile", videoFile);
    if (pdfFile) formData.append("pdfFile", pdfFile);

    try {
      setLoading(true);
      const token = localStorage.getItem("accessToken");
      await axios.put(
        `http://localhost:8080/api/v1/Teacher/Lesson/update/${lessonId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Cập nhật bài học thành công!");
      navigate(-1);
    } catch (error) {
      toast.error(error.response?.data?.message || "Cập nhật thất bại");
    } finally {
      setLoading(false);
    }
  };

  if (loadingData) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundImage: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          zIndex: 1,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          zIndex: 2,
        }}
      />
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        px={2}
        sx={{ position: "relative", zIndex: 3 }}
      >
        <Card
          sx={{
            width: "100%",
            maxWidth: 600,
            p: 4,
            borderRadius: 4,
            boxShadow: "0px 10px 30px rgba(0,0,0,0.3)",
            backgroundColor: "#fff",
          }}
        >
          <CardContent>
            <Typography
              variant="h5"
              fontWeight="bold"
              textAlign="center"
              gutterBottom
              color="primary"
            >
              Sửa Bài Học
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Tiêu đề bài học"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}
              />

              <TextField
                label="Vị trí bài học"
                type="number"
                fullWidth
                value={position}
                onChange={(e) => setPosition(e.target.value)}
                inputProps={{ min: 1 }}
                sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}
              />

              <Button
                variant="outlined"
                component="label"
                sx={{
                  borderRadius: 2,
                  borderColor: "#1976d2",
                  color: "#1976d2",
                  textTransform: "none",
                  fontWeight: "500",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                    borderColor: "#1565c0",
                  },
                }}
              >
                Chọn file video (nếu muốn thay đổi)
                <input
                  type="file"
                  hidden
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                />
              </Button>
              {videoFile && (
                <Typography variant="body2" color="text.secondary">
                  Đã chọn: {videoFile.name}
                </Typography>
              )}

              <Button
                variant="outlined"
                component="label"
                sx={{
                  borderRadius: 2,
                  borderColor: "#1976d2",
                  color: "#1976d2",
                  textTransform: "none",
                  fontWeight: "500",
                  "&:hover": {
                    backgroundColor: "#e3f2fd",
                    borderColor: "#1565c0",
                  },
                }}
              >
                Chọn file PDF (nếu muốn thay đổi)
                <input
                  type="file"
                  hidden
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                />
              </Button>
              {pdfFile && (
                <Typography variant="body2" color="text.secondary">
                  Đã chọn: {pdfFile.name}
                </Typography>
              )}

              <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate(-1)}
                  sx={{ borderRadius: 2, textTransform: "none" }}
                  disabled={loading}
                >
                  Hủy
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={
                    loading ? <CircularProgress size={20} color="inherit" /> : null
                  }
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 3,
                    py: 1.5,
                    boxShadow: "0px 4px 12px rgba(25, 118, 210, 0.3)",
                    "&:hover": { backgroundColor: "#1565c0" },
                  }}
                >
                  {loading ? "Đang cập nhật..." : "Cập nhật bài học"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EditLesson;

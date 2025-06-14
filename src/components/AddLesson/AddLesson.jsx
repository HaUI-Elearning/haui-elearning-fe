import React, { useState } from "react";
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

const AddLesson = () => {
  const { chapterId } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [position, setPosition] = useState("");
  const [videoFile, setVideoFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (
      !title.trim() ||
      !position.trim() ||
      (!videoFile && !pdfFile)
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }

    if (isNaN(Number(position)) || Number(position) < 1) {
      toast.error("Lesson position must be a positive integer.");
      return;
    }

    const formData = new FormData();
    formData.append("chapterId", chapterId);
    formData.append("title", title);
    formData.append("Position", Number(position));
    formData.append("videoFile", videoFile);
    formData.append("pdfFile", pdfFile);

    try {
      setLoading(true);
      await axios.post("http://localhost:8080/api/v1/Teacher/Lesson/add", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      toast.success("Lesson added successfully!");
      navigate(-1);
    } catch (error) {
      toast.error(error.response?.data?.error || "An error occurred.");
    } finally {
      setLoading(false);
    }
  };

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
              Add New Lesson
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Lesson Title"
                fullWidth
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}
              />

              <TextField
                label="Lesson Position"
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
                Upload Video File
                <input
                  type="file"
                  hidden
                  accept="video/*"
                  onChange={(e) => setVideoFile(e.target.files[0])}
                />
              </Button>
              {videoFile && (
                <Typography variant="body2" color="text.secondary">
                  Selected: {videoFile.name}
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
                Upload PDF File
                <input
                  type="file"
                  hidden
                  accept="application/pdf"
                  onChange={(e) => setPdfFile(e.target.files[0])}
                />
              </Button>
              {pdfFile && (
                <Typography variant="body2" color="text.secondary">
                  Selected: {pdfFile.name}
                </Typography>
              )}

              <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate(-1)}
                  sx={{ borderRadius: 2, textTransform: "none" }}
                >
                  Cancel
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
                  {loading ? "Submitting..." : "Add Lesson"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AddLesson;

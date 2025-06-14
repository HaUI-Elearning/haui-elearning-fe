import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import bgImage from "../../assets/images/b2.jpg";

const EditTeacherCourse = () => {
  const { courseId } = useParams(); // Get courseId from URL
  console.log(courseId);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [loading, setLoading] = useState(false);
  const [approvalStatus, setApprovalStatus] = useState("");

  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategoriesAndCourse = async () => {
      try {
        const categoryRes = await axios.get(
          "http://localhost:8080/api/v1/categories"
        );
        setCategories(categoryRes.data.data);

        const token = localStorage.getItem("accessToken");
        if (!token) {
          toast.error("You are not logged in or your token has expired");
          return;
        }

        const courseRes = await axios.get(
          `http://localhost:8080/api/v1/Teacher/getCourse/${courseId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        const course = courseRes.data.data;
        setApprovalStatus(course.approvalStatus);
        setName(course.name);
        setDescription(course.description);
        setContent(course.contents);
        setPrice(course.price);
        setCategoryId(course.categoryId); // after categories are loaded
        setThumbnailUrl(course.thumbnail); // add this line
      } catch (error) {
        toast.error("Failed to load data");
      }
    };

    fetchCategoriesAndCourse();
  }, [courseId]);

  const handleUpdate = async () => {
    if (
      !name.trim() ||
      !description.trim() ||
      !content.trim() ||
      !String(price).trim()
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }

    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
      toast.error("Price must be a valid positive number.");
      return;
    }

    const params = new URLSearchParams({
      CourseId: courseId,
      name,
      Description: description,
      content,
      price: priceNumber,
      CategoryId: categoryId,
    });

    const formData = new FormData();
    if (thumbnail) formData.append("file", thumbnail);

    // ✅ Select the correct API based on approvalStatus
    let updateApi = "http://localhost:8080/api/v1/Teacher/Course/Update";
    if (approvalStatus === "rejected") {
      updateApi =
        "http://localhost:8080/api/v1/Teacher/Course/Update/ToApproval";
    }

    try {
      setLoading(true);
      await axios.put(`${updateApi}?${params}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      toast.success("Course updated successfully!");
      navigate("/teacher");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}>
      {/* Background image */}
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
      {/* Overlay */}
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
      {/* Content */}
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
            backgroundColor: "#ffffff",
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
              Edit Course
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Course name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <TextField
                label="Content"
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
              <TextField
                label="Price"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
              <FormControl fullWidth>
                <InputLabel id="category-select-label">Category</InputLabel>
                <Select
                  labelId="category-select-label"
                  value={categoryId}
                  label="Category"
                  onChange={(e) => setCategoryId(e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem
                      key={category.categoryId}
                      value={category.categoryId}
                    >
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>

              <Button variant="outlined" component="label">
                Choose new image (optional)
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  ref={inputRef}
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </Button>
              {!thumbnail && thumbnailUrl && (
                <Box mt={1}>
                  <Typography variant="body2" color="text.secondary">
                    Current image:{" "}
                    <a
                      href={thumbnailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {thumbnailUrl}
                    </a>
                  </Typography>
                </Box>
              )}

              {thumbnail && (
                <Typography variant="body2" color="text.secondary">
                  Selected: {thumbnail.name}
                </Typography>
              )}

              <Box display="flex" justifyContent="space-between" mt={3}>
                <Button
                  variant="outlined"
                  color="inherit"
                  onClick={() => navigate("/teacher")}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleUpdate}
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                >
                  {loading ? "Updating..." : "Update Course"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EditTeacherCourse;
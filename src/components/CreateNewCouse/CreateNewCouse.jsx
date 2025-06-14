import { useState, useRef, useEffect } from "react";
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
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import bgImage from "../../assets/images/b2.jpg";

const CreateNewCourse = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [price, setPrice] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");

  const inputRef = useRef();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/v1/categories"
        );
        setCategories(response.data.data);
      } catch (error) {
        toast.error("Failed to load categories");
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async () => {
    // Validate empty fields
    if (
      !name.trim() ||
      !description.trim() ||
      !content.trim() ||
      !price.trim() ||
      !thumbnail
    ) {
      toast.error("Please fill in all required fields.");
      return;
    }
    if (!categoryId) {
      toast.error("Please select a category.");
      return;
    }

    // Validate price is positive number
    const priceNumber = Number(price);
    if (isNaN(priceNumber) || priceNumber < 0) {
      toast.error("Price must be a valid positive number.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("Description", description);
    formData.append("content", content);
    formData.append("price", priceNumber);
    formData.append("file", thumbnail);
    formData.append("categoryId", categoryId);

    try {
      setLoading(true);
      await axios.post(
        "http://localhost:8080/api/v1/Teacher/Course/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      toast.success("Course created successfully!");
      setTimeout(() => {
        navigate("/teacher");
      }, 2000);
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

      {/* Dark overlay */}
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

      {/* Main content */}
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
              Create New Course
            </Typography>

            <Box display="flex" flexDirection="column" gap={2}>
              <TextField
                label="Course name"
                fullWidth
                value={name}
                onChange={(e) => setName(e.target.value)}
                sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}
              />

              <TextField
                label="Description"
                fullWidth
                multiline
                minRows={3}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}
              />

              <TextField
                label="Content"
                fullWidth
                value={content}
                onChange={(e) => setContent(e.target.value)}
                sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}
              />

              <TextField
                label="Price"
                type="number"
                fullWidth
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                inputProps={{ min: 0 }}
                sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}
              />
              <FormControl
                fullWidth
                sx={{ backgroundColor: "#fafafa", borderRadius: 2 }}
              >
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
                Choose thumbnail
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  ref={inputRef}
                  onChange={(e) => setThumbnail(e.target.files[0])}
                />
              </Button>

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
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                  }}
                >
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleSubmit}
                  disabled={loading}
                  startIcon={
                    loading ? (
                      <CircularProgress size={20} color="inherit" />
                    ) : null
                  }
                  sx={{
                    borderRadius: 2,
                    textTransform: "none",
                    px: 3,
                    py: 1.5,
                    boxShadow: "0px 4px 12px rgba(25, 118, 210, 0.3)",
                    "&:hover": {
                      backgroundColor: "#1565c0",
                    },
                  }}
                >
                  {loading ? "Creating..." : "Create Course"}
                </Button>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CreateNewCourse;

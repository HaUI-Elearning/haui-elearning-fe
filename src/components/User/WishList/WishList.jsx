import { t } from "i18next";
import { useSelector } from "react-redux";
import { Box, Grid, Typography, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import RenderStar from "../../Course/RenderStar/RenderStar";
import { formatCurrency } from "../../../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import styles from "./styles";

WishList.propTypes = {};

function WishList() {
  const favoriteItems = useSelector((state) => state.favorites.items);
  const [courseDetails, setCourseDetails] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const fetchCourseDetailById = async (courseId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/v1/courses/${courseId}`
      );
      return response.data.data;
    } catch (error) {
      console.error("Error fetching course details:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchCourseDetails = async () => {
      const details = await Promise.all(
        favoriteItems.map((course) => fetchCourseDetailById(course.courseId))
      );
      setCourseDetails(details.filter((detail) => detail !== null));
    };

    if (favoriteItems.length >= 0) {
      fetchCourseDetails();
    }
  }, [favoriteItems]);

  const totalPages = Math.ceil(courseDetails.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = courseDetails.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const navigate = useNavigate();
  const handleCourseClick = (courseId) => {
    navigate(`/courses/${courseId}`);
  };

  return (
    <Box sx={styles.wrapper}>
      {courseDetails.length > 0 ? (
        <>
          <Grid container spacing={2}>
            {currentItems.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.courseId}>
                <Box
                  sx={styles.courseCard}
                  onClick={() => handleCourseClick(item.courseId)}
                >
                  <img
                    src={item.thumbnail}
                    alt={item.name}
                    style={styles.thumbnail}
                  />
                  <Typography variant="h6" sx={styles.title}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={styles.author}>
                    {item.author}
                  </Typography>
                  <Box sx={styles.ratingWrapper}>
                    <RenderStar numStars={item.star} />
                    <Typography variant="body2" sx={styles.ratingText}>
                      {item.star}
                    </Typography>
                  </Box>
                  <Typography>{item.hour} hours total</Typography>
                  <Typography variant="body2" sx={styles.price}>
                    {formatCurrency(item.price)}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Pagination
            sx={styles.pagination}
            count={totalPages}
            page={currentPage}
            onChange={handlePageChange}
            color="primary"
          />
        </>
      ) : (
        <Typography variant="h6" sx={styles.noItemText}>
          {t("You have no favorite courses yet.")}
        </Typography>
      )}
    </Box>
  );
}

export default WishList;

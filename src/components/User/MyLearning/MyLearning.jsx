import { t } from "i18next";
import { useSelector } from "react-redux";
import { Box, Grid, Typography, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import RenderStar from "../../Course/RenderStar/RenderStar";
import { formatCurrency } from "../../../utils/utils";
import "../../../store/userSlice";
import { useNavigate } from "react-router-dom";
import styles from "./style";
import { getEnrollmentsByUserId } from "../../../apis/getEnrollmentsByUserId";
MyLearning.propTypes = {};

function MyLearning() {
  const [enrollments, setEnrollments] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const userInfo = useSelector((state) => state.user.userInfo);
  const accessToken = useSelector((state) => state.user.accessToken);
  const parsedUser = JSON.parse(userInfo);

  console.log("userInfo", parsedUser.userId);
  console.log("accessToken", accessToken);

  useEffect(() => {
    const fetchData = async () => {
      if (!userInfo || !accessToken) return;

      try {
        const data = await getEnrollmentsByUserId(parsedUser.userId, accessToken);
        setEnrollments(data);
      } catch (error) {
        console.error("Lỗi khi fetch enrollments:", error);
      }
    };

    fetchData();
  }, [userInfo, accessToken, parsedUser.userId]);

  const totalPages = Math.ceil(enrollments.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = enrollments.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event, newPage) => {
    setCurrentPage(newPage);
  };

  const navigate = useNavigate();
  const handleCourseClick = (courseId) => {
    navigate(`/courses/learn/${courseId}`);
  };

  return (
    <Box sx={styles.wrapper}>
      {enrollments.length > 0 ? (
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
          {t("You haven’t joined any courses yet.")}
        </Typography>
      )}
    </Box>
  );
}

export default MyLearning;

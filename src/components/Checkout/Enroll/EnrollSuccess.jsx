// EnrollSuccessContent.jsx
import PropTypes from "prop-types";
import { Box, Typography, Rating, Button, Container } from "@mui/material";
import styles from "./styles";
import enrollOk from "../../../assets/images/enrollOk.png";
import { useNavigate } from "react-router-dom";

const EnrollSuccess = ({ enrolledCourse }) => {
  const navigate = useNavigate();

  

  return (
    <Container sx={styles.container}>
      <Box
        component="img"
        src={enrollOk}
        alt="Congratulations"
        sx={styles.congratsImg}
      />

      <Box sx={styles.contentBox}>
        <Box
          component="img"
          src={enrolledCourse.thumbnail || "/default-course.jpg"}
          alt={enrolledCourse.name}
          sx={styles.image}
        />

        <Box sx={styles.infoBox}>
          <Typography variant="h4" sx={styles.title}>
            {enrolledCourse.name}
          </Typography>

          <Box sx={styles.ratingBox}>
            <Rating
              name="course-rating"
              value={enrolledCourse.rating || 4.5}
              precision={0.5}
              readOnly
              sx={styles.ratingStars}
            />
            <Typography sx={styles.ratingValue}>
              {enrolledCourse.rating || 4.5}
            </Typography>
          </Box>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={styles.description}
          >
            {enrolledCourse.description}
          </Typography>

          <Button
            variant="contained"
            size="large"
            sx={styles.button}
            onClick={() =>
              navigate(`/courses/learn/${enrolledCourse.courseId}`)
            }
          >
            HỌC NGAY
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

EnrollSuccess.propTypes = {
  enrolledCourse: PropTypes.any
};

export default EnrollSuccess;

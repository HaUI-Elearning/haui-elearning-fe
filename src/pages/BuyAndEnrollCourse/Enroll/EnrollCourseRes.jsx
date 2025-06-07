import { useLocation, useNavigate } from "react-router-dom";
import { Button, Typography, Container, Box, Rating } from "@mui/material";
import styles from "./styles"
import enrollOk from "../../../assets/images/enrollOk.png"
import NotFoundPage from "../../NotFoundPage/NotFound";
const EnrollPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const enrolledCourse = location.state?.enrolledCourse;

  if (!enrolledCourse) {
    return <NotFoundPage/>;
  }

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
            LEARN NOW
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default EnrollPage;

import { Container, Typography } from "@mui/material";
import PropTypes from "prop-types";
import Course from "../Course/Course";
import SkeletonList from "./CourseItemSkeleton";

const CourseItem = ({ loading, error, courses }) => {
  if (loading) {
    return <SkeletonList />;
  }

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Lĩnh vực sẽ học tiếp theo
      </Typography>
      <Course courses={courses} />
    </Container>
  );
};
CourseItem.propTypes = {
  loading: PropTypes.any,
  error: PropTypes.any,
  courses: PropTypes.any,
};

export default CourseItem;

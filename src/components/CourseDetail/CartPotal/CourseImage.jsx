import { Box } from "@mui/material";
import PropTypes from "prop-types";
import styles from "..";

export const CourseImage = ({ thumbnail, title }) => (
  <Box sx={styles.boxImage}>
    {thumbnail && (
      <img
        src={thumbnail}
        alt={title || "Course thumbnail"}
        style={{ width: "346px", height: "200px" }}
      />
    )}
  </Box>
);

CourseImage.propTypes = {
  thumbnail: PropTypes.string,
  title: PropTypes.string,
};

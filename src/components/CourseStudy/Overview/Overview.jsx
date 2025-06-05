import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { formatDayMonthYear } from "../../../utils/dateFomatter";
import styles from "./styles";

const Overview = ({ course = {} }) => {
  console.log("Course Data from Overview Component:", course.course);
  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>
        {course.course?.name || "Course Title Not Available"}
      </h1>

      <div style={styles.ratingWrapper}>
        <div style={styles.starGroup}>
          <span>{course.course.star}</span>
          <span style={{ color: "#B36B00", fontSize: 18 }}>★</span>
          <span style={{ color: "B36B00" }}>rating</span>
        </div>

        <div style={styles.starGroup}>
          <span>🕒 {course.course.hour}</span>
          <span style={{ color: "#B36B00", fontSize: 15 }}>learning </span>
        </div>
      </div>

      <div style={styles.updatedDate}>
        <span>
          ⏰ Last updated {formatDayMonthYear(course.course.createdAt)}
        </span>
      </div>

      <div style={styles.langWrapper}>
        <span>🌐 English</span>
        <span>📝 English [Auto]</span>
      </div>

      <div style={styles.description}>
        <Typography variant="body1">
          {course.course?.description ||
            "No description available for this course."}
        </Typography>
      </div>

      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Typography variant="h5" sx={styles.learnTitle}>
            What you will learn
          </Typography>

          <Grid2
            container
            sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 1 }}
          >
            {course?.course.contents?.split(";").map((content) => {
              const trimmed = content.trim();
              if (!trimmed) return null;

              return (
                <Grid2
                  xs={12}
                  sm={6}
                  key={trimmed}
                  sx={{ display: "flex", alignItems: "flex-start", gap: 1 }}
                >
                  <CheckSharpIcon sx={{ color: "#2e7d32", mt: "2px" }} />
                  <Typography variant="body1" component="span">
                    {trimmed}
                  </Typography>
                </Grid2>
              );
            })}
          </Grid2>
        </Grid2>
      </Grid2>
    </div>
  );
};

Overview.propTypes = {
  course: PropTypes.object,
};

export default Overview;

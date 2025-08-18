import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import { formatDayMonthYear } from "../../../utils/dateFomatter";
import styles from "./styles";

const Overview = ({ course = {} }) => {
  console.log("Course overview:", course)
  return (
    <div style={styles.wrapper}>
      <h1 style={styles.title}>
        {course?.name || "Tiêu đề khóa học không có sẵn"}
      </h1>

      <div style={styles.ratingWrapper}>
        <div style={styles.starGroup}>
          <span>{course.star}</span>
          <span style={{ color: "#B36B00", fontSize: 18 }}>★</span>
        </div>

        <div style={styles.starGroup}>
          <span>🕒 {course.hour}</span>
          <span style={{ color: "#B36B00", fontSize: 15 }}>giờ học </span>
        </div>
      </div>

      <div style={styles.updatedDate}>
        <span>
          ⏰ Lần cập nhật gần đây nhất: {formatDayMonthYear(course.createdAt)}
        </span>
      </div>

      <div style={styles.langWrapper}>
        <span>🌐 English</span>
        <span>📝 English [Tự động]</span>
        <span>
          📱 Tương thích trên <strong>iOS</strong> & <strong>Android</strong>
        </span>
      </div>

      <div style={styles.description}>
        <Typography variant="body1">
          {course?.description || "Không có mô tả nào cho khóa học này."}
        </Typography>
      </div>

      <Grid2 container spacing={2}>
        <Grid2 xs={12}>
          <Typography variant="h5" sx={styles.learnTitle}>
            Mô tả
          </Typography>

          <Grid2
            container
            sx={{ border: "1px solid #ccc", padding: 2, borderRadius: 1 }}
          >
            {course.contents?.split(";").map((content) => {
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

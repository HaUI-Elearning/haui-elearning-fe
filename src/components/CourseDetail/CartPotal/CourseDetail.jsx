import { Box, Typography } from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import TvIcon from "@mui/icons-material/Tv";
import VerifiedIcon from "@mui/icons-material/Verified";
import AllInclusiveIcon from "@mui/icons-material/AllInclusive";
import styles1 from "./styles1";

import PropTypes from "prop-types";

import  formatDuration  from "../../../utils/formatDuration";
export const CourseDetails = ({ chapter }) => {
  console.log("chapter", chapter);
  const chapters = chapter || [];
  const totalChapters = chapters.length;

  const totalTimeInSeconds = chapters.reduce((sum, chapter) => {
    return (
      sum +
      (chapter.listLessons || []).reduce((s, lesson) => {
        return s + (lesson.durationVideo || 0);
      }, 0)
    );
  }, 0);
  return (
    <Box sx={styles1.box}>
      <Typography sx={styles1.typography}>This course includes:</Typography>
      <Box sx={styles1.iconAndTypo}>
        <AccessTimeIcon sx={styles1.icon} />
        <Typography>
          {" "}
          {formatDuration(totalTimeInSeconds)} on-demand video
        </Typography>
      </Box>
      <Box sx={styles1.iconAndTypo}>
        <MenuBookIcon sx={styles1.icon} />
        <Typography>{totalChapters} chapters</Typography>
      </Box>
      <Box sx={styles1.iconAndTypo}>
        <TvIcon sx={styles1.icon} />
        <Typography>Access on mobile and TV</Typography>
      </Box>
      <Box sx={styles1.iconAndTypo}>
        <AllInclusiveIcon sx={styles1.icon} />
        <Typography>Full lifetime access</Typography>
      </Box>
      <Box sx={styles1.iconAndTypo}>
        <VerifiedIcon sx={styles1.icon} />
        <Typography>Certificate of completion</Typography>
      </Box>
    </Box>
  );
};
CourseDetails.propTypes = {
  chapter: PropTypes.any,
};

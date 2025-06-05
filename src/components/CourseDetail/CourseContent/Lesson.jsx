import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Icon,
  Typography,
} from "@mui/material";
import PropTypes from "prop-types";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BookIcon from "@mui/icons-material/Book";
import styles from "./styles";
import  formatDuration  from "../../../utils/formatDuration"; 
const AllLesson = ({ data }) => {
  const chapters = data.chapters || [];

  const totalChapters = chapters.length;

  const totalLectures = chapters.reduce(
    (sum, chapter) => sum + (chapter.listLessons?.length || 0),
    0
  );

  const totalTimeInSeconds = chapters.reduce((sum, chapter) => {
    return (
      sum +
      (chapter.listLessons || []).reduce((s, lesson) => {
        return s + (lesson.durationVideo || 0);
      }, 0)
    );
  }, 0);

  return (
    <div style={{ marginBottom: "35px" }}>
      <Typography sx={styles.typo1}>📚 Course Content</Typography>

      <Typography
        variant="body2"
        color="textSecondary"
        style={{ paddingTop: "7px", fontSize: "18px", marginBottom: "5px" }}
      >
        {totalChapters} chapters | {totalLectures} lectures |{" "}
        {formatDuration(totalTimeInSeconds)} total
      </Typography>

      <Box sx={{ border: "1px solid black" }}>
        {chapters.length > 0 ? (
          chapters.map((chapter, index) => (
            <Accordion key={index}>
              <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  {chapter.title} {chapter.description}
                </Typography>
              </AccordionSummary>

              <AccordionDetails>
                {chapter.listLessons && chapter.listLessons.length > 0 ? (
                  chapter.listLessons.map((lesson, idx) => (
                    <Box
                      key={idx}
                      display="flex"
                      alignItems="center"
                      gap={2}
                      mb={1}
                    >
                      <Icon>
                        <BookIcon />
                      </Icon>
                      <Typography variant="body1">
                        {lesson.title} (
                        {formatDuration(lesson.durationVideo || 0)})
                      </Typography>
                    </Box>
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    No lessons available in this chapter.
                  </Typography>
                )}
              </AccordionDetails>
            </Accordion>
          ))
        ) : (
          <Typography variant="body1">🚫 No chapter data available.</Typography>
        )}
      </Box>
    </div>
  );
};

AllLesson.propTypes = {
  data: PropTypes.object.isRequired,
};

export default AllLesson;

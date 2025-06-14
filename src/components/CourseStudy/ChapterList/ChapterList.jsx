import PropTypes from "prop-types";
import {
  Box,
  Typography,
  Breadcrumbs,
  Link,
  Stack,
  Button,
} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";

const ChapterList = ({ chapters = [], onLessonClick }) => {
  if (!chapters || chapters.length === 0) {
    console.warn("No chapters available");
    return <Typography>No chapters available</Typography>;
  }

  console.log("Chapter:", chapters)
  return (
    <Box sx={{ padding: 2, width: 400 }}>
      {chapters.map((chapter, chapterIndex) => (
        <Box key={`chapter-${chapterIndex}`} sx={{ marginBottom: 2 }}>
          <Breadcrumbs aria-label="chapter-breadcrumbs">
            <Typography variant="h6" fontWeight="bold">
              📚 {chapter.title}: {chapter.description}
            </Typography>
          </Breadcrumbs>

          <Stack spacing={1} sx={{ mt: 1 }}>
            {chapter.listLessons?.map((lesson, idx) => (
              <Box
                key={`lesson-${lesson.lessonId}-${idx}`}
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                  p: 1,
                  borderRadius: 2,
                  bgcolor: "#f5f5f5",
                }}
              >
                <Link
                  component="button"
                  underline="hover"
                  color="primary"
                  onClick={() => onLessonClick(lesson.videoURL)}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <PlayCircleIcon fontSize="small" />
                  {lesson.title}
                </Link>

                {lesson.pdfURL && (
                  <Button
                    variant="outlined"
                    size="small"
                    startIcon={<PictureAsPdfIcon />}
                    onClick={() => window.open(lesson.pdfURL, "_blank")}
                  >
                    Resource PDF
                  </Button>
                )}
              </Box>
            ))}
          </Stack>
        </Box>
      ))}
    </Box>
  );
};

ChapterList.propTypes = {
  chapters: PropTypes.any,
  onLessonClick: PropTypes.func.isRequired,
};

export default ChapterList;

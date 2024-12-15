import { Accordion, AccordionDetails, AccordionSummary, Box, Icon, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import BookIcon from "@mui/icons-material/Book";
import { parseData, calculateTotalTime } from '../../../utils/parseChapter';
import styles from './styles';

AllLesson.propTypes = {
    data: PropTypes.string,
};
function AllLesson({ data }) {
    // Xử lý dữ liệu từ props
    const chapters = parseData(data);
    
    const totalChapters = chapters.length;
    const totalLectures = chapters.reduce((total, chapter) => total + chapter.lectures.length, 0);
    const totalTime = chapters.reduce((total, chapter) => total + calculateTotalTime(chapter.lectures), 0);
    return (
        <div style={{ marginBottom: '35px' }}>
            <Typography sx={styles.typo1}>Course Sections</Typography>
            <Typography variant="body2" color="textSecondary" style={{ paddingTop: '7px', fontSize:'18px', marginBottom:'5px' }}>
                {totalChapters} sections | {totalLectures} lectures | {totalTime.toFixed(2)}min total length
            </Typography>
            <Box sx={{ border: '1px solid black' }}>
                {chapters.length > 0 ? (
                    chapters.map((chapter, index) => (
                        <Accordion key={index}>
                            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography variant="h6" sx={{ fontWeight: 'bolder' }}>{chapter.chapterName}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                {chapter.lectures.map((lecture, idx) => (
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
                                            {lecture.title} ({lecture.time})
                                        </Typography>
                                    </Box>
                                ))}
                            </AccordionDetails>
                        </Accordion>
                    ))
                ) : (
                    <Typography variant="body1">Không có dữ liệu hiển thị.</Typography>
                )}
            </Box>

        </div>
    );
}

export default AllLesson;
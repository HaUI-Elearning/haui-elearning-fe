import { Box, Typography } from '@mui/material';
import RenderStar from '../../Course/RenderStar/RenderStar';
import UpdateIcon from '@mui/icons-material/Update';
import { formatDayMonthYear } from '../../../utils/dateFomatter';
import styles from '..';
import PropTypes from 'prop-types';
const CourseInfo = ({ course }) => {
    return (
        <Box>
            <Typography sx={styles.title}>{course.name}</Typography>
            <Typography sx={styles.description}>{course.description}</Typography>
            <Box sx={styles.star}>
                {course.star}
                <RenderStar numStars={course.star} />
            </Box>
            <Typography sx={styles.author} component="span">
                <span>Created by: </span>
                <Box component="span" sx={{ color: '#6699FF' }}>
                    {course.author}
                </Box>
            </Typography>
            <Typography sx={styles.date} component="span">
                <Box>
                    <UpdateIcon />
                </Box>
                <Box>Last updated: {formatDayMonthYear(course.createdAt)}</Box>
            </Typography>
        </Box>
    );
};
CourseInfo.propTypes = {
    course: PropTypes.object,
};
export default CourseInfo;
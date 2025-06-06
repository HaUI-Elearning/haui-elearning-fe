
import PropTypes from 'prop-types';
import { Divider, Paper, Stack, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import styles from './styles';
BasicDetail.propTypes = {
    course: PropTypes.array,
    detail: PropTypes.object,
};

function BasicDetail({ course = [], detail = {} }) {
    const averageStar = course.reduce((sum, course) => sum + course.star, 0) / course.length;
    return (
        <div style={styles.paper}>
            <Typography variant="h3" style={styles.title}>
                {detail.name} Courses
            </Typography>
            <Typography variant="body1" style={styles.description}>
                {detail.description}
            </Typography>
            <Stack
                direction="row"
                divider={<Divider orientation="vertical" flexItem />}
                spacing={2}
                style={{ marginBottom: '16px' }}
            >
                <Paper style={styles.item}>
                    <Typography style={styles.titleItem}>Number of courses</Typography>
                    <Typography style={styles.titleContent}>{course.length}</Typography>
                </Paper>
                <Paper style={styles.item}>
                    <Typography style={styles.titleItem}>Average courses rating</Typography>
                    <Stack direction="row" spacing={2}>
                        <Typography style={styles.titleContent}>{averageStar.toFixed(1)}</Typography>
                        <StarIcon style={styles.star} />
                    </Stack>
                </Paper>
            </Stack>
        </div>
    );
}

export default BasicDetail;
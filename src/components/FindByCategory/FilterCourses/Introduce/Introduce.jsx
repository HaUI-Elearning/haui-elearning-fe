import PropTypes from 'prop-types';
import { Typography } from '@mui/material';
import styles from './styles';

Introduce.propTypes = {
    detail: PropTypes.object,
};

function Introduce({ detail = {} }) {
    return (
        <div style={styles.container}>
            <Typography variant='h5' sx={styles.title}>
                Tất cả khóa học về {detail.name}
            </Typography>
            <Typography variant='body2' style={styles.description}>
                Programming courses cover various topics, from beginner-friendly languages like
                Python and JavaScript to web development, mobile app creation, and data analysis.
                You can learn front-end and back-end technologies, mobile platforms like Android
                and iOS, and tools like React Native for cross-platform apps.
                Data programming courses focus on Python and SQL for analysis and database
                management.
                <br />
                Join more than 12 million learners and train up on {detail.name} on Udemy.
            </Typography>
        </div>
    );
}

export default Introduce;
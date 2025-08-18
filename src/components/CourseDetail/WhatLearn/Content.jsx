import { Typography, Box } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import styles from '..';
import PropTypes from 'prop-types';
const WhatYouWillLearn = ({ course }) => {
    return (
        <Grid2 container>
            <Grid2 sm={8} sx={styles.itemContents}>
                <Typography variant="h5" sx={styles.learnTitle}>Nội dung bài học</Typography>
                <Grid2 container spacing={2}>
                    {course?.contents?.split(';').map((content) => {
                        const trimmedContent = content.trim();
                        if (!trimmedContent) return null;
                        return (
                            <Grid2 sm={6} key={trimmedContent}>
                                <Box sx={styles.learnContentBox}>
                                    <CheckSharpIcon sx={styles.checkIcon} />
                                    <Typography variant="body1" component="span">{trimmedContent}</Typography>
                                </Box>
                            </Grid2>
                        );
                    })}
                </Grid2>
            </Grid2>
        </Grid2>
    );
};

WhatYouWillLearn.propTypes = {
    course: PropTypes.object,
};
export default WhatYouWillLearn;
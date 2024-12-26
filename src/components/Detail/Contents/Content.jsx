import { Grid, Typography, Box } from '@mui/material';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import styles from '..';
import PropTypes from 'prop-types';
const WhatYouWillLearn = ({ course }) => {
    return (
        <Grid container>
            <Grid item sm={8} sx={styles.itemContents}>
                <Typography variant="h5" sx={styles.learnTitle}>What you will learn</Typography>
                <Grid container spacing={2}>
                    {course.contents && course.contents.split(';').map((content, index) => (
                        <Grid item sm={6} key={index}>
                            <Box sx={styles.learnContentBox}>
                                <CheckSharpIcon sx={styles.checkIcon} />
                                <Typography variant="body1" component="span">{content}</Typography>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Grid>
        </Grid>
    );
};

WhatYouWillLearn.propTypes = {
    course: PropTypes.object,
};
export default WhatYouWillLearn;
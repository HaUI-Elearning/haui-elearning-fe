import PropTypes from 'prop-types';
import { Box, Container, Grid } from '@mui/material';
import {  useNavigate } from 'react-router-dom';
import styles from '.';
import { useState } from 'react';
import AllLesson from './Lesson/Lesson';
import BreadcrumbsComponent from './BreadcrumbsComponent/BreadcrumbsComponent';
import CourseInfo from './CourseInfo/CourseInfo';
import WhatYouWillLearn from './Contents/Content';
import LearnMore from './LearnMore/LearnMore';
Detail.propTypes = {
    course: PropTypes.object,
};

import CartPortal from './CartPotal/CartPotal';


function Detail({ course = {} }) {
    const navigate = useNavigate();

    const handleNameClick = () => {
        navigate('/');
    };
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box sx={{marginTop:'30px'}}>
            <Box sx={styles.box}>
                <Container>
                    <Grid container spacing={3}>
                        <Grid item sm={8}>
                            <BreadcrumbsComponent course={course} onHomeClick={handleNameClick} />
                            <CourseInfo course={course}></CourseInfo>
                        </Grid>
                        <Grid item sm={4}></Grid>
                    </Grid>
                </Container>
            </Box>
            
            <Box sx={styles.contents}>
                <Container sx={styles.container}>
                    <WhatYouWillLearn course={course}></WhatYouWillLearn>
                </Container>

                <Container>
                    <Grid container>
                        <Grid item sm={12}>
                            <LearnMore handleClickOpen={handleClickOpen} handleClose={handleClose} open= {open}></LearnMore>
                        </Grid>
                    </Grid>
                </Container>
                <Container>
                    <AllLesson data={course.chapter} />
                </Container>
            </Box>

            <CartPortal course={course} />
        </Box>
    );
}

export default Detail;

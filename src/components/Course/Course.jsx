import PropTypes from 'prop-types';
import { Card, CardContent, CardMedia, Typography, Tooltip, Box } from '@mui/material';
import { formatCurrency } from '../../utils/utils';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import RenderStar from '../Course/RenderStar/RenderStar';
import RenderToolTipContent from '../Course/RenderToolTip/RenderToolTipContent';
import styles from './stylesCourse';
import settings from '../Course/SlideCourse/settings';
import { useNavigate } from 'react-router-dom';


const Course = ({ courses = [] }) => {
    const navigate = useNavigate(); 

    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`); 
    };
    return (
        <div>
            {courses.map(category => (
                <div key={category.categoryId}>
                    <Typography variant="h5" sx={styles.sectionTitle}>
                        Top course in {category.name}
                    </Typography>
                    <Slider {...settings}>
                        {category.courseCategories.map(course => (
                            <div key={course.courseId}>
                                <Tooltip
                                    title={<RenderToolTipContent course={course}/>}
                                    placement="right"
                                    arrow
                                    slotProps={{
                                        tooltip: {
                                            sx: {
                                                ...styles.tooltip,
                                                width: '350px',
                                                maxWidth: 'none',
                                                padding: '8px',
                                            },
                                        },
                                        arrow: { sx: { color: '#grey' } }
                                    }}
                                >
                                    <Card sx={styles.card} onClick={() => handleCourseClick(course.courseId)}>
                                        <CardMedia
                                            component="img"
                                            sx={styles.cardMedia}
                                            image={course.thumbnail}
                                            alt={course.name}
                                        />
                                        <CardContent>
                                            <Typography variant="h6" sx={styles.courseName}>
                                                {course.name}
                                            </Typography>
                                            <Typography variant='body2' sx={styles.courseAuthor}>
                                                {course.author}
                                            </Typography>
                                            <Box sx={styles.starContainer}>
                                                {course.star}
                                                <RenderStar numStars={course.star}></RenderStar>
                                            </Box>
                                            <Typography sx={styles.price}>
                                                {formatCurrency(course.price)}
                                            </Typography>
                                        </CardContent>
                                    </Card>
                                </Tooltip>
                            </div>
                        ))}
                    </Slider>
                </div>
            ))}
        </div>
    );
};

Course.propTypes = {
    courses: PropTypes.array
};

export default Course;

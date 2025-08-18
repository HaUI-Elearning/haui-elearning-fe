import { Box, Card, CardContent, CardMedia, Container, Tooltip, Typography } from "@mui/material";
import PropTypes from 'prop-types';
import Slider from "react-slick";
import settings from '../../Course/SlideCourse/settings';
import RenderToolTipContent from '../../Course/RenderToolTip/RenderToolTipContent';
import styles from '../../Course/stylesCourse';
import RenderStar from "../../Course/RenderStar/RenderStar";
import { formatCurrency } from "../../../utils/utils";
import { sortCourses } from "../../../utils/sortedDate";
import { useNavigate } from "react-router-dom";
import { formatMonthYear } from "../../../utils/dateFomatter";
NewestCources.propTypes = {
    course: PropTypes.array,
};

function NewestCources({ course = [] }) {
    const sortedCourse = sortCourses(course)
    const navigate = useNavigate();
    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`);
    };
    return (
        <Container>
            <Slider {...settings}>
                {sortedCourse.map(course => (
                    <div key={course.courseId}>
                        <Tooltip
                            title={<RenderToolTipContent course={course} />}
                            placement="right"
                            arrow
                            componentsProps={{
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
                            <Card sx={{ maxWidth: '100%', height: 350, margin: 1 }} onClick={() => handleCourseClick(course.courseId)}>
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
                                    <Typography variant="h6" sx={{
                                        color: 'green',
                                        fontSize: '0.875rem',
                                    }}>
                                        Cập nhật vào: {formatMonthYear(course.createdAt)}</Typography>
                                    <Typography variant='body2' sx={styles.courseAuthor}>
                                        {course.author}
                                    </Typography>
                                    <Box sx={styles.starContainer}>
                                        {course.star.toFixed(1)}
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
        </Container>
    )
}
export default NewestCources

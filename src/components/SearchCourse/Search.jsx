import { useEffect, useState } from 'react';
import { Box, Card, CardMedia, Container, Grid, styled, Typography, Button } from '@mui/material';
import RenderStar from '../Course/RenderStar/RenderStar';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import { formatCurrency } from '../../utils/utils';
import PropTypes from 'prop-types';
import styles from './styles';
import { useNavigate } from 'react-router-dom';

const DotIcon = styled(FiberManualRecordSharpIcon)(({ theme }) => ({
    fontSize: 'small',
    marginLeft: theme.spacing(1),
}));

Search.propTypes = {
    searchTerm: PropTypes.string,
    loading: PropTypes.bool,
    courses: PropTypes.array,
};

function Search({ searchTerm, loading, courses }) {
    const navigate = useNavigate();
    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 5;
    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);
    useEffect(() => {
        setCurrentPage(1);
    }, [courses]);

    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`);
    };

    const totalPages = Math.ceil(courses.length / coursesPerPage);

    return (
        <Container sx={{ marginTop: '20px' }}>
            <h1 style={{ marginBottom: '30px' }}> {courses.length} kết quả cho ``{searchTerm}``:</h1>
            {loading ? (
                <div>Đang tải...</div>
            ) : (
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    {currentCourses.length > 0 ? (
                        currentCourses.map((courseItem) => (
                            <div key={courseItem.courseId} style={styles.container} onClick={() => handleCourseClick(courseItem.courseId)}>
                                <Grid container>
                                    <Grid item md={3}>
                                        <Card sx={{ maxWidth: '250px' }}>
                                            <CardMedia
                                                component="img"
                                                image={courseItem.thumbnail}
                                                alt={courseItem.name}
                                            />
                                        </Card>
                                    </Grid>
                                    <Grid item md={7}>
                                        <Typography style={styles.title}>{courseItem.name}</Typography>
                                        <Typography variant='body2' style={styles.description}>
                                            {courseItem.description}
                                        </Typography>
                                        <Typography style={styles.author}>{courseItem.author}</Typography>
                                        <Box style={styles.hours}>
                                            <Typography variant='body2'>{courseItem.star}</Typography>
                                            <RenderStar numStars={courseItem.star} />
                                        </Box>
                                        <Typography variant="body2">
                                            {courseItem.hour} giờ học
                                            <DotIcon /><span>Tất cả trình độ</span>
                                            <DotIcon /><span>Có phụ đề</span>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Typography style={styles.price}>{formatCurrency(courseItem.price)}</Typography>
                                    </Grid>
                                </Grid>
                                <hr style={{ margin: '16px 0', border: '0.5px solid #ccc' }} />
                            </div>
                        ))
                    ) : (
                        <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh' }}>
                            <Box sx={{ display: '', alignItems: 'center', marginBottom: '20px' }}>
                                <img
                                    src="https://cdn.dribbble.com/users/463734/screenshots/2016792/empty-result_shot.png"
                                    alt="Empty Cart"
                                    style={{ width: '600px', height: 'auto', marginRight: '10px' }}
                                />
                            </Box>

                        </Container>
                    )}
                </ul>
            )}
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '20px', marginBottom: '10px' }}>
                <Button
                    variant="contained"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                >
                    Trang trước
                </Button>
                <Typography variant="body1" sx={{ marginLeft: '10px', marginRight: '10px' }}>
                    {currentPage} of {totalPages}
                </Typography>
                <Button
                    variant="contained"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                >
                    Trang sau
                </Button>
            </Box>
        </Container>
    );
}

export default Search;
/* eslint-disable react/prop-types */
import { Typography, Box, Button, Tooltip, Grid, Card, CardMedia, styled } from "@mui/material";
import TooltipFilter from "../ToolTipFilters/TolTipFilters";
import styles from "./styles";
import { useNavigate } from "react-router-dom";
import RenderStar from "../../../Course/RenderStar/RenderStar";
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import { formatCurrency } from "../../../../utils/utils";
const DotIcon = styled(FiberManualRecordSharpIcon)(({ theme }) => ({
    fontSize: 'small',
    marginLeft: theme.spacing(1),
}));
const CourseList = ({ courses, currentPage, setCurrentPage, totalPages, totalResult }) => {
    console.log("courses Filter", courses);
    const handlePageChange = (page) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    const navigate = useNavigate();

    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`);
    };
    return (
        <div>
            <h4>Result: {totalResult}</h4>
            {courses.length > 0 ? (
                <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
                    {courses.map((courseItem) => (
                        <Tooltip
                            key={courseItem.courseId}
                            title={<TooltipFilter course={courseItem} />}
                            placement="top"
                            arrow
                            slotProps={{
                                tooltip: {
                                    sx: {
                                        ...styles.tooltip,
                                        width: '400px',
                                        maxWidth: 'none',
                                        padding: '8px',
                                    },
                                },
                                arrow: { sx: { color: 'grey' } }
                            }}
                        >
                            <div style={styles.container} onClick={() => handleCourseClick(courseItem.courseId)}>
                                <Grid container>
                                    <Grid item md={3}>
                                        <Card sx={styles.card}>
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
                                            {courseItem.hour} total hours
                                            <DotIcon /><span>All level</span>
                                            <DotIcon /><span>Subtitles</span>
                                        </Typography>
                                    </Grid>
                                    <Grid item md={2}>
                                        <Typography style={styles.price}>{formatCurrency(courseItem.price)}</Typography>
                                    </Grid>
                                </Grid>
                                <hr style={{ margin: '16px 0', border: '0.5px solid #ccc' }} />
                            </div>
                        </Tooltip>
                    ))}
                </ul>
            ) : (
                    <Box sx={styles.boxNoCourse}>
                        <Typography
                            variant="h5"
                            sx={styles.typoNoCourse1}
                        >
                            No courses available.
                        </Typography>
                        <Typography
                            variant="body1"
                            sx={{
                                color: '#666',
                            }}
                        >
                            Please check your selections or try searching for a different course.
                        </Typography>
                    </Box>
            )}
            <Box>
                <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Prev Page
                </Button>
                <span> {currentPage} / {totalPages} </span>
                <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                   Next Page
                </Button>
            </Box>
        </div>
    );
};

export default CourseList;
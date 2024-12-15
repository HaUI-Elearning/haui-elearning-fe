import { t } from "i18next";
import { useSelector } from "react-redux";
import { Box, Grid, Typography, Pagination } from "@mui/material";
import { useEffect, useState } from "react";
import RenderStar from "../Course/RenderStar/RenderStar";
import { formatCurrency } from "../../utils/utils";
import axios from "axios";
import { useNavigate } from "react-router-dom";

WishList.propTypes = {};

function WishList() {
    const favoriteItems = useSelector((state) => state.favorites.items);
    const [courseDetails, setCourseDetails] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 6;

    useEffect(() => {
        const fetchCourseDetails = async () => {
            const details = await Promise.all(favoriteItems.map(course =>
                axios.get(`http://localhost:8080/api/v1/courses/${course.courseId}`)
                    .then(response => response.data.data)
                    .catch(error => {
                        console.error("Error fetching course details:", error);
                        return null;
                    })
            ));
            setCourseDetails(details.filter(detail => detail !== null));
        };

        if (favoriteItems.length >=0) {
            fetchCourseDetails();
        }
    }, [favoriteItems]);

    const totalPages = Math.ceil(courseDetails.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = courseDetails.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (event, newPage) => {
        setCurrentPage(newPage);
    };
    const navigate = useNavigate();
    const handleCourseClick = (courseId) => {
        navigate(`/courses/${courseId}`);
    };
    return (
        <Box sx={{ padding: '20px' }}>
            {courseDetails.length > 0 ? (
                <>
                    <Grid container spacing={2}>
                        {currentItems.map((item) => (
                            <Grid item xs={12} sm={6} md={4} key={item.courseId}>
                                <Box
                                    sx={{ padding: '16px', display: 'flex', flexDirection: 'column', alignItems: 'center', cursor:'pointer' }}
                                    onClick={() => handleCourseClick(item.courseId)}
                                >
                                    <img
                                        src={item.thumbnail}
                                        alt={item.name}
                                        style={{ width: '100%', maxWidth: '200px', height: 'auto', objectFit: 'cover' }}
                                    />
                                    <Typography variant="h6" sx={{ marginTop: '10px', textAlign: 'center' }}>
                                        {item.name}
                                    </Typography>
                                    <Typography variant="body2" sx={{ color: 'text.secondary', textAlign: 'center' }}>
                                        {item.author}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                                        <RenderStar numStars={item.star} />
                                        <Typography variant="body2" sx={{ marginLeft: '5px' }}>{item.star}</Typography>
                                    </Box>
                                    <Typography>{item.hour} hours total</Typography>
                                    <Typography variant="body2" sx={{ fontWeight: 'bold', textAlign: 'center', marginTop: '5px' }}>
                                        {formatCurrency(item.price)}
                                    </Typography>
                                </Box>
                            </Grid>
                        ))}
                    </Grid>

                    <Pagination
                        sx={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}
                        count={totalPages}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                    />
                </>
            ) : (
                <Typography variant="h6" sx={{ textAlign: 'center', color: 'text.secondary' }}>
                    {t('No favorite items')}
                </Typography>
            )}
        </Box>
    );
}

export default WishList;
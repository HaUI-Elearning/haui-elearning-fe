import { useEffect, useRef, useState } from 'react';
import { Box, Button, Container, Grid, Paper, Typography, } from '@mui/material';
import axios from 'axios';
import styles from './styles'; // Import styles
import EmptyCart from './EmptyCart';
import { formatMoney } from '../../utils/moneyFomatter';
import { removeFromCartApi } from '../../store/cartSlice';
import { useDispatch, useSelector } from 'react-redux';
import RenderStar from '../Course/RenderStar/RenderStar';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import { addToFavoritesApi } from '../../store/favoritesSlice';
import { useNavigate } from 'react-router-dom';
function MyCart() {
    const dispatch = useDispatch();
    const courses = JSON.parse(localStorage.getItem('cartItems'));
    const [courseDetails, setCourseDetails] = useState([]);
    const totalPrice = courses.reduce((total, course) => total + course.price, 0);
    const accessToken = useSelector(state => state.user.accessToken);
    const prevItems = useRef();
    const navigate = useNavigate();
    const handleBuyNow = () => {
        navigate('/checkout', { state: courseDetails });
    };
    useEffect(() => {
        if (JSON.stringify(prevItems.current) !== JSON.stringify(courses)) {
            prevItems.current = courses;

            const fetchCourseDetails = async () => {
                try {
                    const details = await Promise.all(courses.map(course =>
                        axios.get(`http://localhost:8080/api/v1/courses/${course.courseId}`)
                            .then(response => response.data.data)
                            .catch(error => {
                                console.error("Error fetching course details:", error);
                                return null;
                            })
                    ));
                    setCourseDetails(details.filter(detail => detail !== null));
                } catch (error) {
                    console.error("Error fetching course details:", error);
                }
            };

            if (courses.length > 0) {
                fetchCourseDetails();
            }
        }
    }, [courses]);


    const handleRemoveCourse = async (courseId) => {
        await dispatch(removeFromCartApi({ courseId, accessToken }));
        const updatedCourses = courses.filter(course => course.courseId !== courseId);
        localStorage.setItem('cartItems', JSON.stringify(updatedCourses));
        setCourseDetails(prevDetails => prevDetails.filter(course => course.courseId !== courseId));
    };

    const handleMoveToWishlist = async (courseId) => {
        await dispatch(addToFavoritesApi({ courseId, accessToken }));
        await handleRemoveCourse(courseId);
    };
    return (
        <Container style={styles.container}>
            <Box sx={styles.BoxTilte}>
                <Typography sx={styles.typoTitle}>Shopping Cart</Typography>
                <Typography sx={styles.typoTotalCart}>{courses.length} courses in cart</Typography>
            </Box>
            <Grid container spacing={1}>
                {courses.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <>
                        <Grid item xs={9}>
                            {courseDetails.map(course => (
                                <Grid container style={styles.courseItem} key={course.courseId}>
                                    <Grid item xs={2}>
                                        <img
                                            src={course.thumbnail}
                                            alt={course.title}
                                            style={styles.thumbnail}
                                        />
                                    </Grid>
                                    <Grid item xs={4} style={styles.courseDetails}>
                                        <Typography sx={styles.typo1}>{course.name}</Typography>
                                        <Typography sx={styles.typo2}>By {course.author}</Typography>
                                        <Box sx={styles.typo1}>
                                            {course.star}
                                            <RenderStar numStars={course.star}></RenderStar>
                                        </Box>
                                        <Typography sx={styles.typo2}>{course.hour} total hours | All levels</Typography>
                                    </Grid>
                                    <Grid item xs={3}>
                                        <Button onClick={() => handleRemoveCourse(course.courseId)}>Remove</Button>
                                        <Button onClick={() => handleMoveToWishlist(course.courseId)}>Move to wishlist</Button>
                                    </Grid>
                                    <Grid item xs={2}>
                                        <Box style={styles.price}>{formatMoney(course.price)} <LoyaltyIcon fontSize='medium' /> </Box>
                                    </Grid>
                                </Grid>
                            ))}
                        </Grid>
                        <Grid item xs={3}>
                            <Paper sx={styles.totalPaper}>
                                <Typography sx={styles.typo2}>Total: </Typography>
                                <Typography sx={styles.typo3}>{formatMoney(totalPrice)}</Typography>
                                <Button style={styles.checkoutButton}
                                    onClick={handleBuyNow}
                                >
                                    Checkout
                                </Button>
                            </Paper>
                        </Grid>
                    </>
                )}
            </Grid>
        </Container>
    );
}

export default MyCart;
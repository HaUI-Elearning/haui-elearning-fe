
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Typography } from '@mui/material';
import { formatCurrency } from '../../../utils/utils';
import { parseData, calculateTotalTime } from '../../../utils/parseChapter';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import TvIcon from '@mui/icons-material/Tv';
import VerifiedIcon from '@mui/icons-material/Verified';
import ReactDOM from 'react-dom';
import styles1 from '../styles1';
import styles from '..';
import AllInclusiveIcon from '@mui/icons-material/AllInclusive';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { addToCartApi, removeFromCartApi } from '../../../store/cartSlice';
import { addToFavoritesApi, removeFromFavoritesApi } from '../../../store/favoritesSlice';
const CartPortal = ({ course }) => {
    const chapters = parseData(course.chapter);
    const totalChapters = chapters.length;
    const totalTime = chapters.reduce((total, chapter) => total + calculateTotalTime(chapter.lectures), 0);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(state => state.user.accessToken);
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const favorites = JSON.parse(localStorage.getItem("favoriteItems"));
    const courseInCart = cartItems ? cartItems.some(item => item.courseId === course.courseId) : false;
    const isFavorite = favorites ? favorites.some(item => item.courseId === course.courseId) : false;
    const [isInCart, setIsInCart] = useState(courseInCart);
    const [isFavorited, setIsFavorited] = useState(isFavorite);
    const [open, setOpen] = useState(false);
    const handleCartClickNoLogin = () => {
        setOpen(true);
    };

    const handleBuyClickNologin = () => {
        setOpen(true); 
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleYes = () => {
        setOpen(false);
        navigate('/signIn');
    };
    const handleRemoveCart = async (courseId) => {
        const accessToken = localStorage.getItem('accessToken');
        await dispatch(removeFromCartApi({ courseId, accessToken }));
        const updatedCart = cartItems.filter(course => course.courseId !== courseId);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    };
    const handleRemoveFavorite = async (courseId) => {
        const accessToken = localStorage.getItem('accessToken');
        await dispatch(removeFromFavoritesApi({ courseId, accessToken }));
        const updatedFavorite = favorites.filter(course => course.courseId !== courseId);
        localStorage.setItem('favoriteItems', JSON.stringify(updatedFavorite));
    };

    const handleCartClick = async () => {
        if (accessToken) {
            if (isInCart) {
                navigate('/cart')
            } else {
                try {
                    if (isFavorited) {
                        await handleRemoveFavorite(course.courseId)
                        setIsFavorited(false)
                    }
                    await dispatch(addToCartApi({ courseId: course.courseId, accessToken })).unwrap()
                    setIsInCart(true)
                } catch (error) {
                    console.error('fail to add to cart', error)
                }
            }
        }
    }

    const handleFavoriteClick = async () => {
        if (accessToken) {
            const newFavoritedStatus = !isFavorited;
            setIsFavorited(newFavoritedStatus);
            if (isInCart) {
                await handleRemoveCart(course.courseId);
                setIsInCart(false);
            }
            if (newFavoritedStatus) {
                await dispatch(addToFavoritesApi({ courseId: course.courseId, accessToken })).unwrap();
                setIsFavorited(true)
            } else {
                await handleRemoveFavorite(course.courseId);
                setIsFavorited(false)
            }
        } else {
            navigate('/login');
        }
    };
    const handleBuyNow = () => {
        navigate('/checkout', { state: { course } });
    };
    return ReactDOM.createPortal(
        <Box sx={styles.cart}>
            <Box sx={styles.boxImage}>
                {course.thumbnail && (
                    <img
                        src={course.thumbnail}
                        alt="Course Image"
                        style={{ width: '346px', height: '200px' }}
                    />
                )}
            </Box>

            <Box sx={{ textAlign: 'center', mt: 2 }}>
                <Typography variant="h5" sx={{ fontWeight: 'bold', fontSize: '24px', color: '#3f51b5' }}>
                    {formatCurrency(course.price)}
                </Typography>
            </Box>

            <Box sx={{ textAlign: 'center', mt: 3 }}>
                {accessToken ? (
                    <Box>
                        <Box sx={styles.box1}>
                            <Button sx={styles.cart1} style={{ height: '50px' }} onClick={handleCartClick}>
                                {isInCart ? 'Go to Cart' : 'Add to Cart'}
                            </Button>
                            <Box sx={styles.circle} onClick={handleFavoriteClick}>
                                {isFavorited ? (
                                    <FavoriteIcon sx={{ ...styles.heart, transform: 'scale(1.1)' }} />
                                ) : (
                                    <FavoriteBorderIcon sx={styles.heart} />
                                )}
                            </Box>
                        </Box>
                        <Box sx={styles.box1}>
                            <Button variant="outlined" sx={styles.buyNowButton} style={{ height: '50px' }}
                            onClick={handleBuyNow}
                            >
                                Buy now</Button>
                        </Box>
                    </Box>

                ) : (
                    <Box>
                        <Box sx={styles.box1}>
                            <Button sx={{
                                backgroundColor: 'rgb(192, 66, 206)',
                                padding: '18px',
                                color: '#fff',
                                width: '90%',
                                fontWeight: 'bold',
                            }}
                                style={{ height: '50px' }} onClick={handleCartClickNoLogin}>
                                Add to Cart
                            </Button>
                        </Box>
                        <Box sx={styles.box1}>
                            <Button variant="outlined" sx={styles.buyNowButton}
                                style={{ height: '50px' }}
                                onClick={handleBuyClickNologin}
                            >
                                Buy now
                            </Button>
                        </Box>
                        <Dialog open={open} onClose={handleClose}>
                            <DialogTitle>Authentication Required</DialogTitle>
                            <DialogContent>
                                <DialogContentText>
                                    You must log in to proceed. Do you want to log in now?
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose} color="primary">
                                    No
                                </Button>
                                <Button onClick={handleYes} color="primary" autoFocus>
                                    Yes
                                </Button>
                            </DialogActions>
                        </Dialog>
                    </Box>
                )}
            </Box>

            <Box sx={styles1.box}>
                <Typography sx={styles1.typography}>This course includes:</Typography>
                <Box sx={styles1.iconAndTypo}>
                    <AccessTimeIcon sx={styles1.icon} />
                    <Typography>{totalTime.toFixed(2)} hour on-demand video</Typography>
                </Box>
                <Box sx={styles1.iconAndTypo}>
                    <MenuBookIcon sx={styles1.icon} />
                    <Typography>{totalChapters} sections</Typography>
                </Box>
                <Box sx={styles1.iconAndTypo}>
                    <TvIcon sx={styles1.icon} />
                    <Typography>Access on mobile and TV</Typography>
                </Box>
                <Box sx={styles1.iconAndTypo}>
                    <AllInclusiveIcon sx={styles1.icon} />
                    <Typography>Full lifetime access</Typography>
                </Box>
                <Box sx={styles1.iconAndTypo}>
                    <VerifiedIcon sx={styles1.icon} />
                    <Typography>Certificate of completion</Typography>
                </Box>
            </Box>
        </Box>,
        document.body
    );
};

export default CartPortal;
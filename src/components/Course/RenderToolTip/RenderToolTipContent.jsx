import { Box, Button, styled, Typography } from '@mui/material';
import PropTypes from 'prop-types';
import CheckSharpIcon from '@mui/icons-material/CheckSharp';
import FiberManualRecordSharpIcon from '@mui/icons-material/FiberManualRecordSharp';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import styles from './stylesRenderToolTip';
import { useDispatch, useSelector } from 'react-redux';
import { formatMonthYear } from '../.././../utils/dateFomatter';
import { useNavigate } from 'react-router-dom';
import { addToCartApi, removeFromCartApi } from '../../../store/cartSlice';
import { addToFavoritesApi, removeFromFavoritesApi } from '../../../store/favoritesSlice';
import { useState } from 'react';

RenderToolTipContent.propTypes = {
    course: PropTypes.object,
};

// Hiển thị tool tip
const DotIcon = styled(FiberManualRecordSharpIcon)(({ theme }) => ({
    fontSize: 'small',
    marginLeft: theme.spacing(1),
}));

function RenderToolTipContent({ course = {} }) {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const accessToken = useSelector(state => state.user.accessToken);
    const cartItems = JSON.parse(localStorage.getItem('cartItems'));
    const favorites = JSON.parse(localStorage.getItem("favoriteItems"));
    const courseInCart = cartItems ? cartItems.some(item => item.courseId === course.courseId) : false;
    const isFavorite = favorites ? favorites.some(item => item.courseId === course.courseId) : false;
    const [isInCart, setIsInCart] = useState(courseInCart);
    const [isFavorited, setIsFavorited] = useState(isFavorite);

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

    return (
        <Box>
            <Typography variant="subtitle1" sx={styles.courseName}>{course.name}</Typography>
            <Typography>
                <span style={styles.typo1}>Updated: </span>
                <span style={styles.typo2}>{formatMonthYear(course.createdAt)}</span>
            </Typography>
            <Typography variant="body2" sx={styles.hour}>
                {course.hour} total hours
                <DotIcon /><span>All level</span>
                <DotIcon /><span>Subtitles</span>
            </Typography>
            <Typography variant='body2' sx={{ fontSize: '16px' }}>{course.description}</Typography>
            <ul>
                {course.contents.split(";").slice(0, 3).map((item, index) => (
                    <li key={index}>
                        <CheckSharpIcon sx={styles.checkIcon} />
                        <Typography variant="body2" sx={{ fontSize: '16px' }}>{item}</Typography>
                    </li>
                ))}
            </ul>

            {accessToken && (
                <Box sx={styles.box}>
                    <Button sx={styles.cart} style={{ height: '50px' }} onClick={handleCartClick}>
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
            )}
        </Box>
    );
}

export default RenderToolTipContent;
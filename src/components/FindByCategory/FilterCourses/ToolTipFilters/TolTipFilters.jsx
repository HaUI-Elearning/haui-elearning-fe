import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "../../../Course/RenderToolTip/stylesRenderToolTip";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addToCartApi, fetchCartItems } from "../../../../store/cartSlice";
import {
  addToFavoritesApi,
  fetchFavoriteItems,
  removeFromFavoritesApi,
} from "../../../../store/favoritesSlice";

TooltipFilter.propTypes = {
  course: PropTypes.object,
};

function TooltipFilter({ course = {} }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.user.accessToken);
  const cartItems = useSelector((state) => state.cart.items);
  const favorites = useSelector((state) => state.favorites.items);

  const isInCart = cartItems?.some((item) => item.courseId === course.courseId);
  const isFavorited = favorites?.some(
    (item) => item.courseId === course.courseId
  );

  const handleCartClick = async () => {
    if (!accessToken) return;

    if (isInCart) {
      navigate("/cart");
    } else {
      await dispatch(
        addToCartApi({ courseId: course.courseId, accessToken })
      ).unwrap();
      await dispatch(fetchFavoriteItems(accessToken)).unwrap();
    }
  };

  const handleFavoriteClick = async () => {
    if (!accessToken) return;

    if (isFavorited) {
      await dispatch(
        removeFromFavoritesApi({ courseId: course.courseId, accessToken })
      ).unwrap();
      await dispatch(fetchCartItems(accessToken)).unwrap();
    } else {
      await dispatch(
        addToFavoritesApi({ courseId: course.courseId, accessToken })
      ).unwrap();
      await dispatch(fetchCartItems(accessToken)).unwrap();
    }
  };

  let actionButtons;

  if (accessToken) {
    if (course.enrolled || course.authorCourse) {
      actionButtons = (
        <Box sx={styles.box}>
          <Button
            variant="contained"
            sx={styles.cartEroll}
            style={{ height: "50px" }}
            onClick={() => navigate(`/courses/learn/${course.courseId}`)}
          >
            Học ngay
          </Button>
        </Box>
      );
    } else if (course.price > 0) {
      actionButtons = (
        <Box sx={styles.box}>
          <Button
            sx={styles.cart}
            style={{ height: "50px" }}
            onClick={handleCartClick}
          >
            {isInCart ? "Xem giỏ hàng" : "Thêm vào giỏ hàng"}
          </Button>
          <Box sx={styles.circle} onClick={handleFavoriteClick}>
            {isFavorited ? (
              <FavoriteIcon sx={{ ...styles.heart, transform: "scale(1.1)" }} />
            ) : (
              <FavoriteBorderIcon sx={styles.heart} />
            )}
          </Box>
        </Box>
      );
    } else {
      actionButtons = (
        <Box sx={styles.box}>
          <Button
            variant="outlined"
            sx={styles.cartEroll}
            style={{ height: "50px" }}
          >
            Ghi danh ngay
          </Button>
        </Box>
      );
    }
  } else {
    actionButtons = <></>;
  }
  return (
    <Box>
      <Typography sx={styles.title}>Nội dung bài học: </Typography>
      <ul>
        {course.contents
          .split(";")
          .slice(0, 3)
          .map((item, index) => (
            <li key={index}>
              <CheckSharpIcon sx={styles.checkIcon} />
              <Typography variant="body2" sx={{ fontSize: "14px" }}>
                {item}
              </Typography>
            </li>
          ))}
      </ul>
      {actionButtons}
    </Box>
  );
}

export default TooltipFilter;

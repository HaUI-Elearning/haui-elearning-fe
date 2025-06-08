import { Box, Button, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "../../../Course/RenderToolTip/stylesRenderToolTip";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { addToCartApi, removeFromCartApi } from "../../../../store/cartSlice";
import {
  addToFavoritesApi,
  removeFromFavoritesApi,
} from "../../../../store/favoritesSlice";

TooltipFilter.propTypes = {
  course: PropTypes.object,
};

function TooltipFilter({ course = {} }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.user.accessToken);
  const cartItems = JSON.parse(localStorage.getItem("cartItems"));
  const favorites = JSON.parse(localStorage.getItem("favoriteItems"));

  const courseInCart = cartItems
    ? cartItems.some((item) => item.courseId === course.courseId)
    : false;
  const isFavorite = favorites
    ? favorites.some((item) => item.courseId === course.courseId)
    : false;

  const [isInCart, setIsInCart] = useState(courseInCart);
  const [isFavorited, setIsFavorited] = useState(isFavorite);

  const handleRemoveCart = async (courseId) => {
    const accessToken = localStorage.getItem("accessToken");
    dispatch(removeFromCartApi({ courseId, accessToken }));
    const updatedCart = cartItems.filter(
      (course) => course.courseId !== courseId
    );
    localStorage.setItem("cartItems", JSON.stringify(updatedCart));
  };
  const handleRemoveFavorite = async (courseId) => {
    const accessToken = localStorage.getItem("accessToken");
    dispatch(removeFromFavoritesApi({ courseId, accessToken }));
    const updatedFavorite = favorites.filter(
      (course) => course.courseId !== courseId
    );
    localStorage.setItem("favoriteItems", JSON.stringify(updatedFavorite));
  };

  const handleCartClick = async () => {
    if (accessToken) {
      if (isInCart) {
        navigate("/cart");
      } else {
        try {
          if (isFavorited) {
            await handleRemoveFavorite(course.courseId);
            setIsFavorited(false);
          }
          await dispatch(
            addToCartApi({ courseId: course.courseId, accessToken })
          ).unwrap();
          setIsInCart(true);
        } catch (error) {
          console.error("fail to add to cart", error);
        }
      }
    }
  };

  const handleFavoriteClick = async () => {
    if (accessToken) {
      const newFavoritedStatus = !isFavorited;
      setIsFavorited(newFavoritedStatus);
      if (isInCart) {
        await handleRemoveCart(course.courseId);
        setIsInCart(false);
      }
      if (newFavoritedStatus) {
        await dispatch(
          addToFavoritesApi({ courseId: course.courseId, accessToken })
        ).unwrap();
        setIsFavorited(true);
      } else {
        await handleRemoveFavorite(course.courseId);
        setIsFavorited(false);
      }
    } else {
      navigate("/login");
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
          >
            Learn Now
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
            {isInCart ? "Go to Cart" : "Add to Cart"}
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
            Enroll Now
          </Button>
        </Box>
      );
    }
  } else {
    actionButtons = <></>;
  }
  return (
    <Box>
      <Typography sx={styles.title}>What you will learn </Typography>
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

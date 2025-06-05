import { Box, Button } from "@mui/material";
import styles from "..";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToCartApi, removeFromCartApi } from "../../../store/cartSlice";
import {
  addToFavoritesApi,
  removeFromFavoritesApi,
} from "../../../store/favoritesSlice";
import PropTypes from "prop-types";

export const CourseActions = ({ course, setOpen }) => {
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

  const handleCartClickNoLogin = () => {
    setOpen(true);
  };

  const handleBuyClickNologin = () => {
    setOpen(true);
  };
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
  const handleBuyNow = () => {
    navigate("/checkout", { state: { course } });
  };
  let actionButtons;

  if (accessToken) {
    if (course.enrolled) {
      actionButtons = (
        <Box sx={styles.box1}>
          <Button
            variant="contained"
            sx={styles.cart1}
            style={{ height: "50px" }}
            onClick={() => navigate(`/courses/learn/${course.courseId}`)}
          >
            Learn Now
          </Button>
        </Box>
      );
    } else if (course.price > 0) {
      actionButtons = (
        <>
          <Box sx={styles.box1}>
            <Button
              sx={styles.cart1}
              style={{ height: "50px" }}
              onClick={handleCartClick}
            >
              {isInCart ? "Go to Cart" : "Add to Cart"}
            </Button>
            <Box sx={styles.circle} onClick={handleFavoriteClick}>
              {isFavorited ? (
                <FavoriteIcon
                  sx={{ ...styles.heart, transform: "scale(1.1)" }}
                />
              ) : (
                <FavoriteBorderIcon sx={styles.heart} />
              )}
            </Box>
          </Box>
          <Box sx={styles.box1}>
            <Button
              variant="outlined"
              sx={styles.buyNowButton}
              style={{ height: "50px" }}
              onClick={handleBuyNow}
            >
              Buy now
            </Button>
          </Box>
        </>
      );
    } else {
      actionButtons = (
        <Box sx={styles.box1}>
          <Button
            variant="outlined"
            sx={styles.buyNowButton}
            style={{ height: "50px" }}
            onClick={handleBuyNow}
          >
            Enroll Now
          </Button>
        </Box>
      );
    }
  } else {
    if (course.price > 0) {
      actionButtons = (
        <>
          <Box sx={styles.box1}>
            <Button
              sx={{
                backgroundColor: "rgb(192, 66, 206)",
                padding: "18px",
                color: "#fff",
                width: "90%",
                fontWeight: "bold",
              }}
              style={{ height: "50px" }}
              onClick={handleCartClickNoLogin}
            >
              Add to Cart
            </Button>
          </Box>
          <Box sx={styles.box1}>
            <Button
              variant="outlined"
              sx={styles.buyNowButton}
              style={{ height: "50px" }}
              onClick={handleBuyClickNologin}
            >
              Buy now
            </Button>
          </Box>
        </>
      );
    } else {
      actionButtons = (
        <Box sx={styles.box1}>
          <Button
            variant="outlined"
            sx={styles.buyNowButton}
            style={{ height: "50px" }}
            onClick={handleBuyClickNologin}
          >
            Enroll Now
          </Button>
        </Box>
      );
    }
  }

  return (
    <Box sx={{ textAlign: "center", mt: 3 }}>
      {actionButtons}
    </Box>
  );
};

CourseActions.propTypes = {
  course: PropTypes.any,
  setOpen: PropTypes.any,
};

import { Box, Button } from "@mui/material";
import styles from "..";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToCartApi, fetchCartItems } from "../../../store/cartSlice";
import {
  addToFavoritesApi,
  fetchFavoriteItems,
  removeFromFavoritesApi,
} from "../../../store/favoritesSlice";
import PropTypes from "prop-types";

export const CourseActions = ({ course, setOpen }) => {
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

  const handleBuyNow = () => {
    navigate("/checkout", { state: { course } });
  };

  const handleCartClickNoLogin = () => {
    setOpen(true);
  };

  const handleBuyClickNologin = () => {
    setOpen(true);
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

  return <Box sx={{ textAlign: "center", mt: 3 }}>{actionButtons}</Box>;
};

CourseActions.propTypes = {
  course: PropTypes.any,
  setOpen: PropTypes.any,
};

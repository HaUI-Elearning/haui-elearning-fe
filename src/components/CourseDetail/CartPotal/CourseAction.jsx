import { Box, Button } from "@mui/material";
import styles from "..";
import { useNavigate } from "react-router-dom";

import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";

import PropTypes from "prop-types";
import { useCourseActions } from "../../../customHooks/useCourseAction";
import { createVNPayPayment } from "../../../apis/Payment/createVNPayPayment";

export const CourseActions = ({ course, setOpen }) => {
  const navigate = useNavigate();
  const {
    accessToken,
    isInCart,
    isFavorited,
    handleCartClick,
    handleFavoriteClick,
    handleEnrollClick,
  } = useCourseActions(course);

  const handleBuyNow = async () => {
    try {
      const courseIds = [course.courseId];
      console.log("Course id in payment:", courseIds);

      const res = await createVNPayPayment(courseIds, false);
      console.log("Link:", res.data.paymentUrl);
      setTimeout(() => {
        window.location.href = res.data.paymentUrl;
      }, 1000);
    } catch (error) {
      console.error("Err when create order:", error);
    }
  };

  const handleCartClickNoLogin = () => {
    setOpen(true);
  };

  const handleBuyClickNologin = () => {
    setOpen(true);
  };
  let actionButtons;

  if (accessToken) {
    if (course.enrolled || course.authorCourse) {
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
              sx={styles.cart2}
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
            sx={styles.enroll}
            style={{ height: "50px" }}
            onClick={handleEnrollClick}
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
              sx={styles.cart1}
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
            sx={styles.enroll}
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

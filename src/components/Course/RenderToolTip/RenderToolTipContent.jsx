import { Box, Button, styled, Typography } from "@mui/material";
import PropTypes from "prop-types";
import CheckSharpIcon from "@mui/icons-material/CheckSharp";
import FiberManualRecordSharpIcon from "@mui/icons-material/FiberManualRecordSharp";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import styles from "./stylesRenderToolTip";
import { useDispatch, useSelector } from "react-redux";
import { formatMonthYear } from "../.././../utils/dateFomatter";
import { useNavigate } from "react-router-dom";
import { addToCartApi, fetchCartItems } from "../../../store/cartSlice";
import {
  addToFavoritesApi,
  fetchFavoriteItems,
  removeFromFavoritesApi,
} from "../../../store/favoritesSlice";
import { enrollCourse } from "../../../apis/enrollCourseFree";

RenderToolTipContent.propTypes = {
  course: PropTypes.object,
};
const DotIcon = styled(FiberManualRecordSharpIcon)(({ theme }) => ({
  fontSize: "small",
  marginLeft: theme.spacing(1),
}));

function RenderToolTipContent({ course = {} }) {
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

  const handleEnrollClick = async () => {
    try {
      const enrolledCourse = await enrollCourse(course.courseId);
      navigate(`/enrolled/${enrolledCourse.courseId}`, {
        state: { enrolledCourse },
      });
    } catch (error) {
      alert("Fail to enroll course: " + (error.message || "Er occur"));
    }
  };

  let actionButtons;

  if (accessToken) {
    if (course.enrolled) {
      actionButtons = (
        <Box sx={styles.box}>
          <Button
            variant="contained"
            sx={styles.cartEroll}
            style={{ height: "50px" }}
            onClick={() => navigate(`/courses/learn/${course.courseId}`)}
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
            onClick={handleEnrollClick}
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
      <Typography variant="subtitle1" sx={styles.courseName}>
        {course.name}
      </Typography>
      <Typography>
        <span style={styles.typo1}>Updated: </span>
        <span style={styles.typo2}>{formatMonthYear(course.createdAt)}</span>
      </Typography>
      <Typography variant="body2" sx={styles.hour}>
        {course.hour} total hours
        <DotIcon />
        <span>All level</span>
        <DotIcon />
        <span>Subtitles</span>
      </Typography>
      <Typography variant="body2" sx={{ fontSize: "16px" }}>
        {course.description}
      </Typography>
      <ul>
        {course.contents
          .split(";")
          .slice(0, 3)
          .map((item, index) => (
            <li key={index}>
              <CheckSharpIcon sx={styles.checkIcon} />
              <Typography variant="body2" sx={{ fontSize: "16px" }}>
                {item}
              </Typography>
            </li>
          ))}
      </ul>

      {actionButtons}
    </Box>
  );
}

export default RenderToolTipContent;

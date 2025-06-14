// Reviews.jsx
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import useReviews from "../../../customHooks/userReviews";
import ReviewDialog from "./ReviewDialog/ReviewDialog";
import AllReviewStudy from "./AllReviewStudy/AllReviewStudy";
import "./Review.css";
import styles from "./ReviewDialog/styles";
const Reviews = ({ courseId }) => {
  const user = JSON.parse(useSelector((state) => state.user.userInfo));
  const userId = user.userId;

  const { listReview, myReview, handleAdd, handleUpdate, handleDelete } =
    useReviews({ courseId, userId });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [userReview, setUserReview] = useState("");
  const [rating, setRating] = useState(0);

  const openDialog = () => {
    setDialogOpen(true);
    setIsEditMode(false);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setIsEditMode(false);
  };

  const onAdd = async () => {
    if (!userReview.trim() || rating === 0) return;
    await handleAdd(userReview, rating);
    closeDialog();
  };

  const onUpdate = async () => {
    if (!userReview.trim() || rating === 0 || !myReview) return;
    await handleUpdate(myReview.reviewId, userReview, rating);
    closeDialog();
  };

  const onDelete = async () => {
    if (!myReview) return;
    await handleDelete(myReview.reviewId);
    setUserReview("");
    setRating(0);
    closeDialog();
  };

  useEffect(() => {
    if (dialogOpen) {
      setUserReview(myReview?.comment || "");
      setRating(myReview?.rating || 0);
    }
  }, [dialogOpen, myReview]);
  
  return (
    <Box mt={4}>
      <Button variant="contained" sx={styles.common} onClick={openDialog}>
        {myReview ? "View your review" : "Add your review"}
      </Button>

      <ReviewDialog
        open={dialogOpen}
        onClose={closeDialog}
        rating={rating}
        setRating={setRating}
        userReview={userReview}
        setUserReview={setUserReview}
        isEditMode={isEditMode}
        myReview={myReview}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
        toggleEdit={() => setIsEditMode(true)}
      />

      <Box mt={4}>
        <AllReviewStudy
          comments={listReview.map((r) => ({
            ...r,
            name: r.userId === userId ? "You" : r.name,
          }))}
          onSelectReview={() => {}}
        />
      </Box>
    </Box>
  );
};

Reviews.propTypes = {
  courseId: PropTypes.any,
};

export default Reviews;

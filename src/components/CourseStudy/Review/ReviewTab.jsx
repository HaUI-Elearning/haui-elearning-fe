// Reviews.jsx
import { useMemo, useState } from "react";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";
import PropTypes from "prop-types";
import useReviews from "../../../customHooks/userReviews";
import ReviewDialog from "./ReviewDialog/ReviewDialog";
import AllReviewStudy from "./AllReviewStudy/AllReviewStudy";
import "./Review.css";
import styles from "./ReviewDialog/styles"
const Reviews = ({ course }) => {
  const user = JSON.parse(useSelector((state) => state.user.userInfo));
  const userId = user.userId;
  const courseId = course.course.courseId;

  const reviewData = useMemo(
    () => course.comment?.listReview || [],
    [course.comment?.listReview]
  );

  const { reviewList, myReview, handleAdd, handleUpdate, handleDelete } =
    useReviews({ courseId, initialReviews: reviewData, userId });

  const [dialogOpen, setDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(0);

  const openDialog = () => {
    setDialogOpen(true);
    setIsEditMode(false);
    setComment(myReview?.comment || "");
    setRating(myReview?.rating || 0);
  };

  const closeDialog = () => {
    setDialogOpen(false);
    setIsEditMode(false);
  };

  const onAdd = async () => {
    if (!comment.trim() || rating === 0) return;
    await handleAdd(comment, rating);
    closeDialog();
  };

  const onUpdate = async () => {
    if (!comment.trim() || rating === 0 || !myReview) return;
    await handleUpdate(myReview.reviewId, comment, rating);
    closeDialog();
  };

  const onDelete = async () => {
    if (!myReview) return;
    await handleDelete(myReview.reviewId);
    setComment("");
    setRating(0);
    closeDialog();
  };

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
        comment={comment}
        setComment={setComment}
        isEditMode={isEditMode}
        myReview={myReview}
        onAdd={onAdd}
        onUpdate={onUpdate}
        onDelete={onDelete}
        toggleEdit={() => setIsEditMode(true)}
      />

      <Box mt={4}>
        <AllReviewStudy
          comments={reviewList.map((r) => ({
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
  course: PropTypes.shape({
    course: PropTypes.shape({
      courseId: PropTypes.number,
    }),
    comment: PropTypes.object,
  }),
};

export default Reviews;

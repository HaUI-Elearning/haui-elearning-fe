import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Box, TextField, Rating, Button, Typography } from "@mui/material";
import { reviewApi } from "../../../apis/addReview";
import ReviewFilter from "./ReviewFilter";
import "./Review.css";

const Reviews = ({ course }) => {
  const comment = course.comment || {};
  const id = course.course.courseId;

  const [filter, setFilter] = useState(comment?.listReview || []);

  const [newComment, setNewComment] = useState("");
  const [newRating, setNewRating] = useState(0);

  // trạng thái để biết có đang sửa hay không
  const [isEditMode, setIsEditMode] = useState(false);
  // lưu review hiện tại (review bạn vừa tạo hoặc chọn để sửa)
  const [currentReview, setCurrentReview] = useState(null);

  useEffect(() => {
    setFilter(comment?.listReview || []);
  }, [comment]);

  const handleSubmit = async () => {
    if (!newComment.trim() || newRating === 0) return;

    try {
      await reviewApi.addReview({
        courseId: id,
        rating: newRating,
        comment: newComment,
      });

      const newReview = {
        id: Date.now(),
        user: "Bạn mới 🤟",
        content: newComment,
        rating: newRating,
        date: new Date().toLocaleDateString(),
      };

      setFilter([newReview, ...filter]);
      setCurrentReview(newReview);
      setIsEditMode(true); 
    } catch (error) {
      console.error("❌ Lỗi gửi đánh giá:", error);
    }
  };

  // Hàm cập nhật review (PUT)
  const handleUpdate = async () => {
    if (!currentReview) return;
    if (!newComment.trim() || newRating === 0) return;

    try {
      await reviewApi.updateReview({
        reviewId: currentReview.id,
        rating: newRating,
        comment: newComment,
      });

      // Cập nhật lại review trong danh sách filter
      setFilter((prev) =>
        prev.map((r) =>
          r.id === currentReview.id
            ? { ...r, content: newComment, rating: newRating }
            : r
        )
      );
      setIsEditMode(false);
      setCurrentReview(null);
      setNewComment("");
      setNewRating(0);
    } catch (error) {
      console.error("❌ Lỗi cập nhật đánh giá:", error);
    }
  };

  // Hàm xóa review (DELETE)
  const handleDelete = async () => {
    if (!currentReview) return;
    try {
      await reviewApi.deleteReview(currentReview.id);
      setFilter((prev) => prev.filter((r) => r.id !== currentReview.id));
      setIsEditMode(false);
      setCurrentReview(null);
      setNewComment("");
      setNewRating(0);
    } catch (error) {
      console.error("❌ Lỗi xóa đánh giá:", error);
    }
  };

  // Hàm chọn review để sửa (ví dụ bạn có thể thêm UI list review để chọn)
  const handleSelectReview = (review) => {
    setCurrentReview(review);
    setNewComment(review.content);
    setNewRating(review.rating);
    setIsEditMode(true);
  };

  return (
    <Box display="flex" flexDirection="column" gap={4} mt={4}>
      {/* 🔶 Form đánh giá hoặc sửa */}
      <Box>
        <Typography variant="h6" gutterBottom>
          {isEditMode ? "Sửa đánh giá của bạn" : "Đánh giá khoá học ⭐"}
        </Typography>

        <Rating
          value={newRating}
          precision={0.5}
          onChange={(e, newValue) => setNewRating(newValue)}
        />

        <TextField
          label="Nhập đánh giá của bạn"
          multiline
          rows={3}
          fullWidth
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          sx={{ mt: 2 }}
        />

        {isEditMode ? (
          <>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpdate}
              sx={{ mt: 2, mr: 2 }}
            >
              Cập nhật đánh giá
            </Button>
            <Button
              variant="outlined"
              color="error"
              onClick={handleDelete}
              sx={{ mt: 2 }}
            >
              Xóa đánh giá
            </Button>
          </>
        ) : (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{ mt: 2 }}
          >
            Gửi đánh giá
          </Button>
        )}
      </Box>

      {/* 🔷 Danh sách đánh giá */}
      <Box>
        <ReviewFilter comments={filter} onSelectReview={handleSelectReview} />
      </Box>
    </Box>
  );
};

Reviews.propTypes = {
  course: PropTypes.shape({
    course: PropTypes.shape({
      courseId: PropTypes.number.isRequired,
    }),
    comment: PropTypes.object,
  }),
};

export default Reviews;

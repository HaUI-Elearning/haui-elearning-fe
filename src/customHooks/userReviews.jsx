import { useState, useEffect } from "react";
import { getCommentByCourseId } from "../apis/getCommentByCourseId";
import { sortReviewByUserFirst } from "../utils/sortReviewByUserFirst ";
import { addReview } from "../apis/addReview";
import { updateReview } from "../apis/updateReview";
import { deleteReview } from "../apis/deleteReview";

const useReviews = ({ courseId, userId }) => {
  const [listReview, setListReview] = useState([]);
  const [myReview, setMyReview] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await getCommentByCourseId(courseId);
        console.log("Lấy review từ API:", res);

        const sorted = sortReviewByUserFirst(res.listReview, userId);
        console.log("Review sau khi sort:", sorted);

        setListReview(sorted);

        const mine = sorted.find((r) => r.userId === userId) || null;
        console.log("Review của tôi:", mine);
        setMyReview(mine);
      } catch (err) {
        console.error("Lỗi khi fetch reviews:", err);
      }
    };

    fetchReviews();
  }, [courseId, userId]);

  const refreshReviews = async () => {
    try {
      const res = await getCommentByCourseId(courseId);
      console.log("Refresh lại danh sách review:", res);
      const sorted = sortReviewByUserFirst(res.listReview, userId);
      setListReview(sorted);
      const mine = sorted.find((r) => r.userId === userId) || null;
      setMyReview(mine);
      return { sorted, mine };
    } catch (err) {
      console.error("Lỗi khi refresh reviews:", err);
      return [];
    }
  };

  const handleAdd = async (comment, rating) => {
    try {
      const res = await addReview({ courseId, comment, rating });
      console.log("Thêm review mới:", res.data.comment);

      const { sorted, mine } = await refreshReviews();
      setMyReview(mine);
      return sorted;
    } catch (err) {
      console.error("Lỗi khi thêm review:", err);
      return [];
    }
  };

  const handleUpdate = async (reviewId, comment, rating) => {
    try {
      const res = await updateReview({ reviewId, comment, rating });
      console.log("Cập nhật review:", res.data.comment);

      const { sorted, mine } = await refreshReviews();
      setMyReview(mine);
      return sorted;
    } catch (err) {
      console.error("Lỗi khi cập nhật review:", err);
      return [];
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      setMyReview(null);
      await deleteReview(reviewId);
      console.log("Đã xoá review có ID:", reviewId);

      const sorted = await refreshReviews();
      return sorted;
    } catch (err) {
      console.error("Lỗi khi xoá review:", err);
      return [];
    }
  };

  return {
    listReview,
    myReview,
    handleAdd,
    handleUpdate,
    handleDelete,
  };
};

export default useReviews;

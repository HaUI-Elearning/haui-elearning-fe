import { useState } from "react";
import PropTypes from "prop-types";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Box,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import "./Review.css";

import StarFilter from "./StarFilter";
import { Star } from "@mui/icons-material";
import ReviewFilter from "./ReviewFilter";

const ReviewInMoreDialog = ({ onCommentFilter, comment }) => {
  const starOptions = [5, 4, 3, 2, 1];
  const [open, setOpen] = useState(false);
  const [selectedStar, setSelectedStar] = useState(null);
  const [filter, setFilter] = useState(comment?.listReview || []);
  const handleSelect = async (star) => {
    if (selectedStar === star) {
      setSelectedStar(null);
      const res = await onCommentFilter(null);
      setFilter(res);
    } else {
      setSelectedStar(star);
      const res1 = await onCommentFilter(star);
      setFilter(res1.data);
    }
  };

  return (
    <>
      <button className="view-all-reviews" onClick={() => setOpen(true)}>
        Xem thêm
      </button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
        PaperProps={{
          sx: {
            height: "80vh",
            p: 2,
          },
        }}
      >
        <DialogTitle>
          <h1 className="course-rating">
            <Star className="star-icon" />
            <span className="text-cmt">{comment.avgRatting} xếp hạng khóa học</span>
            <span className="dot">·</span>
            <span className="text-cmt">
              {comment.listReview?.length ?? 0} xếp hạng
            </span>
          </h1>
          <IconButton
            aria-label="close"
            onClick={() => setOpen(false)}
            sx={{ position: "absolute", right: 8, top: 8 }}
          >
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent>
          <Box display="flex" gap={2}>
            <Box width="30%">
              <StarFilter
                comment={comment}
                selectedStar={selectedStar}
                handleSelect={handleSelect}
                starOptions={starOptions}
                filter={filter}
              />
            </Box>

            <Box width="70%">
              <ReviewFilter comments={filter} />
            </Box>
          </Box>
        </DialogContent>
      </Dialog>
    </>
  );
};
ReviewInMoreDialog.propTypes = {
  onCommentFilter: PropTypes.func.isRequired,
  comment: PropTypes.object,
};
export default ReviewInMoreDialog;

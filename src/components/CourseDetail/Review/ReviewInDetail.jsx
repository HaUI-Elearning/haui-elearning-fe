import PropTypes from "prop-types";
import { useState } from "react"; // 👈 thêm useState
import { Star } from "@mui/icons-material";
import "./Review.css";
import Grid2 from "@mui/material/Unstable_Grid2";
import { Avatar, Container, IconButton, Typography } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatDateArrayToRelativeTime } from "../../../utils/formatDateArrayToDDMMYYYY";
import RenderStar from "../../Course/RenderStar/RenderStar";
import ReviewInMoreDialog from "./ReviewInMoreDialog";

const ReviewInDetail = ({ comment = {}, onCommentFilter }) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <div>
      <Typography variant="h5" className="course-rating">
        <Star className="star-icon" />
        <span className="text-cmt">{comment.avgRatting} xếp hạng khóa học</span>
        <span className="dot">·</span>
        <span className="text-cmt">
          {comment.listReview?.length ?? 0} xếp hạng
        </span>
      </Typography>

      {comment.listReview && comment.listReview.length > 0 ? (
        <Container>
          <Grid2 container spacing={2} className="comment-list">
            {comment.listReview.map((item, index) => {
              const isLongComment = item.comment.length > 150;
              let displayedComment = "";
              if (expanded) {
                displayedComment = item.comment;
              } else {
                displayedComment = item.comment.slice(0, 150);
                if (isLongComment) {
                  displayedComment += "...";
                }
              }

              return (
                <Grid2 xs={12} sm={6} md={4} key={index}>
                  <div className="review-card">
                    <div className="review-top">
                      <Avatar className="avatar">
                        {item.name?.charAt(0).toUpperCase()}
                      </Avatar>

                      <div className="review-info">
                        <div className="review-header">
                          <span className="user-name">{item.name}</span>
                          <IconButton size="small">
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </div>

                        <div className="review-meta">
                          <RenderStar numStars={item.rating} />
                          <span className="review-date">
                            {formatDateArrayToRelativeTime(item.createdAt)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <p className="review-content">{displayedComment}</p>

                    {isLongComment && (
                      <button
                        className="toggle-btn"
                        onClick={() => setExpanded((prev) => !prev)}
                      >
                        {expanded ? "Thu gọn ▲" : "Xem thêm ▼"}
                      </button>
                    )}
                  </div>
                </Grid2>
              );
            })}
          </Grid2>

          <ReviewInMoreDialog
            onCommentFilter={onCommentFilter}
            comment={comment}
          ></ReviewInMoreDialog>
        </Container>
      ) : (
        <p className="no-review">Khóa học này hiện chưa có đánh giá. </p>
      )}
    </div>
  );
};

ReviewInDetail.propTypes = {
  comment: PropTypes.object,
  onCommentFilter: PropTypes.func,
};

export default ReviewInDetail;

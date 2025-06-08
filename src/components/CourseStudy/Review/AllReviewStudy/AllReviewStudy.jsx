import PropTypes from "prop-types";
import { Avatar, Box, IconButton } from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Grid2 from "@mui/material/Unstable_Grid2";
import RenderStar from "../../../Course/RenderStar/RenderStar";
import { formatDateArrayToRelativeTime } from "../../../../utils/formatDateArrayToDDMMYYYY";
import "../Review.css";
import noReviewsImage from "../../../../assets/images/no-reviews.jpg";
const AllReviewStudy = ({ comments }) => {
  if (!comments || comments.length === 0) {
    return (
      <Box textAlign="center" color="#666">
        <img
          src={noReviewsImage}
          alt="No reviews"
          style={{ width: "250px", marginBottom: "16px", opacity: 0.7 }}
        />
      </Box>
    );
  }
  return (
    <Grid2 container spacing={1} className="comment-list">
      {comments.map((item, index) => (
        <Grid2 xs={12} key={index}>
          <div className="review-card-1">
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

              <p className="review-content">{item.comment}</p>
            </div>
          </div>
        </Grid2>
      ))}
    </Grid2>
  );
};

AllReviewStudy.propTypes = {
  comments: PropTypes.array.isRequired,
};

export default AllReviewStudy;

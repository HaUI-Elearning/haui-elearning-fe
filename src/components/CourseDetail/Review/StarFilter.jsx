import PropTypes from "prop-types";
import { Box, LinearProgress, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RenderStar from "../../Course/RenderStar/RenderStar";

const StarFilter = ({ comment, selectedStar, handleSelect, starOptions }) => {
  const totalReviews = comment?.listReview?.length || 0;

  return (
    <Box width="100%">
      <Box display="flex" flexDirection="column" gap={2}>
        {starOptions.map((star) => {
          const matchingReviews = comment.listReview.filter((r) => {
            if (star === 5) return r.rating === 5;
            if (star === 1) return r.rating < 2;
            return r.rating >= star && r.rating < star + 1;
          }).length;

          const percentage = totalReviews
            ? ((matchingReviews / totalReviews) * 100).toFixed(1)
            : 0;

          const isSelected = selectedStar === star;

          return (
            <Box key={star}>
              <Box
                sx={{
                  position: "relative",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "flex-start",
                  width: "100%",
                  pr: 4,
                  cursor: percentage === "0.0" ? "not-allowed" : "pointer",
                  backgroundColor: isSelected ? "#cce4fb" : "transparent",
                }}
                onClick={() => {
                  if (percentage !== "0.0") {
                    handleSelect(star);
                  }
                }}
              >
                <RenderStar numStars={star} />
                <span style={{ marginLeft: 8 }}>{`(${percentage}%)`}</span>

                {isSelected && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(star);
                    }}
                    size="small"
                    sx={{
                      position: "absolute",
                      right: 0,
                      top: "50%",
                      transform: "translateY(-50%)",
                      color: "#000",
                    }}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>

              <LinearProgress
                variant="determinate"
                value={Number(percentage)}
                sx={{
                  height: 6,
                  borderRadius: 5,
                  backgroundColor: "#f0f0f0",
                  "& .MuiLinearProgress-bar": {
                    backgroundColor: "#fbc02d",
                  },
                }}
              />
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

StarFilter.propTypes = {
  comment: PropTypes.object.isRequired,
  selectedStar: PropTypes.number,
  handleSelect: PropTypes.func.isRequired,
  starOptions: PropTypes.arrayOf(PropTypes.number).isRequired,
};

export default StarFilter;

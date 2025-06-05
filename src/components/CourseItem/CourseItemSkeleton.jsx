import PropTypes from "prop-types";
import { Box, Skeleton } from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";

SkeletonList.propTypes = {
  length: PropTypes.number,
};

function SkeletonList({ length = 16 }) {
  return (
    <Box>
      <Grid container spacing={2}>
        {Array.from(new Array(length)).map((_, index) => (
          <Grid xs={12} sm={6} md={3} key={index}>
            {" "}
            <Box padding={1}>
              <Skeleton variant="rectangular" width="100%" height={120} />
              <Skeleton />
              <Skeleton />
              <Skeleton width="40%" />
              <Skeleton width="60%" />
              <Skeleton width="20%" />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default SkeletonList;

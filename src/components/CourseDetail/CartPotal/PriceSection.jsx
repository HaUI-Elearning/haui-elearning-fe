import { Box, Typography } from "@mui/material";
import { formatCurrency } from "../../../utils/utils";
import PropTypes from "prop-types";
export const PriceSection = ({ price }) => (
  <Box sx={{ textAlign: "center", mt: 2 }}>
    <Typography
      variant="h5"
      sx={{ fontWeight: "bold", fontSize: "24px", color: "#3f51b5" }}
    >
      {formatCurrency(price)}
    </Typography>
  </Box>
);

PriceSection.propTypes = {
  price: PropTypes.number.isRequired,
};

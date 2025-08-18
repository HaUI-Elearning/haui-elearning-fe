import { Box, TextField, MenuItem, Button } from "@mui/material";
import PropTypes from "prop-types";
import styles from "./styles";
const PurchaseFilters = ({
  fromDate,
  toDate,
  status,
  setFromDate,
  setToDate,
  setStatus,
  onClear,
}) => {
  return (
    <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
      <TextField
        label="Từ ngày"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
        fullWidth
      />
      <TextField
        label="Đến ngày"
        type="date"
        InputLabelProps={{ shrink: true }}
        value={toDate}
        onChange={(e) => setToDate(e.target.value)}
        fullWidth
      />
      <TextField
        label="Trạng thái"
        select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        fullWidth
      >
        <MenuItem value="">Tất cả</MenuItem>
        <MenuItem value="success">Thành công</MenuItem>
        <MenuItem value="failed">Thất bại</MenuItem>
      </TextField>
      <Button variant="contained" sx={styles.common} onClick={onClear}>
        Đặt lại
      </Button>
    </Box>
  );
};
PurchaseFilters.propTypes = {
  fromDate: PropTypes.any,
  toDate: PropTypes.any,
  status: PropTypes.any,
  setFromDate: PropTypes.func,
  setToDate: PropTypes.func,
  setStatus: PropTypes.func,
  onClear: PropTypes.func,
};

export default PurchaseFilters;

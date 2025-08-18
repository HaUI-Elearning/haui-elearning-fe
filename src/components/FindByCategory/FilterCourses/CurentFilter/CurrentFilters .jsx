/* eslint-disable react/prop-types */
import { Typography, Box, Button } from "@mui/material";
import styles from "./styles";
const CurrentFilters = ({ filters, resetFilters }) => {
    return (
        <Box
            sx={styles.box}
        >
            <Typography
                variant="h6"
                sx={styles.typo1}
            >
                Bộ lọc hiện tại:
            </Typography>
            <Typography
                sx={styles.typo2}
            >
                {filters.isPaid ? `Giá: ${filters.isPaid === 'true' ? 'Trả phí' : 'Miễn phí'}` : 'Giá: Tất cả'}<br />
                {filters.hourRange.length > 0 ? `Thời lượng: ${filters.hourRange.join(', ')}` : 'Thời lượng: Tất cả'}<br />
                {filters.starRating ? `Xếp hạng: ${filters.starRating}` : 'Xếp hạng: Tất cả'}
            </Typography>
            <Button
                variant="outlined"
                color="secondary"
                onClick={resetFilters}
                sx={styles.button}
            >
                Xóa bộ lọc
            </Button>
        </Box>
    );
};

export default CurrentFilters;

/* eslint-disable react/prop-types */

import { Accordion, AccordionDetails, AccordionSummary, Box, Typography } from "@mui/material";
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styles from "./styles";
import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';
const FilterSection = ({ filters, setFilters, sortOption, setSortOption }) => {

    const handleFilterChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === 'checkbox') {
            setFilters((prev) => ({
                ...prev,
                [name]: checked
                    ? [...prev[name], value]
                    : prev[name].filter((item) => item !== value),
            }));
        } else {
            setFilters((prev) => ({ ...prev, [name]: value }));
        }
    };

    return (
        <Box sx={styles.box1}>
            <Typography sx={styles.typo}>Bộ lọc:</Typography>
            <Accordion sx={styles.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography sx={styles.typo1}>Giá</Typography>
                </AccordionSummary>
                <AccordionDetails sx={styles.accordionDetails}>
                    <label>
                        <input
                            type="radio"
                            name="isPaid"
                            value="true"
                            checked={filters.isPaid === 'true'}
                            onChange={handleFilterChange}
                            style={styles.input}
                        />
                        Trả phí
                    </label>
                    <br></br>
                    <label>
                        <input
                            type="radio"
                            name="isPaid"
                            value="false"
                            checked={filters.isPaid === 'false'}
                            onChange={handleFilterChange}
                            style={styles.input}
                        />
                        Miễn phí
                    </label>
                </AccordionDetails>
            </Accordion>
            <Accordion sx={styles.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={styles.accordionSummary}>
                    <Typography sx={styles.typo1}>Thời lượng (giờ)</Typography>
                </AccordionSummary>
                <AccordionDetails style={styles.accordionDetails}>
                    {['0-3','3-6', '6-9', '9-12', 'Lâu hơn'].map((range) => (
                        <div key={range}>
                            <label >
                                <input
                                    type="checkbox"
                                    name="hourRange"
                                    value={range}
                                    checked={filters.hourRange.includes(range)}
                                    onChange={handleFilterChange}
                                    style={styles.input}
                                />
                                {range}
                            </label>
                            <br></br>
                        </div>


                    ))}
                </AccordionDetails>
            </Accordion>
            <Accordion style={styles.accordion}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />} style={styles.accordionSummary}>
                    <Typography sx={styles.typo1} >Xếp hạng</Typography>
                </AccordionSummary>
                <AccordionDetails style={styles.accordionDetails}>
                    {['3', '4', '5'].map((rating) => (
                        <div key={rating}>
                            <label >
                                <input
                                    type="radio"
                                    name="starRating"
                                    value={rating}
                                    checked={filters.starRating === rating}
                                    onChange={handleFilterChange}
                                    style={styles.input}
                                />
                                {[...Array(5)].map((_, index) => (
                                    index < rating ? <StarIcon key={index} sx={{ color: 'gold' }} fontSize="17px" /> : <StarBorderIcon key={index} sx={{ color: 'gray' }} fontSize="17px" />
                                ))}
                                <Typography component="span" sx={{ ml: 0.5 }}>Từ {rating} trở lên</Typography>
                            </label>
                        </div>

                    ))}
                </AccordionDetails>
            </Accordion>
            <Box>
                <Typography sx={styles.typo}>Sắp xếp:</Typography>
            </Box>
            <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                style={{
                    display: "block",
                    width: "100%",
                    margin: "15px 0",
                    padding: "8px",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize:'17px'
                }}
            >
                <option value="all-course">Tất cả</option>
                <option value="highest-rate">Xếp hạng cao nhất</option>
                <option value="newest">Mới nhất</option>
            </select>
        </Box>
    );
};

export default FilterSection;
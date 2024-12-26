import { Box, Typography, Button, Dialog, DialogContent, DialogActions } from '@mui/material';
import PropTypes from 'prop-types';
import styles from '..';
LearnMore.propTypes = {
    handleClickOpen: PropTypes.func,
    handleClose: PropTypes.func,
    open: PropTypes.bool,
};

function LearnMore({handleClickOpen, handleClose, open}) {
    return (
        <Box sx={{ border: '1px solid black', padding: '15px' }}>
            <Typography sx={{ fontWeight: 'bolder', fontSize: '20px' }}> Top companies offer this course to their employees</Typography>
            <Typography sx={{ color: 'grey' }}>This course was selected for our collection of top-rated courses trusted by businesses worldwide.
                <span style={{ color: 'blue', cursor: 'pointer', marginLeft: '10px' }} onClick={handleClickOpen}>Learn more</span>

            </Typography>
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                <img src="https://download.logo.wine/logo/Nasdaq/Nasdaq-Logo.wine.png" alt="Company 1" style={{ width: '200px', height: 'auto' }} />
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Volkswagen_logo_2019.svg/1200px-Volkswagen_logo_2019.svg.png" alt="Company 2" style={{ width: '100px', height: 'auto' }} />
                <img src="https://banner2.cleanpng.com/20180423/ljq/kisspng-logo-box-business-management-company-5adde056322b24.1243016815244903262055.jpg" alt="Company 3" style={{ width: '100px', height: 'auto' }} />
                <img src="https://svtech.com.vn/wp-content/uploads/2023/04/NetApp-logo-776x400.png" alt="Company 4" style={{ width: '100px', height: 'auto' }} />
                <img src="https://e7.pngegg.com/pngimages/488/383/png-clipart-orange-and-white-eventbrite-logo-eventbrite-logo-icons-logos-emojis-tech-companies.png" alt="Company 5" style={{ width: '100px', height: 'auto' }} />
            </Box>
            {/* Dialog content */}
            <Dialog open={open} onClose={handleClose}>
                <DialogContent>
                    <Box sx={styles.dialogContentStyle}>
                        {/* Hình ảnh */}
                        <img
                            src="https://hardywood.vn/uploads/images/day-may-cong-nghiep-medal(1).png"
                            alt="Medal Image"
                            style={styles.imageStyle}
                        />

                        {/* Tiêu đề */}
                        <Typography variant="h5" sx={styles.titleStyle}>
                            Learn from our very best
                        </Typography>

                        {/* Nội dung */}
                        <Typography sx={styles.paragraphStyle}>
                            Our Udemy Business collection is a curation of top-rated courses for individuals and organizations to upskill and reach their goals.
                        </Typography>

                        <Typography sx={styles.sectionTitleStyle}>
                            Always fresh
                        </Typography>
                        <Typography sx={styles.paragraphStyle}>
                            We add to the collection based on market trends and feedback from learners and their organizations.
                        </Typography>

                        <Typography sx={styles.sectionTitleStyle}>
                            Data driven
                        </Typography>
                        <Typography sx={styles.paragraphStyle}>
                            We curate the collection based on unique data points to identify new and emerging skills.
                        </Typography>

                        <Typography sx={styles.sectionTitleStyle}>
                            Better every day
                        </Typography>
                        <Typography sx={styles.paragraphStyle}>
                            We continuously refine the collection to help learners and businesses stay one step ahead.
                        </Typography>
                    </Box>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Close
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default LearnMore;
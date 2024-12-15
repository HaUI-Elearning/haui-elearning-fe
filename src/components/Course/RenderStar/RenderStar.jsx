import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import PropTypes from 'prop-types';
import StarIcon from '@mui/icons-material/Star';
import styles from './styles';
RenderStar.propTypes = {
    numStars: PropTypes.number,
};
function RenderStar({numStars}) {
    const fullStars = Math.floor(numStars);
    const hasHalfStar = numStars % 1 >= 0.35;
    const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
    return (
        <div>
            {[...Array(fullStars)].map((_, index) => (
                <StarIcon
                    key={`full-${index}`}
                    style={styles.star}
                    fontSize='small'
                />
            ))}
            {hasHalfStar && (
                <StarHalfIcon
                    key="half"
                    style={styles.star}
                    fontSize='small'
                />
            )}
            {[...Array(emptyStars)].map((_, index) => (
                <StarBorderIcon
                    key={`empty-${index}`}
                    style={styles.emptyStar}
                    fontSize='small'
                />
            ))}
        </div>
    );
}

export default RenderStar;
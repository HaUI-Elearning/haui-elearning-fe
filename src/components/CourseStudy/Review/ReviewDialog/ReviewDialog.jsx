import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import styles from "./styles";
const ReviewDialog = ({
  open,
  onClose,
  rating,
  setRating,
  comment,
  setComment,
  isEditMode,
  myReview,
  onAdd,
  onUpdate,
  onDelete,
  toggleEdit,
}) => {
  let dialogTitle = "";
  if (isEditMode) {
    dialogTitle = "Edit your review";
  } else if (myReview) {
    dialogTitle = "View your review";
  } else {
    dialogTitle = "Add your review";
  }

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>
        {dialogTitle}
        <IconButton
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8, color: "gray" }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        <Rating
          value={rating}
          precision={0.5}
          onChange={(e, val) => {
            if (isEditMode || !myReview) setRating(val);
          }}
          readOnly={!isEditMode && !!myReview}
        />
        <TextField
          label="Write your review here"
          multiline
          rows={3}
          fullWidth
          value={comment}
          onChange={(e) => {
            if (isEditMode || !myReview) setComment(e.target.value);
          }}
          sx={{ mt: 2 }}
          InputProps={{ readOnly: !isEditMode && !!myReview }}
        />
      </DialogContent>

      <DialogActions>
        {!myReview && (
          <Button onClick={onAdd} sx={styles.common} variant="contained">
            Save
          </Button>
        )}

        {myReview && !isEditMode && (
          <>
            <Button onClick={toggleEdit} sx={styles.common} variant="contained">
              Edit
            </Button>
            <Button
              onClick={onDelete}
              sx={styles.delete}
              variant="outlined"
              color="error"
            >
              Delete
            </Button>
          </>
        )}

        {myReview && isEditMode && (
          <Button onClick={onUpdate} sx={styles.common} variant="contained">
            Update
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
};
ReviewDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  rating: PropTypes.number,
  setRating: PropTypes.func,
  comment: PropTypes.any,
  setComment: PropTypes.func,
  isEditMode: PropTypes.bool,
  myReview: PropTypes.any,
  onAdd: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  toggleEdit: PropTypes.func,
};

export default ReviewDialog;

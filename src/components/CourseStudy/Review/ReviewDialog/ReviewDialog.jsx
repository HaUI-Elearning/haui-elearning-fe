import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  Button,
  IconButton,
  Snackbar,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";
import styles from "./styles";

const ReviewDialog = ({
  open,
  onClose,
  rating,
  setRating,
  userReview, //review cua user o text
  setUserReview,
  isEditMode,
  myReview,// review cua user khi da co trong db
  onAdd,
  onUpdate,
  onDelete,
  toggleEdit,
}) => {
  const [isPendingDelete, setIsPendingDelete] = useState(false);
  const [countdown, setCountdown] = useState(5);
  const [intervalId, setIntervalId] = useState(null);

  const handleDeleteClick = () => {
    setIsPendingDelete(true);
    setCountdown(5);

    const id = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setIntervalId(id);
  };

  const handleUndoDelete = () => {
    clearInterval(intervalId);
    setIsPendingDelete(false);
    setCountdown(5);
  };

  useEffect(() => {
    if (countdown === 0 && isPendingDelete) {
      clearInterval(intervalId);
      setIsPendingDelete(false);
      onDelete();
    }
  }, [countdown, isPendingDelete, intervalId, onDelete]);

  useEffect(() => {
    return () => clearInterval(intervalId);
  }, [intervalId]);

  let dialogTitle = "";
  if (isEditMode) {
    dialogTitle = "Edit your review";
  } else if (myReview) {
    dialogTitle = "View your review";
  } else {
    dialogTitle = "Add your review";
  }

  return (
    <>
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
            value={userReview}
            onChange={(e) => {
              if (isEditMode || !myReview) setUserReview(e.target.value);
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
              <Button
                onClick={toggleEdit}
                sx={styles.common}
                variant="contained"
              >
                Edit
              </Button>
              <Button
                onClick={handleDeleteClick}
                sx={styles.delete}
                variant="outlined"
                color="error"
                disabled={isPendingDelete}
              >
                {isPendingDelete ? `Pending...` : "Delete"}
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

      <Snackbar
        open={isPendingDelete}
        message={`🕒 Review will be deleted in ${countdown} second${
          countdown > 1 ? "s" : ""
        }`}
        action={
          <Button color="secondary" size="small" onClick={handleUndoDelete}>
            UNDO
          </Button>
        }
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      />
    </>
  );
};

ReviewDialog.propTypes = {
  open: PropTypes.bool,
  onClose: PropTypes.func,
  rating: PropTypes.number,
  setRating: PropTypes.func,
  userReview: PropTypes.any,
  setUserReview: PropTypes.func,
  isEditMode: PropTypes.bool,
  myReview: PropTypes.any,
  onAdd: PropTypes.func,
  onUpdate: PropTypes.func,
  onDelete: PropTypes.func,
  toggleEdit: PropTypes.func,
};

export default ReviewDialog;

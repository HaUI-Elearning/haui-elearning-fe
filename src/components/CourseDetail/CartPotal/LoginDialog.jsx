import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

export const LoginDialog = ({ open, setOpen }) => {
  const navigate = useNavigate();
  const handleClose = () => setOpen(false);
  const handleYes = () => {
    setOpen(false);
    navigate("/signIn");
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Authentication Required</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You must log in to proceed. Do you want to log in now?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          No
        </Button>
        <Button onClick={handleYes} color="primary" autoFocus>
          Yes
        </Button>
      </DialogActions>
    </Dialog>
  );

  
};
LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

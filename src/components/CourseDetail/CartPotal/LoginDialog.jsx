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
      <DialogTitle>Yêu cầu xác thực</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Bạn phải đăng nhập để tiếp tục. Bạn có muốn đăng nhập ngay bây giờ không?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Hủy
        </Button>
        <Button onClick={handleYes} color="primary" autoFocus>
          Đồng ý
        </Button>
      </DialogActions>
    </Dialog>
  );

  
};
LoginDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
};

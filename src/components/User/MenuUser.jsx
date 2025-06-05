import { useState } from "react";
import Avatar from "@mui/material/Avatar";
import { deepOrange } from "@mui/material/colors";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/userSlice";
import LogoutIcon from "@mui/icons-material/Logout";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";

function MenuUser() {
  const [openMenu, setOpenMenu] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const parseInfo = JSON.parse(userInfo);
  const navigate = useNavigate();

  const handleMouseEnter = () => {
    setOpenMenu(true);
  };

  const handleMouseLeave = () => {
    setOpenMenu(false);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    setOpenMenu(false);
  };

  const handleLogoutClick = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    localStorage.removeItem("accessToken");
    navigate("/");
    setOpenDialog(false);
  };


    return (
        <Box>
            <Avatar
                sx={{
                    bgcolor: deepOrange[500],
                    cursor: 'pointer',
                    marginRight: '40px',
                    
                }}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                TL
            </Avatar>


      {openMenu && (
        <Box
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          style={{
            position: "absolute",
            backgroundColor: "white",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
            borderRadius: "4px",
            zIndex: 17,
            width: "250px",
            padding: "10px",
            right: "10px",
          }}
        >
          <Grid container alignItems="center" padding={1}>
            <Grid item>
              <Avatar>TL</Avatar>
            </Grid>
            <Grid item marginLeft={1}>
              <Typography>{parseInfo.name}</Typography>
              <Typography>{parseInfo.email}</Typography>
            </Grid>
          </Grid>
          <ul style={{ listStyleType: "none", padding: 0, margin: 0 }}>
            {[
              { text: "Public profile", path: "/my-profile" },
              { text: "My learning", path: "/my-course/my-learning" },
              { text: "My cart", path: "/cart" },
              { text: "Wishlist", path: "/my-course/my-wishlist" },
              { text: "Purchase history", path: "/purchase-history" },
              { text: "Log out", path: null, onClick: handleLogoutClick },
            ].map((item) => (
              <li
                key={item.text}
                style={{
                  padding: 0,
                  margin: 0,
                  border: "none",
                  background: "none",
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    if (item.path) {
                      handleMenuItemClick(item.path);
                    } else if (item.onClick) {
                      item.onClick();
                    }
                  }}
                  style={{
                    width: "100%",
                    textAlign: "left",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: "10px",
                    borderBottom: "1px solid #f0f0f0",
                    transition: "background-color 0.2s ease",
                    font: "inherit",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#f5f5f5")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                  tabIndex={0}
                >
                  {item.text}
                </button>
              </li>
            ))}
          </ul>
        </Box>
      )}

      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        PaperProps={{
          sx: {
            borderRadius: 2,
            p: 3,
            maxWidth: 420,
            mx: "auto",
          },
        }}
      >
        <Box sx={{ display: "flex", justifyContent: "center", mb: 2 }}>
          <WarningAmberOutlinedIcon color="warning" sx={{ fontSize: 50 }} />
        </Box>

        <DialogTitle
          sx={{
            fontWeight: 700,
            textAlign: "center",
            fontSize: "1.4rem",
            mb: 1,
            color: "text.primary",
          }}
        >
          Are you sure?
        </DialogTitle>

        <DialogContent sx={{ px: 3 }}>
          <DialogContentText
            sx={{
              textAlign: "center",
              fontSize: "1rem",
              color: "text.secondary",
            }}
          >
            You will be logged out of your account. Any unsaved progress may be
            lost.
          </DialogContentText>
        </DialogContent>

        <DialogActions
          sx={{
            justifyContent: "center",
            mt: 3,
            gap: 2,
            px: 2,
          }}
        >
          <Button
            onClick={handleCloseDialog}
            variant="outlined"
            sx={{
              px: 3,
              py: 1,
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            Cancel
          </Button>

          <Button
            onClick={handleConfirmLogout}
            variant="contained"
            color="error"
            startIcon={<LogoutIcon />}
            sx={{
              px: 3,
              py: 1,
              borderRadius: "999px",
              textTransform: "none",
              fontWeight: 600,
              fontSize: "0.95rem",
            }}
          >
            Log out
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default MenuUser;

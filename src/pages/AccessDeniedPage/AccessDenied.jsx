import { Box, Button, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import accessDenied from "../../assets/images/accessDenied.jpg";
const AccessDeniedPage = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: "80vh",
        bgcolor: "#fdfbe4",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        p: 4,
      }}
    >
      <img
        src={accessDenied}
        alt="Access Denied"
        style={{ width: "80%", maxWidth: 500, marginBottom: 20 }}
      />

      <Typography variant="body1" color="textSecondary" gutterBottom>
        You do not have permission to view this course. Please make sure you are
        enrolled.
      </Typography>
      <Button
        variant="contained"
        size="large"
        sx={{
          backgroundColor: "#A435F0",
          "&:hover": { backgroundColor: "#9228B3" },
          px: 4,
          py: 1.5,
          fontWeight: "bold",
          fontSize: "1rem",
          borderRadius: "12px",
          marginTop: "10px",
          marginBottom: "10px",
        }}
        onClick={() => navigate("/")}
      >
        Back to Homepage
      </Button>
    </Box>
  );
};

export default AccessDeniedPage;

import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import PNF from "../../assets/images/PNF.jpg";

const NotFoundPage = () => {
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
      {/* 🖼 Illustration */}
      <Box
        component="img"
        src={PNF}
        alt="Page not found"
        sx={{
          width: { xs: "70%", sm: "350px" },
          mb: 4,
        }}
      />

      <Typography
        variant="h3"
        sx={{
          fontWeight: "bold",
          color: "#A435F0",
          mb: 1,
        }}
      >
        Trang không tìm thấy!
      </Typography>

      <Typography
        variant="body1"
        sx={{
          maxWidth: 420,
          mb: 4,
          color: "text.secondary",
        }}
      >
        Chúng tôi không tìm thấy nội dung bạn đang tìm. <br /> Nó có thể đã bị
        di chuyển hoặc không còn tồn tại 🚫
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
        }}
        onClick={() => navigate("/")}
      >
       Quay lại trang chủ
      </Button>
    </Box>
  );
};

export default NotFoundPage;

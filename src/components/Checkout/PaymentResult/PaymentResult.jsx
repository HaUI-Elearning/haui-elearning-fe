import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Box, Typography, Snackbar, Alert } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import { fetchCartItems } from "../../../store/cartSlice";
import { fetchPaymentResult } from "../../../apis/Payment/paymentResult";
import paymentSuccess from "../../../assets/images/paymentsuccess.jpg";
import paymentFail from "../../../assets/images/paymentfail.jpg";

import styles from "./styles";
export default function PaymentResult() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [status, setStatus] = useState("loading");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);

  useEffect(() => {
    if (!location.search) {
      navigate("/", { replace: true });
      return;
    }

    const checkPayment = async () => {
      try {
        const msg = await fetchPaymentResult(location.search);
        setMessage(msg);

        if (msg.includes("Payment successful!")) {
          setStatus("success");

          const result = await dispatch(
            fetchCartItems(localStorage.getItem("accessToken"))
          ).unwrap();
          const updatedCart = result.payload || [];
          localStorage.setItem("cartItems", JSON.stringify(updatedCart));
        } else {
          setStatus("error");
        }

        setOpenSnackbar(true);

        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      } catch (err) {
        console.error("Payment verification error:", err);
        setMessage(`Transaction failed: ${err}`);
        setStatus("error");
        setOpenSnackbar(true);
        setTimeout(() => {
          window.location.replace("/");
        }, 2000);
      }
    };

    checkPayment();
  }, [location.search, dispatch, navigate]);

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <Box sx={styles.container}>
      {status === "loading" ? (
        <>
          <CircularProgress />
          <Typography variant="h6">⏳Đang xác minh thanh toán...</Typography>
        </>
      ) : (
        <>
          <img
            src={status === "success" ? paymentSuccess : paymentFail}
            alt="payment status"
            style={styles.image}
          />
          <Typography variant="h5" fontWeight={600}>
            {status === "success"
              ? "Thanh toán thành công!"
              : "Thanh toán thất bại!"}
          </Typography>
          <Typography variant="body1" color="text.secondary">
            {message}
          </Typography>
        </>
      )}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={status === "success" ? "success" : "error"}
          sx={styles.alert}
        >
          {status === "success"
            ? "Thanh toán thành công! Đang chuyển hướng về trang chủ..."
            : "Thanh toán thất bại! Đang chuyển hướng về trang chủ..."}
        </Alert>
      </Snackbar>
    </Box>
  );
}

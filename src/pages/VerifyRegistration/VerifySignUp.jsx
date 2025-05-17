import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import VerifySignUpForm from "../../components/VerifySignUp/VerifySignUpForm";
import SnackbarAlert from "../../common/SnackbarAlert";
import logo from "../../assets/images/logo.png";
import { verifySignUpUser } from "../../apis/verifySignUp";
import { resendOtpSignUp } from "../../apis/resendOtp";

const VerifySignUp = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const emailUser = localStorage.getItem("emailRegister");
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (formData) => {
    try {
      setLoading(true);
      const payload = {
        otp: formData.otp,
      };
      const res = await verifySignUpUser(payload);
      console.log("Verification successful!", res);
      setSnackbar({
        open: true,
        message: "Verification successful! Please log in again.",
        severity: "success",
      });
      localStorage.removeItem("emailRegister");
      setCountdown(60);
      setTimeout(() => navigate("/signIn"), 2000);
    } catch (err) {
      console.error("Verification error:", err);
      const message = err || "Verification failed!";
      setSnackbar({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleResend = async () => {
    try {
      setResendLoading(true);
      const payload = {
        email: emailUser,
      };
      const res = await resendOtpSignUp(payload);
      console.log("OTP resend successful!", res);
      setSnackbar({
        open: true,
        message: "OTP resend successful!",
        severity: "success",
      });
      setCountdown(60);
    } catch (err) {
      let message = "";

      if (err.error === "Bạn đã gửi quá số lần OTP cho REGISTER trong ngày.") {
        message = "You have sent too many OTPs for REGISTER today!";
      } else {
        message = "Failed to resend OTP!";
      }
      setSnackbar({
        open: true,
        message,
        severity: "error",
      });
    } finally {
      setResendLoading(false);
    }
  };
  useEffect(() => {
    if (countdown === 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  return (
    <div className="container">
      <div className="box">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <VerifySignUpForm
          onSubmit={handleSubmit}
          onResend={handleResend}
          loading={loading}
          resendLoading={resendLoading}
          countdown={countdown}
          emailUser={emailUser}
        />
      </div>

      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};

export default VerifySignUp;

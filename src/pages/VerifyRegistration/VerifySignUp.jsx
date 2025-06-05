import { useNavigate } from "react-router-dom";

import VerifySignUpForm from "../../components/VerifySignUp/VerifySignUpForm";
import SnackbarAlert from "../../common/SnackbarAlert";
import logo from "../../assets/images/logo.png";
import { verifySignUpUser } from "../../apis/verifySignUp";
import useResendOtp from "../../customHooks/useResendOtp";
import { useState } from "react";

const VerifySignUp = () => {
  const navigate = useNavigate();
  const emailUser = localStorage.getItem("email");
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [loading, setLoading] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  const notify = (message, severity = "success") => {
    setSnackbar({
      open: true,
      message,
      severity,
    });
  };

  const { resend, resendLoading, countdown } = useResendOtp();
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
      localStorage.removeItem("email");
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

  return (
    <div className="container">
      <div className="box">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>
        <VerifySignUpForm
          onSubmit={handleSubmit}
          onResend={() => resend(emailUser, notify)}
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

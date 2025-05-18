import { useEffect, useState } from "react";
import ForgotPasswordStepper from "../../components/ForgotPassword/ForgotPasswordStepper";
import SnackbarAlert from "../../common/SnackbarAlert";
import { sendOtpForgotPassword } from "../../apis/sendForgotPasswordOtp";
import { resendOtpForgotPassword } from "../../apis/resendForgotPasswordOtp";
import { verifyOtpForgotPassword } from "../../apis/verifyForgotPassword";
import { changePassword } from "../../apis/changePassword";
import { useNavigate } from "react-router-dom";
import useResendOtp from "../../customHooks/useResendOtp";
const ForgotPassPage = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const [sendLoading, setSendLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [verifyLoading, setVerifyLoading] = useState(false);
  const [changePassLoading, setChangePassLoading] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [otpVerified, setOtpVerified] = useState("");

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
  //resend OTP vêrify email
  const { resend } = useResendOtp();

  const handleSend = async (formData) => {
    try {
      setSendLoading(true);
      const payload = {
        email: formData.email,
      };
      localStorage.setItem("emailForgot", formData.email);
      console.log("Sending OTP to:", localStorage.getItem("emailForgot"));
      await sendOtpForgotPassword(payload);
      setCountdown(60);
      setSnackbar({
        open: true,
        message: "Send OTP successful.",
        severity: "success",
      });

      return true;
    } catch (err) {
      let message = "";
      console.error("Send error:", err);

      if (
        err.error ===
        "Bạn đã gửi quá số lần OTP cho FORGOT_PASSWORD trong ngày."
      ) {
        message = "Oops! You've hit the daily limit for OTP requests.";
      } else if (err.error === "Email does not exist..") {
        message = "Email does not exist. Please check again.";
      } else if (err.error === "User not verify") {
        message = "Please go to verify your account first.";

        setTimeout(() => {
          const resendTo = localStorage.getItem("emailForgot");
          localStorage.setItem("emailRegister", resendTo);
          resend(localStorage.getItem("emailRegister"), notify);

          navigate("/verify-email");
        }, 2000);
      } else {
        message = "Failed to resend OTP!";
      }
      setSnackbar({
        open: true,
        message,
        severity: "error",
      });
      return false;
    } finally {
      setSendLoading(false);
    }
  };
  const handleResend = async () => {
    let message = "";
    try {
      setResendLoading(true);
      const payload = {
        email: localStorage.getItem("emailForgot"),
      };
      console.log("Resending OTP to:", payload);
      const res = await resendOtpForgotPassword(payload);

      console.log("OTP resend successful!", res);

      setSnackbar({
        open: true,
        message: "OTP resend successful!",
        severity: "success",
      });
      setCountdown(60);
      return true;
    } catch (err) {
      console.error("Resend error:", err);

      if (
        err.error ===
        "Bạn đã gửi quá số lần OTP cho FORGOT_PASSWORD trong ngày."
      ) {
        message = "Oops! You've hit the daily limit for OTP requests.";
      } else if (
        err === "Account not verified. Please verify your email first."
      ) {
        message = "Please go to verify your account first.";
        setTimeout(() => {
          navigate("/verify-email");
        }, 2000);
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

  const handleVerify = async (formData) => {
    try {
      setVerifyLoading(true);
      const payload = {
        otp: formData.otp,
      };
      const res = await verifyOtpForgotPassword(payload);
      console.log("Verify successful!", res);
      setSnackbar({
        open: true,
        message: "Verify successful.",
        severity: "success",
      });
      setOtpVerified(formData.otp);
      return true;
    } catch (err) {
      console.error("Verify error:", err);
      const message = err.error || "Verify failed!";
      setSnackbar({
        open: true,
        message,
        severity: "error",
      });
      return false;
    } finally {
      setVerifyLoading(false);
    }
  };
  const handleChangePass = async (formData) => {
    try {
      setChangePassLoading(true);
      const payload = {
        otp: otpVerified,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
      };
      const res = await changePassword(payload);
      console.log("Change password successful!Please sign in again!", res);
      setSnackbar({
        open: true,
        message: "Change password successful! Please sign in again!",
        severity: "success",
      });
      localStorage.removeItem("emailForgot");
      setTimeout(() => navigate("/signIn"), 2000);
      return true;
    } catch (err) {
      console.error("Change error:", err);
      const message = "OTP expried or invalid! Get new OTP!";
      setSnackbar({
        open: true,
        message,
        severity: "error",
      });
      return false;
    } finally {
      setChangePassLoading(false);
    }
  };

  return (
    <div>
      <ForgotPasswordStepper
        onSend={handleSend}
        onResend={handleResend}
        onVerify={handleVerify}
        onChangePass={handleChangePass}
        sendLoading={sendLoading}
        resendLoading={resendLoading}
        verifyLoading={verifyLoading}
        changePassLoading={changePassLoading}
        countdown={countdown}
        emailUser={localStorage.getItem("emailForgot")}
        otpVerified={otpVerified}
      />

      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};

export default ForgotPassPage;

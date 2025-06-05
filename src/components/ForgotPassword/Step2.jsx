import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { verifyOtpForgotPasswordSchema } from "../../utils/emailForgotPassword";
import OtpInput from "../../common/OtpInput/OtpInput "
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./Stepper.css";

const Step2 = ({
  onNext,
  onResend,
  onVerify,
  resendLoading,
  verifyLoading,
  countdown,
  emailUser,
}) => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifyOtpForgotPasswordSchema),
    mode: "onTouched",
  });

  const handleOtpChange = (code) => setValue("otp", code);

  let resendButtonContent =
    countdown > 0 ? (
      `Resend OTP in ${countdown}s`
    ) : (
      <span className="resend">Resend OTP</span>
    );

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        console.log(data.otp);
        const ok = await onVerify(data);
        if (ok) onNext();
      })}
      noValidate
    >
      <h1 className="title">Check Your Inbox</h1>
      <p className="description">
        Enter the 6‑digit code we sent to{" "}
        <span className="email">{emailUser}</span>
        <br /> to verify your email first.
      </p>

      <input type="hidden" {...register("otp")} />
      <OtpInput length={6} onChange={handleOtpChange} />

      {errors.otp && <p className="errorMsg">{errors.otp.message}</p>}

      <button type="submit" className="button-submitotp">
        {verifyLoading ? "Is submitting..." : "Verify OTP"}
      </button>

      <button
        type="button"
        className={`button-resendotp ${
          countdown > 0 || resendLoading ? "disabled" : ""
        }`}
        onClick={onResend}
        disabled={resendLoading || countdown > 0}
      >
        {resendButtonContent}
      </button>

      <div>
        <ArrowBackIcon
          style={{ verticalAlign: "middle", marginRight: "5px" }}
        />
        <button
          className="back-to-login"
          onClick={() => {
            localStorage.removeItem("email");
            navigate("/signIn");
          }}
        >
          Back to login
        </button>
      </div>
    </form>
  );
};

Step2.propTypes = {
  onNext: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
  onVerify: PropTypes.func.isRequired,
  resendLoading: PropTypes.bool,
  verifyLoading: PropTypes.bool,
  countdown: PropTypes.number,
  emailUser: PropTypes.string.isRequired,
};

export default Step2;

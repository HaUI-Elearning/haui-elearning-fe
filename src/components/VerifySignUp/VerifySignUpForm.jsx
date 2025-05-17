import PropTypes from "prop-types";
import { verifySignUpSchema } from "../../utils/verifySignUpValidate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./styles.css";
import OtpInput from "../../common/OtpInput ";
const VerifySignUpForm = ({
  onSubmit,
  onResend,
  loading,
  resendLoading,
  countdown,
  emailUser,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(verifySignUpSchema),
    mode: "onTouched",
  });
  const handleOtpChange = (code) => setValue("otp", code);

  let resendButtonContent;
  if (resendLoading) {
    resendButtonContent = "Is resending...";
  } else if (countdown > 0) {
    resendButtonContent = `Resend OTP in ${countdown}s`;
  } else {
    resendButtonContent = <span className="resend">Resend OTP</span>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="title">Check Your Inbox</h1>
      <p className="description">
        Enter the 6-digit code we sent to{" "}
        <span className="email">{emailUser}</span> <br></br> to finish your sign
        up.
      </p>
      <input type="hidden" {...register("otp")} />
      <OtpInput length={6} onChange={handleOtpChange} />
      {errors.otp && <p className="errorMsg">{errors.otp.message}</p>}
      <br />
      <button type="submit" className="button-submit">
        {loading ? "Is submitting..." : "Submit"}
      </button>

      <button
        type="button"
        className={`button-resend ${
          countdown > 0 || resendLoading ? "disabled" : ""
        }`}
        onClick={onResend}
        disabled={resendLoading || countdown > 0}
      >
        {resendButtonContent}
      </button>
    </form>
  );
};
VerifySignUpForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  onResend: PropTypes.func,
  loading: PropTypes.bool,
  resendLoading: PropTypes.bool,
  countdown: PropTypes.number.isRequired,
  emailUser: PropTypes.string.isRequired,
};

export default VerifySignUpForm;

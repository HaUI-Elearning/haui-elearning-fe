import PropTypes from "prop-types";
import { verifySignUpSchema } from "../../utils/verifySignUpValidate";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import "./styles.css";
import OtpInput from "../../common/OtpInput/OtpInput ";
const VerifySignUpForm = ({
  onSubmit,
  onResend,
  loading,
  resendLoading,
  countdown,
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
    resendButtonContent = "Đang gửi lại..";
  } else if (countdown > 0) {
    resendButtonContent = `Gửi lại OTP sau ${countdown}s`;
  } else {
    resendButtonContent = <span className="resend">Gửi lại mã OTP</span>;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h1 className="title">Kiểm tra hộp thư</h1>
      <p className="description">
        Vui lòng nhập mã 6 số gửi đến email để hoàn tất đăng ký.
      </p>
      <input type="hidden" {...register("otp")} />
      <OtpInput length={6} onChange={handleOtpChange} />
      {errors.otp && <p className="errorMsg">{errors.otp.message}</p>}
      <br />
      <button type="submit" className="button-submit">
        {loading ? "Đang gửi..." : "Gửi"}
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
};

export default VerifySignUpForm;

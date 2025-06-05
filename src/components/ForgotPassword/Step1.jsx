
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import InputField from "../../common/InputField";
import { MdEmail } from "react-icons/md";
import { yupResolver } from "@hookform/resolvers/yup";
import { sendEmailForgotPasswordSchema } from "../../utils/emailForgotPassword";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useNavigate } from "react-router-dom";
import "./Stepper.css"
const Step1 = ({ onNext, onSend, sendLoading }) => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(sendEmailForgotPasswordSchema),
    mode: "onTouched",
  });

  return (
    <form
      onSubmit={handleSubmit(async (data) => {
        const ok = await onSend(data);
        if (ok) {
          onNext();}
      })}
      noValidate
      className="form-step"
    >
      <h1 className="title">Forgot password?</h1>
      <p className="description">
        No worries! Just enter your email address and we will send you an OTP to
        reset your password.
        <br></br> If you dont see it, please check your spam folder.
      </p>
      <InputField
        control={control}
        name="email"
        placeholder="Email"
        icon={MdEmail}
        defaultValue=""
        className="input-field"
      />
      {errors.email && <p className="errorMsg">{errors.email.message}</p>}
      <br />
      <button type="submit" className="button-sendotp">
        {sendLoading ? "Is sending..." : "Get OTP"}
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

Step1.propTypes = {
  onNext: PropTypes.func.isRequired,
  onSend: PropTypes.func.isRequired,
  sendLoading: PropTypes.bool.isRequired,
};

export default Step1;

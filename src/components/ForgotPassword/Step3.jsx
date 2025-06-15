// Step3.jsx
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { Box } from "@mui/material";
import InputField from "../../common/InputField";
import { MdLock } from "react-icons/md";
import "./Stepper.css";
import { resetPasswordSchema } from "../../utils/emailForgotPassword";

export default function Step3({ onChangePass, changePassLoading, onBack, onResend }) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(resetPasswordSchema),
    mode: "onTouched",
  });

  const submitHandler = async (values) => {
    const ok = await onChangePass(values);
    if (ok) {
      console.log("Change password successful! Please sign in again!");
    } else {
      console.log("Change password failed!");
      onResend();
      onBack();
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate>
      <h1 className="title">Create new password</h1>
      <p className="description">
        Your new password must be different from your previous passwords.
      </p>

      <InputField
        control={control}
        name="password"
        placeholder="New password"
        icon={MdLock}
        type="password"
        defaultValue=""
      />
      {errors.password && <p className="errorMsg">{errors.password.message}</p>}

      <InputField
        control={control}
        name="confirmPassword"
        placeholder="Confirm password"
        icon={MdLock}
        type="password"
        defaultValue=""
      />
      {errors.confirmPassword && (
        <p className="errorMsg">{errors.confirmPassword.message}</p>
      )}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <button
          className="button-submit3"
          type="submit"
          disabled={changePassLoading}
        >
          {changePassLoading ? "Is submitting..." : "Submit"}
        </button>
      </Box>
    </form>
  );
}

Step3.propTypes = {
  onChangePass: PropTypes.func.isRequired,
  changePassLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
  onResend: PropTypes.func.isRequired,
};

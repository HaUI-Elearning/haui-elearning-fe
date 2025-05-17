// Step3.jsx
import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button } from "@mui/material";
import InputField from "../../common/InputField";
import { MdLock } from "react-icons/md";

const schema = yup
  .object({
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu mới 😅")
      .min(6, "Tối thiểu 6 ký tự nha!"),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref("password")], "Mật khẩu không khớp ❌")
      .required("Nhập lại mật khẩu đi nào!"),
  })
  .required();

export default function Step3({
  onChangePass,

  changePassLoading,
  onBack,
}) {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const submitHandler = async (values) => {
    const ok = await onChangePass(values);
    console.log("ok", ok);
    if (ok) {
      alert("🎉 Đổi mật khẩu thành công!");
    }
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} noValidate>
    <h1 className="title">Create new password</h1>
      <p className="description">
        Your new password must be different from your previous passwords.
        <br></br> It should be at least 6 characters.
      </p>

      <InputField
        control={control}
        name="password"
        placeholder="Mật khẩu mới"
        icon={MdLock}
        type="password"
        defaultValue=""
      />
      {errors.password && <p className="errorMsg">{errors.password.message}</p>}

      <InputField
        control={control}
        name="confirmPassword"
        placeholder="Nhập lại mật khẩu"
        icon={MdLock}
        type="password"
        defaultValue=""
      />
      {errors.confirm && <p className="errorMsg">{errors.confirm.message}</p>}

      <Box sx={{ display: "flex", justifyContent: "space-between", mt: 3 }}>
        <Button variant="outlined" onClick={onBack}>
          🔙 Quay lại
        </Button>
        <Button variant="contained" type="submit" disabled={changePassLoading}>
          {changePassLoading ? "Đang xử lý..." : "✅ Xác nhận"}
        </Button>
      </Box>
    </form>
  );
}

Step3.propTypes = {
  onChangePass: PropTypes.func.isRequired,
  changePassLoading: PropTypes.bool.isRequired,
  onBack: PropTypes.func.isRequired,
};

import { useForm } from "react-hook-form";
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

import InputField from "../../common/InputField"; // component input đã tạo bên trên
import { registerSchema } from "../../utils/registerValidate/";
import { yupResolver } from "@hookform/resolvers/yup";
import PropTypes from "prop-types";

const RegisterForm = ({ onSubmit }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
    mode: "onTouched",
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <InputField
        control={control}
        name="username"
        placeholder="Tên đăng nhập"
        icon={FaUser}
      />
      {errors.username && <p className="errorMsg">{errors.username.message}</p>}
      <br />

      <InputField
        control={control}
        name="password"
        placeholder="Mật khẩu"
        type="password"
        icon={FaLock}
      />
      {errors.password && <p className="errorMsg">{errors.password.message}</p>}
      <br />

      <InputField
        control={control}
        name="confirmPassword"
        placeholder="Xác nhận mật khẩu"
        type="password"
        icon={FaLock}
      />
      {errors.confirmPassword && (
        <p className="errorMsg">{errors.confirmPassword.message}</p>
      )}
      <br />

      <InputField
        control={control}
        name="email"
        placeholder="Email"
        icon={MdEmail}
      />
      {errors.email && <p className="errorMsg">{errors.email.message}</p>}
      <br />

      <InputField
        control={control}
        name="name"
        placeholder="Tên đầy đủ"
        icon={FaUser}
      />
      {errors.name && <p className="errorMsg">{errors.name.message}</p>}
      <br />

      <button type="submit" className="button-register">
        ĐĂNG KÝ
      </button>
    </form>
  );
};
RegisterForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};

export default RegisterForm;

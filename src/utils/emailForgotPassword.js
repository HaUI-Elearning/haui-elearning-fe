import * as yup from "yup";

export const sendEmailForgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required("Vui lòng nhập email của bạn")
    .email("Định dạng email không hợp lệ"),
});

export const verifyOtpForgotPasswordSchema = yup.object({
  otp: yup
    .string()
    .required("Vui lòng nhập mã OTP")
    .matches(/^\d{6}$/, "Mã OTP không hợp lệ (gồm 6 chữ số)"),
});

export const resetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .required("Vui lòng nhập mật khẩu mới")
      .min(8, "Mật khẩu phải có ít nhất 8 ký tự")
      .max(30, "Mật khẩu tối đa 30 ký tự")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
        "Mật khẩu phải có chữ hoa, chữ thường, số và ký tự đặc biệt"
      ),
    confirmPassword: yup
      .string()
      .required("Vui lòng xác nhận mật khẩu")
      .oneOf([yup.ref("password")], "Mật khẩu xác nhận không khớp"),
  })
  .required();

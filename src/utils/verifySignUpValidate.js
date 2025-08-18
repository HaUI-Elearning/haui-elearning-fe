import * as yup from "yup";

export const verifySignUpSchema = yup.object().shape({
  otp: yup
    .string()
    .required("Vui lòng nhập mã OTP")
    .length(6, "Mã OTP phải gồm 6 chữ số"),
});

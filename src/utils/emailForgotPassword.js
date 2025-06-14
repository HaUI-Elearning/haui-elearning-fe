import * as yup from 'yup';


export const sendEmailForgotPasswordSchema = yup.object({
  email: yup
    .string()
    .required('Please enter your email')
    .email('Invalid email format'),
});

export const verifyOtpForgotPasswordSchema = yup.object({
  otp: yup
    .string()
    .required('Please enter the OTP code')
    .matches(/^\d{6}$/, 'Invalid OTP code'),
});



export const resetPasswordSchema = yup
  .object({
    password: yup
      .string()
      .required("Please enter a new password")
      .min(8, "Password must be at least 8 characters")
      .max(30, "Password must be at most 30 characters")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^a-zA-Z0-9]).+$/,
        "Password must contain uppercase, lowercase, number, and special character"
      ),
    confirmPassword: yup
      .string()
      .required("Please confirm your password")
      .oneOf([yup.ref("password")], "Passwords do not match"),
  })
  .required();
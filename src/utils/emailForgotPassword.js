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

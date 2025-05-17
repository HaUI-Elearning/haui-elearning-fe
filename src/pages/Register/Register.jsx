import  { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import RegisterForm from '../../components/Register/RegisterForm';
import SnackbarAlert from '../../common/SnackbarAlert'; // nếu file bạn để trong common
import logo from '../../assets/images/logo.png';
import { registerUser } from '../../apis/registerUser';

import './Register.scss';

const Register = () => {
  const navigate = useNavigate();
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const handleSubmit = async (formData) => {
    try {
      const res = await registerUser(formData);
      console.log("Registration successful:", res);
      setSnackbar({
        open: true,
        message: "Registration successful!",
        severity: "success",
      });
      setTimeout(() => navigate('/verify-email'), 2000);
      localStorage.setItem("emailRegister", res.data.email); 
    } catch (err) {
      const message = err?.error || "Registration failed!";
      setSnackbar({
        open: true,
        message,
        severity: 'error',
      });
    }
  };

  return (
    <div className="container">
      <div className="box">
        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <RegisterForm onSubmit={handleSubmit} />

        <div className="linkRegister">
          <p>Already have an account?</p>
          <Link to="/signIn" className="dangky">
            Sign in
          </Link>
        </div>
      </div>

      <SnackbarAlert
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={handleSnackbarClose}
      />
    </div>
  );
};

export default Register;


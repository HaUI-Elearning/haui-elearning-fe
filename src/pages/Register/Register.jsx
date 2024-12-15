import { Link, useNavigate } from 'react-router-dom';
import { Field, Formik, Form } from 'formik';
import "../../pages/Register/Register.scss";
import logo from '../../assets/images/logo.png';
import { IoIosArrowBack } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import { MdEmail } from "react-icons/md";
import { registerValidate } from '../../utils/registerValidate';
import axios from 'axios';
import { useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const Register = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    navigate('/signIn');
  };

  const goBack = () => {
    navigate('/signIn');
  };

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <div className='container'>
      <div className='box'>
        <div className='back'>
          <span onClick={goBack}>
            <IoIosArrowBack /> QUAY LẠI
          </span>
        </div>
        <div className='logo'>
          <img src={logo} alt='Logo' />
        </div>
        <Formik
          initialValues={{
            username: '',
            password: '',
            confirmPassword: '',
            email: '',
            name: ''
          }}
          validationSchema={registerValidate()}
          onSubmit={async (values) => {
            try {
              console.log("Data being sent to the API:", values);
              const response = await axios.post('http://localhost:8080/api/v1/register', values);
              console.log('Registration successful:', response.data);
              setSnackbarMessage('Đăng ký thành công!');
              setSnackbarSeverity('success');
              setOpenSnackbar(true);
              setTimeout(() => {
                navigate('/signIn');
              }, 2000);
            } catch (error) {
              // Xử lý lỗi và hiển thị thông báo cụ thể
              if (error.response) {
                // Nếu có phản hồi từ máy chủ
                console.error('Error during registration:', error.response ? error.response.data : error.message);
                const errorMessage = error.response.data.error || 'Đăng ký thất bại!';
                setSnackbarMessage(errorMessage);
                setSnackbarSeverity('error');
              } else {
                setSnackbarMessage('Đã xảy ra lỗi, vui lòng thử lại!');
                setSnackbarSeverity('error');
              }
              setOpenSnackbar(true);
            }
          }}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='input-group'>
                <Field type='text' placeholder='Tên Đăng Nhập' name='username' required />
                <span className='icon'>
                  <FaUser />
                </span>
              </div>
              {errors.username && touched.username && <p className='errorMsg'>{errors.username}</p>}
              <br />

              <div className='input-group pass'>
                <Field type='password' placeholder='Mật khẩu' name='password' required />
                <span className='icon'>
                  <FaLock />
                </span>
              </div>
              <br />
              {errors.password && touched.password && <p className='errorMsg'>{errors.password}</p>}
              <br />

              <div className='input-group pass'>
                <Field type='password' placeholder='Nhập lại Mật khẩu' name='confirmPassword' required />
                <span className='icon'>
                  <FaLock />
                </span>
              </div>
              <br />
              {errors.confirmPassword && touched.confirmPassword && <p className='errorMsg'>{errors.confirmPassword}</p>}
              <br />

              <div className="input-group email">
                <Field type='text' placeholder='Email' name='email' required />
                <span className='icon'>
                  <MdEmail style={{ fontSize: '24px' }} />
                </span>
              </div>
              {errors.email && touched.email && <p className='errorMsg'>{errors.email}</p>}

              <button type='submit' className='button-register'>
                ĐĂNG KÝ
              </button>
              <div className="linkRegister">
                <p>Bạn đã có tài khoản?</p>
                <Link to='/signIn' onClick={goToLogin} className='dangky'>
                  Đăng Nhập
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity} 
          sx={{ width: '100%', fontSize: '1.2rem', padding: '16px' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Register;

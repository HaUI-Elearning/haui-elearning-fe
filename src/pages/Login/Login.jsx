import { Link, useNavigate } from 'react-router-dom';
import { loginValidate } from '../../utils/loginValidate';
import { Field, Formik, Form } from 'formik';
import axios from 'axios';
import { useDispatch } from 'react-redux'; // Import useDispatch
import { setUser } from '../../store/userSlice'; // Import action
import "../Login/Login.scss";
import logo from '../../assets/images/logo.png';
import { IoIosArrowBack } from 'react-icons/io';
import { FaUser } from 'react-icons/fa';
import { FaLock } from 'react-icons/fa6';
import { useEffect, useState } from 'react';
import { Alert, Snackbar } from '@mui/material';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem('accessToken');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleLogin = async (values) => {
    try {
      const response = await axios.post('http://localhost:8080/api/v1/login', {
        username: values.username,
        password: values.password,
      });

      if (response.status === 200) {
        const { accessToken } = response.data.data;
        localStorage.setItem('accessToken', accessToken);
        dispatch(setUser({ accessToken }));
        setSnackbarMessage('Đăng nhập thành công!');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
        setTimeout(() => {
          navigate('/');
        }, 2000);
      }
    } catch (error) {
      if (error.response) {
        const errorMessage = 'Sai tài khoản hoặc mật khẩu!';
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity('error');
      } else {
        setSnackbarMessage('Đã xảy ra lỗi, vui lòng thử lại!');
        setSnackbarSeverity('error');
      }
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (accessToken) {
      
        try {
          const response = await axios.get('http://localhost:8080/api/v1/users/my-profile', {
            headers: {
              'Authorization': `Bearer ${accessToken}`,
              'Content-Type': 'application/json',
            },
          });

          dispatch(setUser({ userInfo: JSON.stringify(response.data.data), accessToken }));
        } catch (err) {
          console.error('Failed to fetch user info:', err.message);
      
        }
      }
    };

    fetchUserInfo();
  }, [accessToken, dispatch]);

  const goToForgotPassword = () => {
    navigate('/forgot-password');
  };

  const goToRegister = () => {
    navigate('/signUp');
  };

  const goBack = () => {
    navigate('/');
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
          <img src={logo} alt=' Logo' />
        </div>
        <Formik
          initialValues={{
            username: '',
            password: '',
          }}
          validationSchema={loginValidate()}
          onSubmit={handleLogin}
        >
          {({ errors, touched }) => (
            <Form>
              <div className='input-group'>
                <Field
                  type='text'
                  placeholder='Tên Đăng Nhập'
                  name='username'
                  autoComplete="off"
                  required
                />
                <span className='icon'>
                  <FaUser />
                </span>
              </div>
              {errors.username && touched.username ? (
                <p className='errorMsg'>{errors.username}</p>
              ) : null}
              <br />
              <div className='input-group pass'>
                <Field
                  type='password'
                  placeholder='Mật khẩu'
                  name='password'
                  required
                />
                <span className='icon'>
                  <FaLock />
                </span>
              </div>
              <br />
              {errors.password && touched.password ? (
                <p className='errorMsg'>{errors.password}</p>
              ) : null}

              <div className='forgot-password' onClick={goToForgotPassword}>
                <Link to='/forgot-password'><i>Quên mật khẩu ?</i></Link>
              </div>
              <button type='submit' className='button'>
                ĐĂNG NHẬP
              </button>
              <div className="linkRegister">
                <p>Bạn chưa có tài khoản?</p>
                <Link to='/signUp' onClick={goToRegister} className='dangky'>Đăng ký</Link>
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

export default Login;
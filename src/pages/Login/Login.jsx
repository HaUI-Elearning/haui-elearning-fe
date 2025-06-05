import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch } from "react-redux";
import axios from "axios";

import { loginValidate } from "../../utils/loginValidate";
import { setUser } from "../../store/userSlice";

import { IoIosArrowBack } from "react-icons/io";
import { FaUser } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";

import { Alert, Snackbar } from "@mui/material";
import logo from "../../assets/images/logo.png";
import "../Login/Login.scss";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = localStorage.getItem("accessToken");

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const showSnackbar = useCallback((message, severity = "success") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const fetchUserProfile = useCallback(async () => {
    if (!accessToken) return;

    try {
      const res = await axios.get(
        "http://localhost:8080/api/v1/users/my-profile",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      dispatch(
        setUser({
          accessToken,
          userInfo: JSON.stringify(res.data.data),
        })
      );
    } catch (err) {
      console.error("Lỗi lấy thông tin user:", err.message);
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  const handleLogin = useCallback(
    async (values) => {
      try {
        const res = await axios.post(
          "http://localhost:8080/api/v1/login",
          values
        );

        if (res.status === 200) {
          
          const { accessToken } = res.data.data;
          console.log("ACCCCC" ,accessToken);
          localStorage.setItem("accessToken", accessToken);
          localStorage.removeItem("email")
          dispatch(setUser({ accessToken }));

          showSnackbar("Login successful!");

          setTimeout(() => navigate("/"), 2000);
        }
      } catch (err) {
        const mess = err.response.data.error;
        if (mess === "user not verify") {
          showSnackbar("Your account is not verified yet", "error");
          setTimeout(() => navigate("/verify-email"), 2000);
          return;
        }

        showSnackbar("Incorrect username or password!", "error");
      }
    },
    [dispatch, navigate, showSnackbar]
  );

  return (
    <div className="container">
      <div className="box">
        <div className="back">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate('/')}
            aria-label="Back to Sign In"
          >
            <IoIosArrowBack /> Back Home
          </button>
        </div>

        <div className="logo">
          <img src={logo} alt="Logo" />
        </div>

        <Formik
          initialValues={{ username: "", password: "" }}
          validationSchema={loginValidate()}
          onSubmit={handleLogin}
        >
          {() => (
            <Form>
              <div className="input-group">
                <Field
                  type="text"
                  name="username"
                  placeholder="User name"
                  autoComplete="off"
                  required
                />
                <span className="icon">
                  <FaUser />
                </span>
              </div>
              <ErrorMessage
                name="username"
                component="p"
                className="errorMsg"
              />

              <div className="input-group pass">
                <Field
                  type="password"
                  name="password"
                  placeholder="Password"
                  required
                />
                <span className="icon">
                  <FaLock />
                </span>
              </div>
              <ErrorMessage
                name="password"
                component="p"
                className="errorMsg"
              />

              <div className="forgot-password">
                <Link to="/forgot-password">
                  <i>Forgot password?</i>
                </Link>
              </div>

              <button type="submit" className="button">
                Sign in
              </button>

              <div className="linkRegister">
                <p>Do not have an account?</p>
                <Link to="/signUp" className="dangky">
                  Sign up
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setSnackbar((prev) => ({ ...prev, open: false }))}
          severity={snackbar.severity}
          sx={{ width: "100%", fontSize: "1.2rem", padding: "16px" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default Login;

import "./App.scss";
import { useRoutes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import Categories from "./pages/Categories/Categories";
import CourseDetailPage from "./pages/CourseDetail/Detail";
import TabPage from "./pages/MyCourse/TabPage";
import MyProfile from "./components/User/MyProfile/MyProfile";
import MyCart from "./components/MyCart/myCart";
import SearchPage from "./pages/Search/SearchPage";

import VerifySignUp from "./pages/VerifyRegistration/VerifySignUp";
import ForgotPassPage from "./pages/ForgotPasswordPage/ForgotPasswordPage";

import CourseStudy from "./pages/CourseStudy/CourseStudy";

import MainLayoutTeacher from "./layouts/MainLayoutTeacher";

import { ToastContainer } from "react-toastify";
import RegisterTeacherForm from "./components/RegisterTeacherForm/RegisterTeacherForm";
import TeacherHome from "./pages/TeacherHome/TeacherHome";
import CreateNewCourse from "./components/CreateNewCouse/CreateNewCouse";
import { Toaster } from "react-hot-toast";
import PaymentResult from "./components/checkout/PaymentResult/PaymentResult";
import ScrollToTop from "./components/ScrollToTop";
import AccessDeniedPage from "./pages/AccessDeniedPage/AccessDenied";

import NotFoundPage from "./pages/NotFoundPage/NotFound";
import EnrollPage from "./pages/BuyAndEnrollCourse/Enroll/EnrollPage";

function App() {
  const router = useRoutes([
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "",
          element: <Home />,
        },
      ],
    },
    {
      path: "/signIn",
      element: <Login />,
    },
    {
      path: "/signUp",
      element: <Register />,
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/category/:categoryId",
          element: <Categories />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/courses/:courseId",
          element: <CourseDetailPage />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/my-course/*",
          element: <TabPage />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/my-profile",
          element: <MyProfile />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/cart",
          element: <MyCart />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/search",
          element: <SearchPage />,
        },
      ],
    },
    {
      path: "/register-teacher",
      element: <RegisterTeacherForm />,
    },

    {
      path: "/teacher",
      element: <MainLayoutTeacher />,
      children: [
        {
          path: "",
          element: <TeacherHome />,
        },
      ],
    },
    {
      path: "/add-course",
      element: <CreateNewCourse />,
    },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/verify-email",
          element: <VerifySignUp />,
        },
      ],
    },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/forgot-password",
          element: <ForgotPassPage />,
        },
      ],
    },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/courses/learn/:courseId",
          element: <CourseStudy />,
        },
      ],
    },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/payment/result",
          element: <PaymentResult />,
        },
      ],
    },

    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/access-denied",
          element: <AccessDeniedPage />,
        },
      ],
    },
    {
      path: "/",
      element: <MainLayout />,
      children: [
        {
          path: "/enrolled/:courseId",
          element: <EnrollPage />,
        },
      ],
    },

    {
      path: "*",
      element: <MainLayout />,
      children: [
        {
          path: "*",
          element: <NotFoundPage />,
        },
      ],
    },
  ]);
  return (
    <>
      <ScrollToTop />
      <Toaster />
      {router}
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}

export default App;

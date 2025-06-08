import { useLocation } from "react-router-dom";

import NotFoundPage from "../../NotFoundPage/NotFound";
import EnrollSuccess from "../../../components/Checkout/Enroll/EnrollSuccess";
const EnrollPage = () => {
  const location = useLocation();
  const enrolledCourse = location.state?.enrolledCourse;

  if (!enrolledCourse) {
    return <NotFoundPage />;
  }

  return <EnrollSuccess enrolledCourse={enrolledCourse}></EnrollSuccess>;
};

export default EnrollPage;

import { useNavigate, useParams } from "react-router-dom";
import Study from "../../components/CourseStudy/Study";
import { useSelector } from "react-redux";
import "../../store/userSlice";
import { useState, useEffect } from "react";
import { getCourseStudyDetail } from "../../apis/getCourseStudyDetail";


const CourseStudy = () => {
  const { courseId } = useParams();
  const accessToken = useSelector((state) => state.user.accessToken);
  const [course, setCourse] = useState({});
 
  const navigate = useNavigate();



  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseStudyDetail(courseId, accessToken);
        setCourse(data);
   
      } catch (err) {
        console.error("Error fetching course study details:", err.error);
        if (err?.error === "User has not enrolled in this course") {
          navigate("/access-denied");
        }
        if (err?.error === "Course not found") {
          navigate("*");
        }
      }
    };

    if (courseId && accessToken) {
      fetchCourse();
    }
  }, [courseId, accessToken, navigate]);

  console.log("Course overview:", course)
  return (
    <div>
      {course? (
        <Study course={course}  />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default CourseStudy;

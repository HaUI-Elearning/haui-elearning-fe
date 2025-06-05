import { useParams } from "react-router-dom";
import Study from "../../components/CourseStudy/Study";
import { useSelector } from "react-redux";
import "../../store/userSlice";
import { useState, useEffect } from "react";
import { getCourseStudyDetail } from "../../apis/getCourseStudyDetail";

const CourseStudy = () => {
  const { courseId } = useParams();
  const accessToken = useSelector((state) => state.user.accessToken);
  const [course, setCourse] = useState({});
  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseStudyDetail(courseId, accessToken);
        setCourse(data);
      } catch (err) {
        console.error("Error fetching course study details:", err);
      }
    };

    if (courseId && accessToken) {
      fetchCourse();
    }
  }, [courseId, accessToken]);

  return (
    <div>
      <Study course={course} />
    </div>
  );
};

export default CourseStudy;

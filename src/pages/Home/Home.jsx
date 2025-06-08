import SLider from "../../components/Slider/Slider";
import CourseItem from "../../components/CourseItem/CourseItem";
import { useEffect, useState } from "react";
import { getCategoryCourses } from "../../apis/Category/getCategoryCourse";
const Home = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [courses, setCourses] = useState([]);

  const loadAllCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await getCategoryCourses(accessToken);

      setCourses(res.data);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Failed to load courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAllCourses();
  }, []);

  return (
    <>
      <SLider />
      <CourseItem loading={loading} error={error} courses={courses} />
    </>
  );
};
export default Home;

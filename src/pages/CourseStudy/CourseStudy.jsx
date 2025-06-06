import { useNavigate, useParams } from "react-router-dom";
import Study from "../../components/CourseStudy/Study";
import { useSelector } from "react-redux";
import "../../store/userSlice";
import { useState, useEffect, useCallback } from "react";
import { getCourseStudyDetail } from "../../apis/getCourseStudyDetail";
import { getCommentByCourseId } from "../../apis/getCommentByCourseId";

const CourseStudy = () => {
  const { courseId } = useParams();
  const accessToken = useSelector((state) => state.user.accessToken);
  const [course, setCourse] = useState({});
  const [comment, setComment] = useState({});
  const navigate = useNavigate();

  const fetchAllCommnent = useCallback(async () => {
    const commentResponse = await getCommentByCourseId(courseId);
    console.log("Fetched comments:", commentResponse);
    setComment(commentResponse);
    return commentResponse;
  }, [courseId]);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const data = await getCourseStudyDetail(courseId, accessToken);
        setCourse(data);
        fetchAllCommnent();
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
  }, [courseId, accessToken, fetchAllCommnent]);

  return (
    <div>
      <Study course={course} comment={comment} />
    </div>
  );
};

export default CourseStudy;

import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Detail from "../../components/CourseDetail/Detail";
import { getCommentByCourseId } from "../../apis/getCommentByCourseId";
import { filterComment } from "../../apis/filterComment";
import { getCourseById } from "../../apis/Course/getCourseById";

const CourseDetailPage = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState({});

  const fetchAllCommnent = useCallback(async () => {
    const commentResponse = await getCommentByCourseId(courseId);
    setComment(commentResponse);
    return commentResponse.listReview;
  }, [courseId]);

  const LoadCourseDetail = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await getCourseById(courseId);

      console.log("Course data api:", res.courseId);
      setCourse(res);
      fetchAllCommnent();
    } catch (e) {
      console.error("Error fetching courses:", e);

      const errorMsg = e.response?.data?.error || "";

      if (
        errorMsg.includes("Course not found") ||
        errorMsg.includes("course is not approved")
      ) {
        navigate("*");
      } else {
        setError("Tải khóa học thất bại");
      }
    } finally {
      setLoading(false);
    }
  }, [courseId, fetchAllCommnent]);

  const fetchFilterCommnent = useCallback(
    async (star) => {
      const data = {
        courseId: courseId,
        Stars: star,
      };
      const res = await filterComment(data);
      return res;
    },
    [courseId]
  );

  const handleFilter = useCallback(
    async (star) => {
      if (star !== null && star !== undefined) {
        const res = await fetchFilterCommnent(star);
        return res;
      } else {
        const res1 = await fetchAllCommnent();
        return res1;
      }
    },
    [fetchAllCommnent, fetchFilterCommnent]
  );
  useEffect(() => {
    LoadCourseDetail();
    fetchAllCommnent();
    handleFilter();
  }, [LoadCourseDetail, fetchAllCommnent, handleFilter]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Detail
        course={course}
        comment={comment}
        onCommentFilter={handleFilter}
      ></Detail>
    </div>
  );
};

export default CourseDetailPage;

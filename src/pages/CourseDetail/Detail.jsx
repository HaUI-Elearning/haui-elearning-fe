import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import Detail from "../../components/CourseDetail/Detail";
import axios from "axios";
import { getCommentByCourseId } from "../../apis/getComment";
import { filterComment } from "../../apis/filterComment";
const CourseDetailPage = () => {
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
      const accessToken = localStorage.getItem("accessToken");

      const headers = accessToken
        ? {
            Authorization: `Bearer ${accessToken}`,
          }
        : {};

      const res = await axios.get(
        `http://localhost:8080/api/v1/courses/${courseId}`,
        { headers }
      );

      console.log("Course data:", res.data.data);
      setCourse(res.data.data);
      fetchAllCommnent();
    } catch (e) {
      console.error("Error fetching courses:", e);
      setError("Failed to load courses");
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

import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Typography, Grid } from "@mui/material";
import BasicDetail from "../../components/FindByCategory/BasicDetail/BasicDetail";
import TabCourse from "../../components/FindByCategory/TabCourse/TabCourse";
import SkeletonCategory from "../../components/FindByCategory/Skeleton/SkeletonCategory";
import axios from "axios";
import FilterSection from "../../components/FindByCategory/FilterCourses/Filter/FilterSection";
import CourseList from "../../components/FindByCategory/FilterCourses/ResFilterAndSort/CourseList";
import CurrentFilters from "../../components/FindByCategory/FilterCourses/CurentFilter/CurrentFilters ";
import Introduce from "../../components/FindByCategory/FilterCourses/Introduce/Introduce";

const Categories = () => {

  const navigate= useNavigate()
  const { categoryId } = useParams();
  const [courses, setCourses] = useState([]);
  const [detail, setDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterCourse, setFilterCourse] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [pageSize] = useState(5);
  const [totalRes, setTotalRes] = useState(0);
  const [filters, setFilters] = useState({
    isFree: false,
    isPaid: false,
    hourRange: [],
    starRating: null,
  });
  const [sortOption, setSortOption] = useState("all-course");

  useEffect(() => {
    LoadAllCourse();
    LoadDetail();
    resetFilters();
  }, [categoryId]);

  const resetFilters = () => {
    setFilters({
      isFree: false,
      isPaid: false,
      hourRange: [],
      starRating: null,
    });
    setSortOption("all-course");
  };

  const applyFilters = async () => {
    const { isPaid, hourRange, starRating } = filters;
    const id = categoryId;

    let apiUrl = `http://localhost:8080/api/v1/courses/search?categoryId=${id}&current=${currentPage}&pageSize=${pageSize}`;
    if (isPaid) apiUrl += `&isPaid=${isPaid}`;
    hourRange.forEach((range) => {
      apiUrl += `&hourRange=${range}`;
    });
    if (starRating) apiUrl += `&starRating=${starRating}`;

    try {
      const accessToken = localStorage.getItem("accessToken");

      const response = await axios.get(
        apiUrl,
        accessToken
          ? {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          : {}
      );

      console.log("api", apiUrl);
      setFilterCourse(response.data.data.result);
      const totalRes1 = response.data.data.meta.total;
      setTotalRes(totalRes1);
      const totalPage = Math.ceil(totalRes1 / pageSize);
      setTotalPages(totalPage);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };
  

  const LoadAllCourse = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const accessToken = localStorage.getItem("accessToken");

      const res = await axios.get(
        `http://localhost:8080/api/v1/courses/category/${categoryId}`,
        accessToken
          ? {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          : {}
      );

      setCourses(res.data.data.result);
    } catch (error) {
      console.error("Error fetching courses:", error);
      setError("Tải khóa học thất bại");
    } finally {
      setLoading(false);
    }
  }, [categoryId]);

  const LoadDetail = useCallback(async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");

      const res1 = await axios.get(
        `http://localhost:8080/api/v1/categories/${categoryId}`,
        accessToken
          ? {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          : {}
      );

      setDetail(res1.data.data);
    } catch (error) {
      console.error("Error fetching detail category:", error);
      navigate("*")
      setError("Tải thể loại thất bại");
    }
  }, [categoryId]);

  useEffect(() => {
    applyFilters();
  }, [filters, currentPage, pageSize]);

  const sortedCourses = () => {
    let sorted = [...filterCourse];
    if (sortOption === "highest-rate") {
      sorted.sort((a, b) => b.star - a.star);
    } else if (sortOption === "newest") {
      sorted.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    return sorted;
  };

  if (error) {
    return (
      <Typography variant="h6" color="error">
        {error}
      </Typography>
    );
  }

  return (
    <Container>
      {loading ? (
        <SkeletonCategory />
      ) : (
        <>
          <BasicDetail course={courses} detail={detail} />
          <TabCourse course={courses} />
          <Introduce detail={detail}></Introduce>
          <Grid container spacing={2}>
            <Grid item xs={12} md={4}>
              <FilterSection
                filters={filters}
                setFilters={setFilters}
                sortOption={sortOption}
                setSortOption={setSortOption}
                applyFilters={applyFilters}
              />
            </Grid>
            <Grid item xs={12} md={8}>
              <CurrentFilters
                filters={filters}
                resetFilters={resetFilters}
                applyFilters={applyFilters}
              />
              <CourseList
                courses={sortedCourses()}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
                totalPages={totalPages}
                totalResult={totalRes}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Container>
  );
};

export default Categories;

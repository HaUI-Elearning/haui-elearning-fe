
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Search from '../../components/SearchCourse/Search';
import { CircularProgress } from '@mui/material';

const SearchPage = () => {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const searchTerm = queryParams.get('query');
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadAllCourses = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/v1/courses/categorycourse');
            const data = res.data.data;
            const allCourse = data.flatMap(category => category.courseCategories);
            const filteredCourses = allCourse.filter(course =>
                course.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setCourses(filteredCourses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadAllCourses();
    }, [searchTerm]);

    if (loading) {
        return (
          <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <CircularProgress size={60} color="primary" />
            <p style={{ fontSize: '18px', marginTop: '10px' }}>Đang tìm kiếm khoá học...</p>
          </div>
        );
      }
    return (
        <Search searchTerm={searchTerm} loading={loading} courses={courses} />
    );
};

export default SearchPage;
import React from 'react';
import { useNavigate } from 'react-router-dom';
import CourseListTeacher from '../CourseListTeacher/CourseListTeacher';
import './TeacherHome.scss'; // import SCSS file

const TeacherHome = () => {
  const navigate = useNavigate();

  const handleAddCourse = () => {
    navigate('/add-course');
  };

  return (
    <div className="teacher-home">
      <div className="top-bar">
        <button className="add-course-btn" onClick={handleAddCourse}>
          Thêm Khóa Học
        </button>
      </div>

      <CourseListTeacher />
    </div>
  );
};

export default TeacherHome;

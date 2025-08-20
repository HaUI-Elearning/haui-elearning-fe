import React from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // ✅ ĐÚNG CÁCH

const TeacherAccess = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      alert("Bạn chưa đăng nhập.");
      return;
    }

    try {
      const decoded = jwtDecode(token); 
      const roles = decoded.codernewbie || [];

      if (roles.includes("ROLE_TEACHER")) {
        navigate("/teacher"); 
      } else {
        navigate("/register-teacher"); 
      }
    } catch (error) {
      console.error("Lỗi khi giải mã token:", error);
      alert("Token không hợp lệ hoặc đã hết hạn.");
    }
  };

  return (
    <div className="teacher"
      onClick={handleClick}
      style={{ cursor: "pointer", fontWeight: "bold" }}
    >
      <p className="name-teacher">Teacher</p>
    </div>
  );
};

export default TeacherAccess;

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./RegisterTeacherForm.scss";

const RegisterTeacherForm = () => {
  const [answers, setAnswers] = useState(Array(7).fill(""));
  const navigate = useNavigate();

  const questions = [
    "1. Tại sao bạn muốn trở thành giáo viên?",
    "2. Bạn có kinh nghiệm giảng dạy không? Nếu có, vui lòng mô tả.",
    "3. Bạn có thể dạy những môn học nào?",
    "4. Bạn có thể dạy vào thời gian nào?",
    "5. Bạn có chứng chỉ liên quan đến giảng dạy không?",
    "6. Bạn đã từng làm việc với nhóm học sinh ở độ tuổi nào?",
    "7. Kỳ vọng của bạn khi trở thành giáo viên trên nền tảng của chúng tôi là gì?",
  ];

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (answers.some((a) => a.trim() === "")) {
      toast.warning("Please complete all questions.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Access token not found.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:8080/api/v1/Register/Teacher",
        { answers },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          responseType: "text",
        }
      );

      const newToken = response.data;
      localStorage.setItem("accessToken", newToken);

      toast.success("🎉 Registration successful!");
      setTimeout(() => navigate("/teacher"), 1200);
    } catch (error) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="teacher-container">
      <div className="teacher-form-container">
        <h2>Đăng ký trở thành giáo viên</h2>
        <form onSubmit={handleSubmit} className="teacher-form">
          {questions.map((q, index) => (
            <div key={index} className="form-group">
              <label>{q}</label>
              <textarea
                rows="3"
                value={answers[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                required
                placeholder="Nhập câu trả lời của bạn..."
              />
            </div>
          ))}
          <div className="button-group">
            <button
              type="button"
              className="back-btn"
              onClick={() => navigate(-1)}
            >
              Quay lại
            </button>
            <button type="submit" className="submit-btn">
              Nộp đơn
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterTeacherForm;

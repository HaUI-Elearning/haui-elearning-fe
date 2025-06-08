import{ useState } from "react";
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
    "4. Thời gian rảnh của bạn để dạy là khi nào?",
    "5. Bạn có chứng chỉ nào liên quan đến giảng dạy không?",
    "6. Bạn đã từng làm việc với học sinh ở độ tuổi nào?",
    "7. Bạn mong muốn điều gì khi trở thành giáo viên trên nền tảng của chúng tôi?",
  ];

  const handleChange = (index, value) => {
    const updated = [...answers];
    updated[index] = value;
    setAnswers(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (answers.some((a) => a.trim() === "")) {
      toast.warning("Vui lòng điền đầy đủ tất cả các câu hỏi.");
      return;
    }

    const token = localStorage.getItem("accessToken");
    if (!token) {
      toast.error("Không tìm thấy access token.");
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

      toast.success("🎉 Đăng ký thành công!");
      setTimeout(() => navigate("/teacher"), 1200);
    } catch (error) {
      toast.error("Đăng ký thất bại. Vui lòng thử lại!");
    }
  };

  return (
    <div className="teacher-container">
      <div className="teacher-form-container">
        <h2>Đăng Ký Làm Giáo Viên</h2>
        <form onSubmit={handleSubmit} className="teacher-form">
          {questions.map((q, index) => (
            <div key={index} className="form-group">
              <label>{q}</label>
              <textarea
                rows="3"
                value={answers[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                required
                placeholder="Nhập câu trả lời..."
              />
            </div>
          ))}
          <button type="submit" className="submit-btn">
            Gửi Đăng Ký
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterTeacherForm;

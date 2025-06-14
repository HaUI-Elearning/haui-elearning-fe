import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "./RegisterTeacherForm.scss";

const RegisterTeacherForm = () => {
  const [answers, setAnswers] = useState(Array(7).fill(""));
  const navigate = useNavigate();

  const questions = [
    "1. Why do you want to become a teacher?",
    "2. Do you have any teaching experience? If yes, please describe.",
    "3. Which subjects are you able to teach?",
    "4. When are you available to teach?",
    "5. Do you have any teaching-related certificates?",
    "6. What age group of students have you worked with?",
    "7. What are your expectations when becoming a teacher on our platform?",
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
        <h2>Apply to Become a Teacher</h2>
        <form onSubmit={handleSubmit} className="teacher-form">
          {questions.map((q, index) => (
            <div key={index} className="form-group">
              <label>{q}</label>
              <textarea
                rows="3"
                value={answers[index]}
                onChange={(e) => handleChange(index, e.target.value)}
                required
                placeholder="Enter your answer..."
              />
            </div>
          ))}
          <div className="button-group">
            <button type="button" className="back-btn" onClick={() => navigate(-1)}>
              Back
            </button>
            <button type="submit" className="submit-btn">
              Submit Application
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterTeacherForm;

import axios from "axios";
import { BASE_URL } from "../../constants/api.constant";

export const getCourseById = async (courseId) => {
  try {
    const accessToken = localStorage.getItem("accessToken");

    const res = await axios.get(`${BASE_URL}/courses/${courseId}`, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });

    return res.data.data;
  } catch (error) {
    throw error || "Lỗi không xác định!";
  }
};

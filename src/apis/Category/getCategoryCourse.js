import axios from "axios";
import { BASE_URL } from "../../constants/api.constant";

export const getCategoryCourses = async (accessToken) => {
  try {
    const response = await axios.get(`${BASE_URL}/courses/categorycourse`, {
      headers: accessToken ? { Authorization: `Bearer ${accessToken}` } : {},
    });
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

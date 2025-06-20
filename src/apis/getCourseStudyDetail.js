import axios from "axios";
import { BASE_URL } from "../constants/api.constant";

export const getCourseStudyDetail = async (learnId, token) => {
  try {
    const response = await axios.get(`${BASE_URL}/learn/${learnId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "*/*",
      },
    });
    return response.data.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

import axios from "axios";
import { BASE_URL } from "../constants/api.constant";

export const reviewApi = {
  addReview: async ({ courseId, rating, comment }) => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("Review details:", {
      courseId,
      rating,
      comment,
        accessToken,
    });

    const res = await axios.post(
      `${BASE_URL}/Review/add?CourseID=${courseId}&Rating=${rating}&Comment=${comment}`,
      {}, 
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    console.log("Review added response:", res.data);
    return res.data;
  },
};

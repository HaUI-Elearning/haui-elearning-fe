
import axios from "axios";
import { BASE_URL } from "../../constants/api.constant";

export const createVNPayPayment = async (courseIds, isViaCart) => {
  try {
    const token = localStorage.getItem("accessToken");
    const response = await axios.post(
      `${BASE_URL}/payment/create`,
      {
        courseIds,
        viaCart: isViaCart,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

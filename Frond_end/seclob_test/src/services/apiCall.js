import axios from "axios";
import { Base_Url } from "./base_url"; 

export const apiCall = async (method, endPoint, data = null, params = null, is_formdata = false) => {
  const headers = {
    "Content-Type": is_formdata ? "multipart/form-data" : "application/json",
    Authorization: "Bearer " + localStorage.getItem("token"),
  };

  const url = Base_Url + endPoint;

  try {
    const res = await axios({
      method,
      url,
      params,
      data,
      headers,
    });

    return { status: true, message: res.data.message || "Success", data: res.data };
  } catch (error) {
    // Handle unauthorized access
    if (error?.response?.status === 401) {
      localStorage.removeItem("token");
      localStorage.removeItem("refreshToken");
      window.location.href = "/login";
    }

    // Throw error with backend message or fallback
    throw new Error(error?.response?.data?.message ?? "Something went wrong");
  }
};
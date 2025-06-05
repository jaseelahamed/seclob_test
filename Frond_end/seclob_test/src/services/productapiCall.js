import { apiCall } from "@/services/apiCall";
import { URLS } from "@/constants/apiUrls";

export const getProducts = async (filters = {}) => {
  const response = await apiCall("get", URLS.PRODUCTS, null, filters);
  return response.data; // Make sure backend returns { products: [...], total: ..., totalPages: ... }
};
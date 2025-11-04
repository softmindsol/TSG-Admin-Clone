import axios from "axios";

console.log("Environment base URL:", import.meta.env.VITE_BASE_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_API_URL || "http://localhost:5001/api",
});
// :white_check_mark: Request Interceptor
api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    console.log("Request config:", {
      url: config.url,
      baseURL: config.baseURL,
      fullURL: `${config.baseURL}/${config.url}`,
      method: config.method,
      headers: config.headers
    });
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.status, error.response?.data);
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

export default api;

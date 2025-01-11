import axios from "axios";

const axiosInstance = axios.create({
  // baseURL: "https://mock.apidog.com/m1/730971-0-default", // URL API chính (thay đổi cho phù hợp)
  baseURL: "http://toomeet.click/api/v1", // URL API chính (thay đổi cho phù hợp)
  timeout: 10000, // Thời gian chờ tối đa cho một request (10 giây)
  headers: {
    "Content-Type": "application/json", // Kiểu dữ liệu mặc định là JSON
  },
});

// Xử lý trước khi request được gửi đi
axiosInstance.interceptors.request.use(
  (config) => {
    // Thêm token vào header nếu có
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Xử lý lỗi khi cấu hình request thất bại
    return Promise.reject(error);
  }
);

// Xử lý sau khi nhận được response
axiosInstance.interceptors.response.use(
  (response) => {
    // Xử lý dữ liệu trả về
    return response;
  },
  (error) => {
    // Xử lý lỗi từ server
    if (error.response?.status === 401) {
      console.error("Unauthorized! Please log in again.");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

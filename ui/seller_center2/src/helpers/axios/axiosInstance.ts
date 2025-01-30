import axios from "axios";
import { API_ROOT } from "../../common/contants";
import Cookies from "js-cookie";

const axiosInstance = axios.create({
  baseURL: API_ROOT,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor cho request
axiosInstance.interceptors.request.use(
  function (config) {
    const token = Cookies.get("lemoo.access_token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Xử lý lỗi khi gửi request
    return Promise.reject(error);
  }
);

// Thêm interceptor cho response
axiosInstance.interceptors.response.use(
  function (response) {
    // Bất kỳ mã trạng thái nào nằm trong khoảng 2xx đều được xử lý tại đây
    return response;
  },
  function (error) {
    // Bất kỳ mã trạng thái nào không nằm trong khoảng 2xx đều được xử lý tại đây
    if (error.response) {
      // Máy chủ đã phản hồi với mã trạng thái ngoài 2xx
      console.error("Lỗi máy chủ:", error.response.status);
    } else if (error.request) {
      // Yêu cầu đã được gửi nhưng không nhận được phản hồi
      console.error("Không nhận được phản hồi từ máy chủ:", error.request);
    } else {
      // Xảy ra lỗi khi thiết lập yêu cầu
      console.error("Lỗi:", error.message);
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

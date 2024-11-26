import axios from "axios";
import { handleLogoutAPI, refreshTokenAPI } from "../../apis";
import Cookies from "js-cookie";

const athorizedAxiosInstance = axios.create();

athorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

athorizedAxiosInstance.defaults.withCredentials = true; // Tự động gửi Cookie

// Add a request interceptor: Can thiệp vào giữa những cái request API
athorizedAxiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

athorizedAxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status == 401) {
      handleLogoutAPI().then(() => {
        location.href = "/login";
      });
    }

    const originalRequest = error.config;
    console.log("originalRequest: ", originalRequest);

    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      return refreshTokenAPI(refreshToken)
        .then((res) => {
          console.log("Res Data: ", res.data);
          const { accessToken } = res.data;
          localStorage.setItem("accessToken", accessToken);
          athorizedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;

          return athorizedAxiosInstance(originalRequest);
        })
        .catch((_error) => {
          handleLogoutAPI().then(() => {
            location.href = "/login";
          });
          return Promise.reject(_error);
        });
    }
  }
);

export default athorizedAxiosInstance;

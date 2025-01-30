import axios from "axios";

import Cookies from "js-cookie";
import { handleLogoutAPI, refreshTokenAPI } from "../../api/auth";

const authorizedAxiosInstance = axios.create({
  baseURL: "http://toomeet.click/api/v1",
});

authorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

authorizedAxiosInstance.defaults.withCredentials = true; // Tự động gửi Cookie

// Add a request interceptor: Can thiệp vào giữa những cái request API
authorizedAxiosInstance.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    config.withCredentials = false;
    return config;
  },
  (error) => {
    // Do something with request error
    return Promise.reject(error);
  }
);

authorizedAxiosInstance.interceptors.response.use(
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

    if (error.response?.status === 410 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = localStorage.getItem("refreshToken");

      return refreshTokenAPI(refreshToken)
        .then((res) => {
          const { accessToken } = res.data;
          localStorage.setItem("accessToken", accessToken);
          authorizedAxiosInstance.defaults.headers.Authorization = `Bearer ${accessToken}`;

          return authorizedAxiosInstance(originalRequest);
        })
        .catch((_error) => {
          handleLogoutAPI().then(() => {
            location.href = "/login";
          });
          return Promise.reject(_error);
        });
    }
    return Promise.reject(error);
  }
);

export default authorizedAxiosInstance;

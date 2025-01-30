import axios from "axios";
import Cookies from "js-cookie";
import { handleLogoutAPI, refreshTokenAPI } from "../../apis";

const athorizedAxiosInstance = axios.create({
    baseURL: "https://mock.apidog.com/m1/730971-0-default",
});

athorizedAxiosInstance.defaults.timeout = 1000 * 60 * 10;

athorizedAxiosInstance.defaults.withCredentials = true; // Tự động gửi Cookie

// Add a request interceptor: Can thiệp vào giữa những cái request API
athorizedAxiosInstance.interceptors.request.use(
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

        if (error.response?.status === 410 && !originalRequest._retry) {
            originalRequest._retry = true;

            const refreshToken = localStorage.getItem("refreshToken");

            return refreshTokenAPI(refreshToken)
                .then((res) => {
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
        return Promise.reject(error);
    }
);

export default athorizedAxiosInstance;

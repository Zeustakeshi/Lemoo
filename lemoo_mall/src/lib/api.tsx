import { ACCESS_TOKEN_KEY } from "@/common/constants/auth";
import axios from "axios";
import Cookies from "js-cookie";
import { memoizedRefreshToken } from "./refreshToken";

export const api = axios.create({
    baseURL: "https://mock.apidog.com/m1/730971-0-default",
});

api.interceptors.request.use((request) => {
    const token = Cookies.get(ACCESS_TOKEN_KEY);
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

api.interceptors.response.use(
    (response) => response.data.data,
    async (error) => {
        if (error.request.status === 401) {
            await memoizedRefreshToken();
            if (Cookies.get(ACCESS_TOKEN_KEY)) return api(error.config);
        }
        if (error?.response?.data?.errors) {
            return Promise.reject(error?.response?.data?.errors);
        } else {
            return Promise.reject(error);
        }
    }
);

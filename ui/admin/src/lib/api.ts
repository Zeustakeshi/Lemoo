import { ACCESS_TOKEN_KEY } from "@/common/constants/auth.const";
import { BASE_URL } from "@/common/constants/url.const";
import { TokenType } from "@/common/type/token.type";
import axios from "axios";
import Cookies from "js-cookie";

export const api = axios.create({
    baseURL: BASE_URL,
    withCredentials: false,
});

api.interceptors.request.use((request) => {
    const tokenString = Cookies.get(ACCESS_TOKEN_KEY);
    if (tokenString) {
        const token: TokenType = JSON.parse(tokenString);
        request.headers.Authorization = `Bearer ${token.value}`;
    }
    return request;
});

api.interceptors.response.use(
    (response) => response.data.data,
    async (error) => {
        return Promise.reject(error?.response?.data?.errors);
    }
);

import { TokenType } from "@/common/enums/token";
import axios from "axios";
import { memoizedRefreshToken } from "./refreshToken";
import * as tokenStore from "./tokenStore";

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    withCredentials: false,
});

api.interceptors.request.use(async (request) => {
    const accessToken = await tokenStore.getTokenValue(TokenType.ACCESS_TOKEN);
    if (accessToken) {
        request.headers.Authorization = `Bearer ${accessToken}`;
    }
    return request;
});

api.interceptors.response.use(
    (response) => response.data.data,
    async (error) => {
        if (error.request.status === 401) {
            await memoizedRefreshToken();
            const accessToken = await tokenStore.getTokenValue(
                TokenType.ACCESS_TOKEN
            );
            if (accessToken) return api(error.config);
        }
        if (error?.response?.data?.errors) {
            return Promise.reject(error?.response?.data?.errors);
        } else {
            return Promise.reject(error);
        }
    }
);

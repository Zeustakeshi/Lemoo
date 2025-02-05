import { TokenType } from "@/common/enum/token.enum";
import * as tokenStore from "@/lib/tokenStore";
import axios from "axios";
import { memoizedRefreshToken } from "./refreshToken";

export const api = axios.create({
    // baseURL: "https://mock.apidog.com/m1/730971-0-default",
    baseURL: "http://143.244.150.42/api/v1",
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

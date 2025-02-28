import axios from "axios";
import { TokenType } from "../common/enum/token.enum";
import { memoizedRefreshToken } from "./refreshToken";
import * as tokenStore from "./tokenStore";

export const api = axios.create({
    // baseURL: "https://mock.apidog.com/m1/730971-0-default",
    // baseURL: "https://toomeet.click/api/v1",
    baseURL: "https://api.minhhieuano.io.vn:30635/api/v1",
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

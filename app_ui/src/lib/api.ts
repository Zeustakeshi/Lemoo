import axios from "axios";

import { TokenType } from "@/common/enum/token";
import { Alert } from "react-native";
import { getTokenValue, removeToken, saveToken } from "./tokenStore";

export const api = axios.create({
    baseURL: "http://192.168.1.8:8080/api/v1/",
});

api.interceptors.request.use(async (request) => {
    const token = await getTokenValue(TokenType.ACCESS_TOKEN);
    if (token) {
        request.headers.Authorization = `Bearer ${token}`;
    }
    return request;
});

api.interceptors.response.use(
    (response) => response.data.data,
    async (error) => {
        if (error.request.status === 401) {
            await refreshToken();
            const accessToken = await getTokenValue(TokenType.ACCESS_TOKEN);
            if (accessToken) return api(error.config);
        }
        if (error?.response?.data?.errors) {
            return Promise.reject(error?.response?.data?.errors);
        } else {
            return Promise.reject(error);
        }
    }
);

const refreshToken = async () => {
    const refreshToken = await getTokenValue(TokenType.REFRESH_TOKEN);

    if (!refreshToken) {
        // TODO: logout user
        await removeToken(TokenType.ACCESS_TOKEN);
        return;
    }

    Alert.alert("Refresh token");
    try {
        const data: any = await api({
            method: "POST",
            url: "/auth/token/refresh",
            data: {
                refreshToken: refreshToken,
            },
        });

        await saveToken(data.accessToken);
        await saveToken(data.refreshToken);
    } catch (error) {
        console.log("Refresh token error " + error);
        // TODO: logout user
        await removeToken(TokenType.ACCESS_TOKEN);
    }
};

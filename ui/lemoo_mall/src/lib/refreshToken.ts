import Cookies from "js-cookie";
import memoize from "memoize";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/common/constants/auth";
import { api } from "./api";
import { clearLocalStorage, clearSessionStorage } from "./storage";

const clearAuth = () => {
    clearLocalStorage();
    clearSessionStorage();
    Cookies.remove(REFRESH_TOKEN_KEY, { domain: ".lemoo.com" });
    Cookies.remove(ACCESS_TOKEN_KEY, { domain: ".lemoo.com" });
};

const refreshToken = async () => {
    const refreshTokenString = Cookies.get(REFRESH_TOKEN_KEY);
    if (!refreshTokenString) {
        clearAuth();
        return;
    }
    const refreshToken = JSON.parse(refreshTokenString);
    alert("Refresh token");
    try {
        const data: any = await api({
            method: "POST",
            url: "/token/refresh",
            data: {
                refreshToken: refreshToken,
            },
        });

        Cookies.set(ACCESS_TOKEN_KEY, data.accessToken.value, {
            expires: new Date(data.accessToken.expiresIn * 1000),
            domain: ".lemoo.com",
        });
        Cookies.set(REFRESH_TOKEN_KEY, data.refreshToken.value, {
            expires: new Date(data.refreshToken.expiresIn * 1000),
            domain: ".lemoo.com",
        });
    } catch (error) {
        console.log("Refresh token error " + error);
        clearAuth();
    }
};

const maxAge = 10000;
export const memoizedRefreshToken = memoize(refreshToken, {
    maxAge,
});

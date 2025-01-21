import Cookies from "js-cookie";
import memoize from "memoize";

import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/common/constants/auth";
import { api } from "./api";
import { clearLocalStorage, clearSessionStorage } from "./storage";

const refreshToken = async () => {
    const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);

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
            domain: ".localhost",
        });
        Cookies.set(REFRESH_TOKEN_KEY, data.refreshToken.value, {
            expires: new Date(data.refreshToken.expiresIn * 1000),
            domain: ".localhost",
        });
    } catch (error) {
        console.log("Refresh token error " + error);
        clearLocalStorage();
        clearSessionStorage();
        Cookies.remove(REFRESH_TOKEN_KEY, { domain: ".localhost" });
        Cookies.remove(ACCESS_TOKEN_KEY, { domain: ".localhost" });
    }
};

const maxAge = 10000;
export const memoizedRefreshToken = memoize(refreshToken, {
    maxAge,
});

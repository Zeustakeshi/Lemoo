import { getUseInfo } from "@/api/auth.api";
import { ACCESS_TOKEN_KEY } from "@/common/constants/auth.const";
import { USER_KEY } from "@/common/constants/user.const";
import { TokenType } from "@/common/type/token.type";
import { User } from "@/common/type/user.type";
import { Dispatch } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import { setUser } from "./auth";

export const setUserAsync =
    (user: User): any =>
    async (dispatch: Dispatch) => {
        sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        dispatch(setUser(user));
    };

export const login =
    (token: TokenType): any =>
    async (dispatch: Dispatch) => {
        Cookies.set(ACCESS_TOKEN_KEY, JSON.stringify(token), {
            expires: new Date(token.expiresIn * 1000),
        });

        try {
            const user = await getUseInfo();
            sessionStorage.setItem(USER_KEY, JSON.stringify(user));
            dispatch(setUser(user));
        } catch (error: any) {
            console.log({ loadUserError: error });
            window.location.href = "/auth/login";
        }
    };

export const logout = (): any => async (dispatch: Dispatch) => {
    Cookies.remove(ACCESS_TOKEN_KEY);
    sessionStorage.removeItem(USER_KEY);
    dispatch(setUser(null));
    window.location.href = "/auth/login";
};

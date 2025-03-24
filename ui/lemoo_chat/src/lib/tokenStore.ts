import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/common/constants/auth";
import { TokenType } from "@/common/enum/token.enum";
import { Token } from "@/common/type/token.type";
import Cookies from "js-cookie";

export const getTokenKey = (type: TokenType) => {
    return type === TokenType.ACCESS_TOKEN
        ? ACCESS_TOKEN_KEY
        : REFRESH_TOKEN_KEY;
};

export const saveToken = async (token: Token) => {
    const key = getTokenKey(token.type);

    try {
        Cookies.set(key, JSON.stringify(token), {
            domain: ".lemoo.com",
            expires: new Date(token.expiresIn * 1000),
        });
    } catch (error) {
        console.error("Save token error", error);
    }
};

export const getTokenValue = async (type: TokenType) => {
    try {
        const tokenDataStr = Cookies.get(getTokenKey(type));

        if (tokenDataStr) {
            const { expiresIn, value: token } = JSON.parse(
                tokenDataStr
            ) as Token;

            const currentTime = Math.floor(Date.now() / 1000);
            if (currentTime < expiresIn) {
                return token;
            } else {
                console.log("Token has expired");
                await removeToken(type);
                return null;
            }
        }
    } catch (error) {
        console.error("Error retrieving token", error);
        return null;
    }
};

export const removeToken = async (type: TokenType) => {
    try {
        Cookies.remove(getTokenKey(type), {
            domain: import.meta.env.VITE_BASE_DOMAIN,
        });
    } catch (error) {
        console.error("Error removing token", error);
    }
};

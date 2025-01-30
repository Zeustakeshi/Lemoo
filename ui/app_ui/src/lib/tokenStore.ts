import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from "@/common/constants/token";
import { TokenType } from "@/common/enum/token";
import { Token } from "@/common/type/token";
import * as SecureStore from "expo-secure-store";

export const getTokenKey = (type: TokenType) => {
    return type === TokenType.ACCESS_TOKEN
        ? ACCESS_TOKEN_KEY
        : REFRESH_TOKEN_KEY;
};

export const saveToken = async (token: Token) => {
    const key = getTokenKey(token.type);

    try {
        await SecureStore.setItemAsync(key, JSON.stringify(token));
    } catch (error) {
        console.error(
            "SecureStore failed, falling back to AsyncStorage",
            error
        );
    }
};

export const getTokenValue = async (type: TokenType) => {
    try {
        const tokenDataStr = await SecureStore.getItemAsync(getTokenKey(type));

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
        await SecureStore.deleteItemAsync(getTokenKey(type));
    } catch (error) {
        console.error("Error removing token", error);
    }
};

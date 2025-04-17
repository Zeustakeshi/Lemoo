import Cookies from "js-cookie";
import { REFRESH_TOKEN_KEY } from "../../common/constants/auth";
import { redirectToSSO } from "./redirectToSSO";

export const getRefreshToken = (): string | undefined => {
    const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);
    if (!refreshToken) redirectToSSO();
    return refreshToken;
};

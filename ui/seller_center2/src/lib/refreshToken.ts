import memoize from "memoizee";
import * as tokenStore from "./tokenStore";

import { clearLocalStorage, clearSessionStorage } from "./storage";
import { TokenType } from "../common/enum/token.enum";
import { api } from "./api";

const clearAuth = () => {
  clearLocalStorage();
  clearSessionStorage();
  tokenStore.removeToken(TokenType.ACCESS_TOKEN);
  tokenStore.removeToken(TokenType.REFRESH_TOKEN);
};

const refreshToken = async () => {
  const refreshToken = await tokenStore.getTokenValue(TokenType.REFRESH_TOKEN);
  if (!refreshToken) {
    clearAuth();
    return;
  }
  alert("Refresh token");
  try {
    const data: any = await api({
      method: "POST",
      url: "/token/refresh",
      data: {
        refreshToken: refreshToken,
      },
    });

    await tokenStore.saveToken(data.accessToken);
    await tokenStore.saveToken(data.refreshToken);
  } catch (error) {
    console.log("Refresh token error " + error);
    clearAuth();
  }
};

const maxAge = 10000;
export const memoizedRefreshToken = memoize(refreshToken, {
  maxAge,
});

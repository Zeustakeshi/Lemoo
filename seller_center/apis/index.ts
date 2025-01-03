import Cookies from "js-cookie";
import athorizedAxiosInstance from "../src/utils/athorizedAxios";
import { API_ROOT } from "../src/utils/contants";

export const handleLogoutAPI = async () => {
  Cookies.remove("userInfo");
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");

  return await athorizedAxiosInstance.delete(`${API_ROOT}/auth/exit`);
};

//refreshTokenAPI
export const refreshTokenAPI = async (refreshToken: string | null) => {
  return await athorizedAxiosInstance.put(`${API_ROOT}/token/refresh`, {
    refreshToken,
  });
};

// CheckAuth
export const isLoggedIn = (): boolean => !!Cookies.get("accessToken");

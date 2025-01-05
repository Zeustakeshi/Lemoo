import Cookies from "js-cookie";
import athorizedAxiosInstance from "../src/utils/athorizedAxios";
import { API_ROOT } from "../src/utils/contants";

// Lấy hàm setUser từ UserContext
export const handleLogoutAPI = async () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  return await athorizedAxiosInstance.delete(`/auth/exit`);
};

//refreshTokenAPI
export const refreshTokenAPI = async (refreshToken: string | null) => {
  return await athorizedAxiosInstance.put(`/token/refresh`, {
    refreshToken,
  });
};

// CheckAuth
export const isLoggedIn = (): boolean => !!Cookies.get("accessToken");

// CheckStore

export const isHaveStore = async () => {
  const store = await athorizedAxiosInstance.get(`/store/info`);
  console.log(store);
  return store.data.success;
};

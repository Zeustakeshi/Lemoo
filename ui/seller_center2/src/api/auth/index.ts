import Cookies from "js-cookie";
import authorizedAxiosInstance from "../../common/auth/authorizedAxios";

// Lấy hàm setUser từ UserContext
export const handleLogoutAPI = async () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  return await authorizedAxiosInstance.delete(`/auth/exit`);
};

//refreshTokenAPI
export const refreshTokenAPI = async (refreshToken: string | null) => {
  return await authorizedAxiosInstance.put(`/token/refresh`, {
    refreshToken,
  });
};

// CheckAuth
export const isLoggedIn = (): boolean => !!Cookies.get("accessToken");

// CheckStore

export const isHaveStore = async () => {
  const store = await authorizedAxiosInstance.get(`/store/info`);
  console.log(store);
  return store.data.success;
};

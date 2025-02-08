import Cookies from "js-cookie";
import authorizedAxiosInstance from "../../common/auth/authorizedAxios";

// CheckAuth
export const isLoggedIn = (): boolean => !!Cookies.get("accessToken");

// CheckStore
export const isHaveStore = async () => {
  const store = await authorizedAxiosInstance.get(`/store/info`);
  console.log(store);
  return store.data.success;
};

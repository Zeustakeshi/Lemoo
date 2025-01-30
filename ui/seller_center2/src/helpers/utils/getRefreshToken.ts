import Cookies from "js-cookie";

export const getRefreshToken = (): string | undefined => {
  const refreshToken = Cookies.get("lemoo.access_token");
  console.log("Refresh Token:", refreshToken); // In ra để kiểm tra
  return refreshToken;
};

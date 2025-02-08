import Cookies from "js-cookie";
import { REFRESH_TOKEN_KEY } from "../../common/constants/auth";

export const getRefreshToken = (): string | undefined => {
  const refreshToken = Cookies.get(REFRESH_TOKEN_KEY);
  return refreshToken;
};

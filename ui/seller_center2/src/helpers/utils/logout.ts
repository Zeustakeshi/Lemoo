import { TokenType } from "../../common/enum/token.enum";
import { clearSessionStorage } from "../../lib/storage";
import { removeToken } from "../../lib/tokenStore";
import { redirectToSSO } from "./redirectToSSO";

export const logout = () => {
  removeToken(TokenType.ACCESS_TOKEN);
  removeToken(TokenType.REFRESH_TOKEN);
  clearSessionStorage();
  redirectToSSO();
};

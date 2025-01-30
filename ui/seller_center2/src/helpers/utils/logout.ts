import { redirectToSSO } from "./redirectToSSO";

export const logout = () => {
  document.cookie =
    "lemoo.access_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  redirectToSSO();
};

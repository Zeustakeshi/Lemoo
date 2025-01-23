import { User } from "../../common/type/user.type";
import axiosInstance from "../../helpers/axios/axiosInstance";

export const getUserInfo = async (): Promise<User> => {
  return await axiosInstance.get("/users/me");
};

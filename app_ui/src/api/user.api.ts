import { User } from "@/common/type/user";
import { api } from "@/lib/api";

export const getUserInfo = async (): Promise<User> => {
    return await api.get("/users/me");
};

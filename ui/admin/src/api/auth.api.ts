import { TokenType } from "@/common/type/token.type";
import { User } from "@/common/type/user.type";
import { api } from "@/lib/api";
import { LoginType } from "@/schemas/auth.schema";

export const login = async (data: LoginType): Promise<TokenType> => {
    // return await sleep<TokenType>(token, 500);
    return await api.post("admin/auth/login", data);
};

export const getUseInfo = async (): Promise<User> => {
    // return await sleep<User>(user, 500);
    return await api.get("/users/me");
};

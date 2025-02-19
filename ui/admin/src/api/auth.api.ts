import { ENVIRONMENT } from "@/common/constants/environment.const";
import { TokenType } from "@/common/type/token.type";
import { User } from "@/common/type/user.type";
import { token, user } from "@/data/auth.data";
import { api } from "@/lib/api";
import { sleep } from "@/lib/utils";
import { LoginType } from "@/schemas/auth.schema";

export const login = async (data: LoginType): Promise<TokenType> => {
    if (ENVIRONMENT === "dev") return await sleep<TokenType>(token, 500);
    return await api.post("/auth/admin/login", data);
};

export const getUseInfo = async (): Promise<User> => {
    if (ENVIRONMENT === "dev") return await sleep<User>(user, 500);
    return await api.get("/users/me");
};

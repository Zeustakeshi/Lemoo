import { TokenType } from "@/common/type/token.type";
import { User } from "@/common/type/user.type";
import { token, user } from "@/data/auth.data";
import { sleep } from "@/lib/utils";
import { LoginType } from "@/schemas/auth.schema";

export const login = async (data: LoginType): Promise<TokenType> => {
    return await sleep<TokenType>(token, 500);
};

export const getUseInfo = async (): Promise<User> => {
    return await sleep<User>(user, 500);
};

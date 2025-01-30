import { TokenType } from "../enum/token.enum";

export type Token = {
    id: string;
    value: string;
    type: TokenType;
    expiresIn: number;
};

export type TokenPair = {
    accessToken: Token;
    refreshToken: Token;
};

import { TokenType } from "../enums/token";

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

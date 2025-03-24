import { TokenType } from "@/common/enums/token";
import { TokenPair } from "@/common/type/token";
import { api } from "@/lib/api";
import { getTokenValue } from "@/lib/tokenStore";
import {
    createAccountSchema,
    loginSchema,
    otpSchema,
} from "@/schema/auth.schema";
import { z } from "zod";

export const createAccount = async (
    data: z.infer<typeof createAccountSchema>
) => {
    return await api.post(`/auth/register`, data);
};

export const resendCreateAccountOtp = async (code: string) => {
    return await api.post(`/auth/register/otp/resend`, { code });
};

export const verifyCreateAccountOtp = async (
    data: z.infer<typeof otpSchema>
): Promise<TokenPair> => {
    return api.post(`/auth/register/otp/verify`, data);
};

export const login = async (
    data: z.infer<typeof loginSchema>
): Promise<any> => {
    return await api.post(`/auth/login`, data);
};

export const resendMfaOtp = async (code: string) => {
    return await api.post(`/auth/login/mfa/resend`, { code });
};

export const verifyMfaOtp = async (
    data: z.infer<typeof otpSchema>
): Promise<TokenPair> => {
    return await api.post(`/auth/login/mfa/verify`, data);
};

export const logout = async () => {
    const token = await getTokenValue(TokenType.REFRESH_TOKEN);
    if (!token) return;
    try {
        await api.post(`/auth/exit`, { token });
    } catch (error: any) {
        console.log({ error });
    }
    return "oke";
};

export const getGoogleOauthUrl = async (): Promise<string> => {
    return await api.get("/auth/google");
};

export const loginWithGoogle = async (code: string): Promise<TokenPair> => {
    return await api.post("/auth/google", { code });
};

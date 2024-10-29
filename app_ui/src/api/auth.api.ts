import { api } from "@/lib/api";
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
) => {
    console.log({ data });
    return api.post(`/auth/register/otp/verify`, data);
};

export const login = async (data: z.infer<typeof loginSchema>) => {
    return await api.post(`/auth/login`, data);
};

export const resendMfaOtp = async (code: string) => {
    return api.post(`/auth/login/mfa/resend`, { code });
};

export const verifyMfaOtp = async (data: z.infer<typeof otpSchema>) => {
    return api.post(`auth/login/mfa/verify`, data);
};

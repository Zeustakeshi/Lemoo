import { z } from "zod";

const emailSchema = z
    .string({ message: "Địa chỉ email không được bỏ trống" })
    .email({ message: "Địa chỉ email không hợp lệ" });

const phoneSchema = z
    .string({ message: "Số điện thoại không được bỏ trống" })
    .min(10, "Số điện thoại không hợp lệ")
    .max(15, "Số điện thoại không hợp lệ");

const passwordSchema = z
    .string({ message: "Mật khẩu không được bỏ trống" })
    .min(8, "Mật khẩu quá ngắn")
    .max(200, "Mật khẩu quá dài");

export const createAccountSchema = z.object({
    username: z
        .string({ message: "Tên người dùng không được bỏ trống" })
        .min(5, "Tên người dùng quá ngắn")
        .max(200, "Tên người dùng quá dài"),
    email: emailSchema,
    phone: phoneSchema,
    password: passwordSchema,
});

export const loginSchema = z.object({
    accountName: z.string({ message: "Tên tài khoản không được bỏ trống!" }),
    password: passwordSchema,
});

export const otpSchema = z.object({
    code: z.string(),
    otp: z
        .string({ message: "OTP không được bỏ trống." })
        .length(6, { message: "OTP không hợp lệ!" }),
});

/** SCHEMA TYPE */
export type CreateAccountType = z.infer<typeof createAccountSchema>;
export type LoginType = z.infer<typeof loginSchema>;
export type OtpType = z.infer<typeof otpSchema>;

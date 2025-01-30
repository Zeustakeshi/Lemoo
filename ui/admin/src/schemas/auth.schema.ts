import { z } from "zod";

export const loginSchema = z.object({
    email: z
        .string({
            required_error: "Email không được bỏ trống",
        })
        .email({ message: "Vui lòng nhập email hợp lệ" }),
    password: z.string({ required_error: "Mật khẩu không được bỏ trống" }),
});

export type LoginType = z.infer<typeof loginSchema>;

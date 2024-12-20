import { z } from "zod";

export const CreateChannelSchema = z.object({
    name: z
        .string({ required_error: "Tên kênh không được bỏ trống" })
        .min(5, "Tên kênh phải có ít nhất 5 kí tự")
        .max(100, "Tên kênh có tối đa 100 kí tự"),
    description: z.optional(
        z.string().min(5, "Mô tả kênh quá ngắn").max(1500, "Mô tả kênh quá dài")
    ),
});

export type CreateChannelType = z.infer<typeof CreateChannelSchema>;

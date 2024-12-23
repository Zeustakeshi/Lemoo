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

export const UpdateVideoMetadataSchema = z.object({
    tags: z
        .array(z.string().min(5, "Tag phải có độ dài 5 ký tự"))
        .min(5, "Video phải có ít nhất 5 tag"),
    products: z.array(z.string()),
    isPublic: z.boolean(),
});

/** TYPE */
export type CreateChannelType = z.infer<typeof CreateChannelSchema>;
export type UpdateVideoMetadataType = z.infer<typeof UpdateVideoMetadataSchema>;

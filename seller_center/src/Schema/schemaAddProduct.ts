import { z } from "zod";

// Schema cho biến thể
export const variantSchema = z.object({
  name: z.string().min(1, "Tên biến thể là bắt buộc"),
  image: z.object({
    mediaId: z.string(),
    url: z.string().url("URL không hợp lệ"),
  }),
  sellerSku: z.string(),
  allowSale: z.boolean(),
  price: z.number().min(0, "Giá phải lớn hơn hoặc bằng 0"),
  specialPrice: z.number().optional(),
  specialFromDate: z.string().optional(),
  specialToDate: z.string().optional(),
  stock: z.number().min(0, "Số lượng phải lớn hơn hoặc bằng 0"),
  packageWidth: z.number().optional(),
  packageHeight: z.number().optional(),
  packageLength: z.number().optional(),
  packageWeight: z.number().optional(),
  attributes: z.record(z.string(), z.string()),
});

// Schema cho sản phẩm
export const productSchema = z.object({
  name: z.string().min(1, "Tên sản phẩm là bắt buộc"),
  description: z.string(),
  categoryId: z.string(),
  smallImage: z.object({
    mediaId: z.string(),
    url: z.string().url("URL không hợp lệ"),
  }),
  video: z
    .object({
      mediaId: z.string(),
      url: z.string().url("URL không hợp lệ"),
    })
    .optional(),
  images: z.array(
    z.object({
      mediaId: z.string(),
      url: z.string().url("URL không hợp lệ"),
    })
  ),
  attributes: z.array(
    z.object({
      name: z.string(),
      values: z.array(z.string()),
    })
  ),
  variants: z.array(variantSchema),
});

// TypeScript types
export type Product = z.infer<typeof productSchema>;
export type Variant = z.infer<typeof variantSchema>;

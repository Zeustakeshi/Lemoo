import { z } from "zod";

// Schema cho form
export const schema = z.object({
    identityCardName: z.string({message: "Trường bắt buộc"}).min(8, "This is so large"),
    identityCardNumber: z.string({message: "Trường bắt buộc"}).min(12, 'Đúng 12 chữ số'),
    // avatar: z
    //   .custom<File>((file) => file instanceof File, "File is required")
    //   .optional(),
    identityCardFrontSide: z.instanceof(File, { message: "Trường bắt buộc" }),
    identityCardBackSide: z.instanceof(File, { message: "Trường bắt buộc" }),
    TIN: z.string().min(10, 'Trường bắt buộc'),
    taxRegistrationDocument: z.instanceof(File, { message: "Trường bắt buộc" }),
    bankDocument: z.instanceof(File, { message: "Trường bắt buộc" }),
    bankAccountName: z.string({message: 'Trường bắt buộc'}),
    bankAccountNumber: z.string({message: 'Trường bắt buộc'}),
    bankName: z.string({message:"Trường bắt buộc"}),     
    bankCode: z.string({message:"Trường bắt buộc"}),
    bankBin:z.string({message:"Trường bắt buộc"}),
  });
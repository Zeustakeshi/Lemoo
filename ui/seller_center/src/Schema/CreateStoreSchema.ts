import { z } from "zod";

// Tạo schema với Zod
export const CreateStoreSchema = z.object({
    // name: z.string()
    //   .min(1, "Tên cửa hàng là bắt buộc")
    //   .max(100, "Tên cửa hàng không được vượt quá 100 ký tự"),

    // identityCardName: z.string()
    //   .min(1, "Họ và tên trên CMND/CCCD là bắt buộc")
    //   .max(50, "Họ và tên không được vượt quá 50 ký tự"),

    // identityCardNumber: z.string()
    //   .regex(/^\d{9,12}$/, "Số CMND/CCCD phải từ 9 đến 12 chữ số"),

    identityCardFrontSide: z
        .custom<File>((val) => val instanceof File, {
            message: "Mặt trước CMND/CCCD phải là một tệp hợp lệ",
        })
        .nullable(),

    // identityCardBackSide: z.custom<File>((val) => val instanceof File, {
    //   message: "Mặt sau CMND/CCCD phải là một tệp hợp lệ",
    // }),

    // TIN: z.string()
    //   .regex(/^\d{9}$/, "Mã số thuế phải là 9 chữ số"),

    // taxRegistrationDocument: z.custom<File>((val) => val instanceof File, {
    //   message: "Tài liệu đăng ký thuế phải là một tệp hợp lệ",
    // }),

    // bankDocument: z.custom<File>((val) => val instanceof File, {
    //   message: "Tài liệu ngân hàng phải là một tệp hợp lệ",
    // }),

    // bankAccountName: z.string()
    //   .min(1, "Tên chủ tài khoản ngân hàng là bắt buộc")
    //   .max(50, "Tên chủ tài khoản không được vượt quá 50 ký tự"),

    // bankAccountNumber: z.string()
    //   .regex(/^\d{9,16}$/, "Số tài khoản ngân hàng phải từ 9 đến 16 chữ số"),

    // bankName: z.string()
    //   .min(1, "Tên ngân hàng là bắt buộc")
    //   .max(100, "Tên ngân hàng không được vượt quá 100 ký tự"),

    // bankBranch: z.string()
    //   .min(1, "Chi nhánh ngân hàng là bắt buộc")
    //   .max(100, "Chi nhánh ngân hàng không được vượt quá 100 ký tự"),

    // bankCode: z.string()
    //   .regex(/^[A-Z]{3}$/, "Mã ngân hàng phải là 3 chữ cái viết hoa"),

    // bankBin: z.string()
    //   .regex(/^\d{6}$/, "Mã BIN ngân hàng phải là 6 chữ số"),
});

// Suy ra kiểu dữ liệu từ schema

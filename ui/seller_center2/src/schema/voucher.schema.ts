import { z } from "zod";

/* ------------------------- 1. Common Schemas ------------------------- */

/* Voucher Name */
const NameSchema = z
    .string({ message: "Invalid voucher name" })
    .min(5, "Voucher name must be at least 5 characters long");

/* Voucher Period Time */
const PeriodTimeSchema = z.object({
    periodStartTime: z
        .string({ message: "Invalid promotion start time" })
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Promotion start time must be a valid date",
        }),
    periodEndTime: z
        .string({ message: "Invalid promotion end time" })
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Promotion end time must be a valid date",
        }),
});

/* Voucher Collect Time */
const CollectTimeSchema = z.object({
    collectStartTime: z
        .string({ message: "Invalid collect start time" })
        .refine((val) => !isNaN(Date.parse(val)), {
            message: "Collect start time must be a valid date",
        }),
});

/* Total Available Schema */
const TotalAvailableSchema = z.object({
    totalAvailable: z
        .number({ message: "Invalid total available" })
        .int("Total available must be an integer")
        .nonnegative("Total available must be non-negative"),
});

/* Limit Schema */
const LimitSchema = z.object({
    limit: z
        .number({ message: "Invalid voucher limit per user" })
        .int("Voucher limit per user must be an integer")
        .nonnegative("Voucher limit per user must be non-negative"),
});

/* Discount Schema */
const DiscountSchema = z
    .object({
        discountType: z.enum(["MONEY_VALUE", "PERCENTAGE"], {
            message: "Invalid discount type",
        }),
        discountValue: z
            .number({ message: "Invalid discount value" })
            .nonnegative("Discount value must be non-negative"),
        maximumDiscountValue: z
            .number({ message: "Invalid maximum discount value" })
            .nonnegative("Maximum discount value must be non-negative")
            .optional(),
        minimumOrderValue: z
            .number({ message: "Invalid  minimum order value" })
            .nonnegative("Minimum order value must be non-negative")
            .optional(),
        budget: z
            .number({ message: "Invalid budget" })
            .nonnegative("Budget must be non-negative")
            .optional(),
    })
    .refine(
        (data) => {
            if (data.discountType === "PERCENTAGE") {
                return data.discountValue <= 100;
            }
            return true;
        },
        {
            message: "Percentage discount value cannot exceed 100",
            path: ["discountValue"],
        }
    )
    .refine(
        (data) => {
            if (data.discountType === "MONEY_VALUE") {
                return data.budget !== undefined;
            }
            return true;
        },
        {
            message: "Budget is required for money value discount",
            path: ["budget"],
        }
    )
    .refine(
        (data) => {
            if (data.discountType === "PERCENTAGE") {
                return data.maximumDiscountValue !== undefined;
            }
            return true;
        },
        {
            message: "Maximum order value is required for percentage discount",
            path: ["maximumOrderValue"],
        }
    );

/* Voucher Scope */
const VoucherScopeSchema = z.object({
    scope: z.enum(["ENTIRE_STORE", "SPECIFIC_PRODUCT"], {
        message: "Invalid voucher scope",
    }),
});

/* ------------------------- 2. Voucher Schemas ------------------------- */

/* Base Voucher Schema */
export const BaseVoucherSchema = z
    .object({
        name: NameSchema,
        ...PeriodTimeSchema.shape,
        ...CollectTimeSchema.shape,
        ...TotalAvailableSchema.shape,
    })
    .and(DiscountSchema)
    .refine(
        (data) => {
            const endTime = new Date(data.periodEndTime);
            const now = new Date();
            return endTime >= now;
        },
        {
            message: "End time must be greater than the current time",
            path: ["periodEndTime"],
        }
    )
    .refine(
        (data) => {
            const startTime = new Date(data.periodStartTime);
            const endTime = new Date(data.periodEndTime);
            return startTime < endTime;
        },
        {
            message: "Start time must be less than end time",
            path: ["periodStartTime"],
        }
    )
    .refine(
        (data) => {
            const collectStartTime = new Date(data.collectStartTime);
            const startTime = new Date(data.periodStartTime);
            const endTime = new Date(data.periodEndTime);
            return collectStartTime >= startTime && collectStartTime <= endTime;
        },
        {
            message: "Collect start time must be between start and end time",
            path: ["collectStartTime"],
        }
    );

/* Regular Voucher Schema */
export const RegularVoucherSchema = BaseVoucherSchema.and(TotalAvailableSchema)
    .and(LimitSchema)
    .and(VoucherScopeSchema);

/* ------------------------- 3. Type Exports ------------------------- */

export type BaseVoucherSchemaType = z.infer<typeof BaseVoucherSchema>;
export type RegularVoucherSchemaType = z.infer<typeof RegularVoucherSchema>;
export type VoucherScopeSchemaType = z.infer<typeof VoucherScopeSchema>;
export type NameSchemaType = z.infer<typeof NameSchema>;
export type PeriodTimeSchemaType = z.infer<typeof PeriodTimeSchema>;
export type CollectTimeSchemaType = z.infer<typeof CollectTimeSchema>;
export type DiscountSchemaType = z.infer<typeof DiscountSchema>;
export type TotalAvailableSchemaType = z.infer<typeof TotalAvailableSchema>;
export type LimitSchemaType = z.infer<typeof LimitSchema>;

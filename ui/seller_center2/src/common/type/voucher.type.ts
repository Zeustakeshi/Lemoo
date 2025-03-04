import {
    DiscountType,
    VoucherScope,
    VoucherStatus,
} from "../enum/voucher.enum";

export type BaseVoucherResponse = {
    id: string;
    name: string;
    status: VoucherStatus;
    periodStartTime: string;
    periodEndTime: string;
    collectStartTime: string;
    scope: VoucherScope;
    discountType: DiscountType;
    discountValue: number;
    minimumOrderValue: number;
    maximumDiscountValue?: number;
    totalAvailable: number;
    limit: number;
    createdAt: string;
    updatedAt: string;
};

export type RegularVoucherResponse = {
    budget: number;
} & BaseVoucherResponse;

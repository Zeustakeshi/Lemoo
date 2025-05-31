import { Pageable } from "@/common/type/page.type";
import { StoreVoucherResponse } from "@/common/type/voucher.type";
import { api } from "@/lib/api";

export const getAllVoucherByStoreId = async (
    storeId: string
): Promise<Pageable<StoreVoucherResponse>> => {
    return await api.get(`/promotion/vouchers/store/${storeId}`);
};

export const collectVoucher = async (voucherId: string) => {
    return await api.post(`/promotion/vouchers/${voucherId}/collect`);
};

export const getAllUserVoucher = async () => {
    return api.get("/promotion/vouchers/collected");
};

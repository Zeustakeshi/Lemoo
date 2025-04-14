import { RegularVoucherSchemaType } from "@/schema/voucher.schema";
import { Pageable } from "../common/type/page.type";
import { Store } from "../common/type/store.type";
import { RegularVoucherResponse } from "../common/type/voucher.type";
import { api } from "../lib/api";
import { getSessionStorageValue } from "../lib/storage";

export const getAllRegularVoucher = async (
    page: number,
    limit: number
): Promise<Pageable<RegularVoucherResponse>> => {
    const store = getSessionStorageValue<Store>("storeInfo");

    return await api.get("/promotion/seller/vouchers/regular", {
        params: { page, limit },
        headers: {
            "X-store-id": store?.id,
        },
    });
};

export const activateRegularVoucher = async (voucherId: string) => {
    const store = getSessionStorageValue<Store>("storeInfo");
    return await api.patch(
        `/promotion/seller/vouchers/regular/${voucherId}/activate`,
        {},
        {
            headers: {
                "X-store-id": store?.id,
            },
        }
    );
};

export const deactivateRegularVoucher = async (voucherId: string) => {
    const store = getSessionStorageValue<Store>("storeInfo");
    return await api.patch(
        `/promotion/seller/vouchers/regular/${voucherId}/deactivate`,
        {},
        {
            headers: {
                "X-store-id": store?.id,
            },
        }
    );
};

export const createRegularVoucher = async (data: RegularVoucherSchemaType) => {
    const store = getSessionStorageValue<Store>("storeInfo");
    return await api.post("/promotion/seller/vouchers/regular", data, {
        headers: {
            "X-store-id": store?.id,
        },
    });
};

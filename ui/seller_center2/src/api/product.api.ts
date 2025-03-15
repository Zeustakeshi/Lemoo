import { Pageable } from "@/common/type/page.type";
import { ProductResponse } from "@/common/type/product.type";
import { Store } from "@/common/type/store.type";
import { api } from "@/lib/api";
import { getSessionStorageValue } from "@/lib/storage";

export const getAllProduct = async (
    page: number,
    limit?: number
): Promise<Pageable<ProductResponse>> => {
    const store = getSessionStorageValue<Store>("storeInfo");
    if (!store) return Promise.reject("Không thể tìm thấy thông tin cửa hàng");
    return await api.get("/products/store", {
        headers: {
            "x-store-id": store.id,
        },
        params: { page, limit: limit ?? 10 },
    });
};

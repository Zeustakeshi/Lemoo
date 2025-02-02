import { ENVIRONMENT } from "@/common/constants/environment.const";
import { Pageable } from "@/common/type/page.type";
import { StoreStatus, StoreType } from "@/common/type/store.type";
import { pageStores } from "@/data/store.data";
import { api } from "@/lib/api";
import { sleep } from "@/lib/utils";

export const getAllStore = async (
    page: number,
    status: StoreStatus
): Promise<Pageable<StoreType>> => {
    if (ENVIRONMENT === "dev")
        return await sleep<Pageable<StoreType>>(pageStores, 1000);

    return api.get("/admin/stores", { params: { page, status: status } });
};

export const activateStore = async (storeId: string) => {
    if (ENVIRONMENT === "dev") return await sleep(1000);
    return await api.post(`/admin/stores/${storeId}/activate`);
};

export const deactivateStore = async (storeId: string) => {
    if (ENVIRONMENT === "dev") return await sleep(1000);
    return await api.post(`/admin/stores/${storeId}/deactivate`);
};

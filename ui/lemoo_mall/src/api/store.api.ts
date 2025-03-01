import { StoreOverviewResponse } from "@/common/type/store.type";
import { api } from "@/lib/api";

export const getStoreOverviewById = async (
    storeId: string
): Promise<StoreOverviewResponse> => {
    return await api.get(`/store/open/dasf/`);
};

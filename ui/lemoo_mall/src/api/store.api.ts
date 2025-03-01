import { StoreOverviewResponse } from "@/common/type/store.type";
import { api } from "@/lib/api";

export const getStoreOverviewById = async (
    storeId: string
): Promise<StoreOverviewResponse> => {
    return await api.get(`/store/open/${storeId}`);
};

export const getStoreFollowStatus = async (
    storeId: string
): Promise<boolean> => {
    return await api.get(`/store/${storeId}/follow/status`);
};

export const followStore = async (storeId: string) => {
    return await api.post(`/store/${storeId}/follow`);
};

export const unFollowStore = async (storeId: string) => {
    return await api.post(`/store/${storeId}/unfollow`);
};

import { StoreOverviewResponse } from "@/common/type/store.type";
import { storeOverviewData } from "@/data/store.data";
import { sleepAndFakeData } from "@/lib/utils";

export const getStoreOverviewById = async (
    storeId: string
): Promise<StoreOverviewResponse> => {
    return sleepAndFakeData<StoreOverviewResponse>(storeOverviewData, 500);
};

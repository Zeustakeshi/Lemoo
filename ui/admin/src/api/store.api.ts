import { Pageable } from "@/common/type/page.type";
import { StoreType } from "@/common/type/store.type";
import { pageStores } from "@/data/store.data";
import { sleep } from "@/lib/utils";

export const getAllStore = async (
    page: number
): Promise<Pageable<StoreType>> => {
    return await sleep<Pageable<StoreType>>(pageStores, 1000);
};

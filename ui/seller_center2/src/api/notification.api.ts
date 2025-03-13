import { NotificationItemResponse } from "@/common/type/notification.type";
import { Pageable } from "@/common/type/page.type";
import { Store } from "@/common/type/store.type";
import { api } from "@/lib/api";
import { getSessionStorageValue } from "@/lib/storage";

export const getAllStoreNotifications = async (
    page: number
): Promise<Pageable<NotificationItemResponse[]>> => {
    const store: Store | null = await getSessionStorageValue("storeInfo");
    if (!store || !store.id) {
        return Promise.reject("Không tìm thấy thông tin cửa hàng");
    }
    return await api.get("/notifications/store", {
        headers: {
            "x-store-id": store.id,
        },
        params: { page, limit: 20 },
    });
};

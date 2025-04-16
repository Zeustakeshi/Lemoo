import { OrderDetailType } from "@/common/type/order.type";
import { Pageable } from "@/common/type/page.type";
import { api } from "@/lib/api";

export const getUserOrder = async (
    page: number
): Promise<Pageable<OrderDetailType>> => {
    return await api.get("/orders", { params: { page, limit: 20 } });
};

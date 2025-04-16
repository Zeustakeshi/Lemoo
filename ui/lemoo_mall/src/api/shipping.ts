import { ShippingOrderResponse } from "@/common/type/shipping.type";
import { api } from "@/lib/api";

export const getShippingInfoByOrderId = async (
    orderId: string
): Promise<ShippingOrderResponse> => {
    return await api.get(`/shipping/order/${orderId}`);
};

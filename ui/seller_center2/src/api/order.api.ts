import { OrderResponse } from "@/common/type/order.type";
import { api } from "@/lib/api";

export type OrderAction = "confirm" | "cancel" | "packed";

export const getAllOrder = async (storeId: string): Promise<OrderResponse> => {
  return await api.get("/orders/seller", {
    headers: {
      "x-store-Id": storeId,
    },
  });
};

export const handleOrderAction = async (
  orderId: string,
  storeId: string,
  action: OrderAction
): Promise<OrderResponse> => {
  return await api.get(`/orders/seller/${orderId}/${action}`, {
    headers: {
      "x-store-Id": storeId,
    },
  });
};

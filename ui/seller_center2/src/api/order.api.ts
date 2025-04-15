import { OrderResponse } from "@/common/type/order.type";
import { api } from "@/lib/api";

export type OrderAction = "confirm" | "packed" | "cancel";

export const getAllOrder = async (
  storeId: string,
  status: string
): Promise<OrderResponse> => {
  return await api.get("/orders/seller", {
    headers: {
      "x-store-Id": storeId,
    },
    params: {
      status,
    },
  });
};

export const handleOrderAction = async (
  orderId: string,
  storeId: string,
  action: OrderAction
): Promise<OrderResponse> => {
  return await api.put(`/orders/seller/${orderId}/${action}`, null, {
    headers: {
      "x-Store-Id": storeId, // lưu ý viết đúng chữ hoa/thường theo yêu cầu của backend
    },
  });
};

import { OrderResponse } from "@/common/type/order.type";
import { api } from "@/lib/api";

export const getAllOrder = async (storeId: string): Promise<OrderResponse> => {
  return await api.get("/orders/seller", {
    headers: {
      "x-store-Id": storeId,
    },
  });
};

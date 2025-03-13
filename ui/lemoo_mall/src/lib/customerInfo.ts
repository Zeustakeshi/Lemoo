import { AddressResponse } from "@/common/type/address.type";
import { api } from "./api";

export const customerInfo = async (): Promise<AddressResponse[] | null> => {
  try {
    const response = await api.get<AddressResponse[]>("/shipping/my-address");
    console.log("first log", response);
    return response; // ✅ Trả về dữ liệu chính xác
  } catch (error) {
    console.error("Error loading customer info:", error);
    return null; // ✅ Tránh lỗi undefined
  }
};

import { AddressResponse } from "@/common/type/AddressResponse";
import { api } from "@/lib/api";

export const sellerInfo = async (): Promise<AddressResponse[] | null> => {
  try {
    const response = await api.get<AddressResponse[]>(
      "/shipping/store/address"
    );
    return response;
  } catch (error) {
    console.error("Error loading customer info:", error);
    return null;
  }
};

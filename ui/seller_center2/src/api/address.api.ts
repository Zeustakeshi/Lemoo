import { AddressResponse } from "@/common/type/AddressResponse";
import { api } from "@/lib/api";

export const sellerAdressInfo = async (
  storeId: string
): Promise<AddressResponse[] | null> => {
  try {
    const response = await api.get<AddressResponse[]>(
      "/shipping/store/address",
      {
        headers: {
          "x-store-id": storeId,
        },
      }
    );
    return response;
  } catch (error) {
    console.error("Error loading customer info:", error);
    return null;
  }
};

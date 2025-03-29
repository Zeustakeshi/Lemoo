import { AddressResponse } from "@/common/type/address.type";
import { api } from "./api";

export const customerInfo = async (): Promise<AddressResponse[] | null> => {
  try {
    const response = await api.get<AddressResponse[]>("/shipping/my-address");
    return response;
  } catch (error) {
    console.error("Error loading customer info:", error);
    return null;
  }
};

export const updateAddress = async (addressId: string) => {
  try {
    const response = await api.put(`/shipping/my-address/${addressId}`);

    return response;
  } catch (error) {
    console.error("Error loading customer info:", error);
    return null;
  }
};

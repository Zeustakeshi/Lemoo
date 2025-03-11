import { AddressResponse } from "@/common/type/address.type";
import { Pageable } from "@/common/type/page.type";
import { api } from "@/lib/api";

export const getUserAddress = async (): Promise<Pageable<AddressResponse>> => {
    return await api.get("/shipping/my-address");
};

import { CartResponse } from "@/common/type/cart.type";
import { cartData } from "@/data/carts.data";
import { sleepAndFakeData } from "@/lib/utils";

export const getCartInfo = async (): Promise<CartResponse> => {
    return await sleepAndFakeData<CartResponse>(cartData, 1500);
};

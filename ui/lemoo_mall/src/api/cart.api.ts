import { CartType } from "@/common/type/cart.type";
import { cartData } from "@/data/carts.data";
import { sleepAndFakeData } from "@/lib/utils";

export const getCartInfo = async (): Promise<CartType> => {
    return await sleepAndFakeData<CartType>(cartData, 1500);
};

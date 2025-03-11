import { CartType } from "@/common/type/cart.type";
import { cartData } from "@/data/carts.data";
import { api } from "@/lib/api";
import { sleepAndFakeData } from "@/lib/utils";

export const getCartInfo = async (): Promise<CartType> => {
  return await sleepAndFakeData<CartType>(cartData, 1500);
};

export const AddToCart = async (lemooSku: string, quantity: number) => {
  const data = {
    lemooSku,
    quantity,
  };
  const res = await api.post("cart", data);
  return res;
};

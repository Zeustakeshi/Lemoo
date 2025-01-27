import { CartItemSkuResponse } from "@/common/type/cart.type";
import { Button } from "@/components/ui/button";
import { formatMoneyVND } from "@/lib/utils";
import { Heart, Trash2 } from "lucide-react";
import CartItemQuantity from "./CartItemQuantity";

type Props = {
    cartItemId: string;
    data: CartItemSkuResponse;
};

const CartItem = ({ data, cartItemId }: Props) => {
    return (
        <div className="grid grid-cols-10 mt-3 hover:bg-slate-50 px-2 py-1 cursor-pointer">
            <div className="col-span-6 flex justify-start items-start gap-2">
                <div className="w-[80px] aspect-square">
                    <img src={data.image} alt="" />
                </div>
                <div>
                    <h3 className=" text-base  line-clamp-3">
                        Sản phẩm {data.lemooSku} Lorem, ipsum dolor sit amet
                        consectetur adipisicing elit. Dolorum, nemo.
                    </h3>
                    <div className="flex justify-start items-center gap-2 text-xs font-medium my-2">
                        {Object.values(data.variants).map((value, index) => (
                            <div
                                className="px-4 py-1 bg-slate-100 rounded-xl"
                                key={index}
                            >
                                {value}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <div className="col-span-2 flex flex-col justify-center items-center">
                <h4 className="text-xl font-semibold text-primary">
                    {formatMoneyVND(data.price)}
                </h4>
                <div className="flex justify-center items-center gap-2 mt-2">
                    <Button size="icon" variant="ghost">
                        <Trash2 />
                    </Button>
                    <Button size="icon" variant="ghost">
                        <Heart />
                    </Button>
                </div>
            </div>
            <CartItemQuantity
                skuCode={data.lemooSku}
                quantity={data.quantity}
                cartItemId={cartItemId}
            ></CartItemQuantity>
        </div>
    );
};

export default CartItem;

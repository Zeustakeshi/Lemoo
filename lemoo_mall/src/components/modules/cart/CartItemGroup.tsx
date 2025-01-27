import { CartItemSkuType } from "@/common/type/cart.type";
import { Separator } from "@/components/ui/separator";
import CartItem from "./CartItem";
import CartItemGroupHeader from "./CartItemGroupHeader";

type Props = {
    storeId: string;
    cartItemId: string;
    skus: CartItemSkuType[];
};

const CartItemGroup = ({ storeId, skus, cartItemId }: Props) => {
    return (
        <div className="py-3 px-3">
            <CartItemGroupHeader
                storeId={storeId}
                numberOfSku={skus.length}
            ></CartItemGroupHeader>
            <Separator></Separator>
            <div className="my-2">
                {skus.map((sku) => (
                    <CartItem
                        key={sku.lemooSku}
                        data={sku}
                        cartItemId={cartItemId}
                    ></CartItem>
                ))}
            </div>
        </div>
    );
};

export default CartItemGroup;

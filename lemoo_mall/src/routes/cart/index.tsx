import { getCartInfo } from "@/api/cart.api";
import CartInfo from "@/components/modules/cart/CartInfo";
import CartItemGroup from "@/components/modules/cart/CartItemGroup";
import ProductFeature from "@/components/modules/product/ProductFeature";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { calculateTotalSku } from "@/lib/utils";
import {
    clearAllSelectedCartItem,
    removeCartItemFromSelectedCartItem,
    selectAllCartItem,
    selectCart,
    updateCart,
} from "@/store/cart/cartSlice";

import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Route = createFileRoute("/cart/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { selectedCartItems, cart } = useSelector(selectCart);

    const { data, isLoading } = useQuery({
        queryKey: ["cart-info"],
        queryFn: getCartInfo,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        if (!data) return;
        dispatch(updateCart(data));
    }, [data]);

    if (isLoading || !data)
        return <div className="text-2xl font-semibold">Đang tải</div>;

    return (
        <div className="my-2">
            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-8">
                    <div className="px-3 my-3 flex w-full justify-between items-center">
                        <Label className="flex justify-start items-center gap-3 cursor-pointer">
                            <Checkbox
                                checked={
                                    calculateTotalSku(selectedCartItems) ===
                                    calculateTotalSku(cart?.items)
                                }
                                onCheckedChange={(checked) => {
                                    if (checked) dispatch(selectAllCartItem());
                                    else dispatch(clearAllSelectedCartItem());
                                }}
                            ></Checkbox>
                            <p className="text-muted-foreground">
                                Chọn tất cả ({calculateTotalSku(cart?.items)}{" "}
                                sản phẩm)
                            </p>
                        </Label>
                        <Button
                            onClick={() => {
                                dispatch(removeCartItemFromSelectedCartItem());
                            }}
                            variant="ghost"
                            size="icon"
                        >
                            <Trash2 />
                        </Button>
                    </div>
                    {cart?.items.map((cartItem) => (
                        <CartItemGroup
                            key={cartItem.id}
                            cartItemId={cartItem.id}
                            storeId={cartItem.storeId}
                            skus={cartItem.skus}
                        ></CartItemGroup>
                    ))}
                </div>
                <div className="col-span-4 ">
                    <CartInfo></CartInfo>
                </div>
            </div>
            <div className="my-5 space-y-4">
                <ProductFeature></ProductFeature>
                <ProductFeature></ProductFeature>
            </div>
        </div>
    );
}

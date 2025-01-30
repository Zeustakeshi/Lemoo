import { getStoreOverviewById } from "@/api/store.api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Skeleton } from "@/components/ui/skeleton";
import {
    clearSelectedCartItem,
    selectCart,
    selectCartItem,
} from "@/store/cart/cartSlice";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CartItemRecommendProduct from "./CartItemRecommendProduct";

type Props = {
    storeId: string;
    numberOfSku: number;
};

const CartItemGroupHeader = ({ storeId, numberOfSku }: Props) => {
    const { selectedCartItems, cart } = useSelector(selectCart);

    const [showRecommendProduct, setShowRecommendProduct] =
        useState<boolean>(false);

    const router = useRouter();
    const dispatch = useDispatch();

    const { data: storeInfo, isLoading: storeInfoLoading } = useQuery({
        queryKey: ["get store-overview"],
        queryFn: async () => await getStoreOverviewById(storeId),
        enabled: !!storeId,
    });

    const isGroupSelected: boolean = useMemo(() => {
        const selectedGroup = selectedCartItems.find(
            (item) => item.storeId === storeId
        );
        if (!selectedGroup) return false;
        return selectedGroup.skus.length === numberOfSku;
    }, [selectedCartItems]);

    return (
        <div className="relative w-full">
            {storeInfoLoading || !storeInfo ? (
                <Skeleton className="w-[30%] h-4"></Skeleton>
            ) : (
                <div className="flex justify-start items-center gap-2">
                    <Checkbox
                        onCheckedChange={(checked) => {
                            if (!cart) return;
                            if (checked) dispatch(selectCartItem(storeId));
                            else dispatch(clearSelectedCartItem(storeId));
                        }}
                        checked={isGroupSelected}
                    ></Checkbox>
                    <div
                        onMouseEnter={() => setShowRecommendProduct(true)}
                        onClick={() =>
                            router.navigate({
                                to: "/store/$storeId",
                                params: { storeId: storeInfo.id },
                            })
                        }
                        className="w-max flex justify-start items-center gap-2 text-muted-foreground cursor-pointer select-none py-2 group"
                    >
                        <Avatar className="size-[24px]">
                            <AvatarImage src={storeInfo.logo}></AvatarImage>
                        </Avatar>
                        <h3>{storeInfo.name}</h3>
                        <ChevronRight size={20} />
                    </div>
                    {showRecommendProduct && (
                        <CartItemRecommendProduct
                            setShow={setShowRecommendProduct}
                        ></CartItemRecommendProduct>
                    )}
                </div>
            )}
        </div>
    );
};

export default CartItemGroupHeader;

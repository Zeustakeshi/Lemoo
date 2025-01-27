import { getStoreOverviewById } from "@/api/store.api";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import CartItemRecommendProduct from "./CartItemRecommendProduct";

type Props = {
    storeId: string;
};

const CartItemGroupHeader = ({ storeId }: Props) => {
    const [showRecommendProduct, setShowRecommendProduct] =
        useState<boolean>(false);

    const router = useRouter();

    const { data: storeInfo, isLoading: storeInfoLoading } = useQuery({
        queryKey: ["get store-overview"],
        queryFn: async () => await getStoreOverviewById(storeId),
        enabled: !!storeId,
    });

    return (
        <div className="relative w-full">
            {storeInfoLoading || !storeInfo ? (
                <Skeleton className="w-[30%] h-4"></Skeleton>
            ) : (
                <>
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
                </>
            )}
        </div>
    );
};

export default CartItemGroupHeader;

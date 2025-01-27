import { Skeleton } from "@/components/ui/skeleton";

type Props = {};

const CartItemSkeleton = (props: Props) => {
    return (
        <div>
            <Skeleton className="w-[100px] h-[20px] rounded-full" />
        </div>
    );
};

export default CartItemSkeleton;

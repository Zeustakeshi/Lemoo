import {
    followStore,
    getStoreFollowStatus,
    unFollowStore,
} from "@/api/store.api";
import { StoreOverviewResponse } from "@/common/type/store.type";
import { Button } from "@/components/ui/button";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
type Props = { store: StoreOverviewResponse };

const StoreInfoCard = ({ store }: Props) => {
    const [isFollowed, setFollowed] = useState<boolean>(false);

    const {
        data: followStatusData,
        refetch: refetchFollowStatus,
        isLoading: fetchFollowStatusLoading,
    } = useQuery({
        queryKey: ["store-follow-status", store.id],
        queryFn: async () => await getStoreFollowStatus(store.id),
    });

    const { mutateAsync: followStoreMutate, isPending: followStoreLoading } =
        useMutation({
            mutationKey: ["follow-store", store.id],
            mutationFn: async () => await followStore(store.id),
            onSuccess: () => setFollowed(true),
        });

    const {
        mutateAsync: unfollowStoreMutate,
        isPending: unfollowStoreLoading,
    } = useMutation({
        mutationKey: ["unfollow-store", store.id],
        mutationFn: async () => await unFollowStore(store.id),
        onSuccess: () => setFollowed(false),
    });

    useEffect(() => {
        setFollowed(!!followStatusData);
    }, [followStatusData]);

    const handleFollowStore = async () => {
        toast.promise(followStoreMutate(), {
            loading: "Đang theo dõi...",
            success: `Theo dõi cửa hàng thành công`,
            error: `Theo dõi cửa hàng thất bại`,
        });
    };

    const handleUnfollowStore = async () => {
        toast.promise(unfollowStoreMutate(), {
            loading: "Đang hủy theo dõi...",
            success: `Hủy theo dõi cửa hàng thành công`,
            error: `Hủy theo dõi cửa hàng thất bại`,
        });
    };

    const handleToggleStoreFollow = async () => {
        if (isFollowed) await handleUnfollowStore();
        else await handleFollowStore();
        await refetchFollowStatus();
    };

    return (
        <div className="h-full  y relative !z-1 bg-white dark:bg-slate-800 shadow-md px-3 py-2 flex justify-between  w-[400px]">
            <div className="flex justify-start items-start flex-1  gap-2 ">
                <div className="h-full aspect-square overflow-hidden">
                    <img
                        className="size-full object-cover"
                        src={store.logo}
                        alt=""
                    />
                </div>
                <div className="space-y-1 ">
                    <p className="text-xl font-semibold ">{store.name}</p>
                    <p className="text-sm text-muted-foreground">
                        {store.follower} người theo dõi
                    </p>
                </div>
            </div>
            <div>
                <Button
                    disabled={
                        fetchFollowStatusLoading ||
                        unfollowStoreLoading ||
                        followStoreLoading
                    }
                    onClick={handleToggleStoreFollow}
                    variant={isFollowed ? "secondary" : "default"}
                >
                    {isFollowed ? "Hủy theo dõi" : "Theo dõi"}
                </Button>
            </div>
        </div>
    );
};

export default StoreInfoCard;

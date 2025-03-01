import { getStoreOverviewById } from "@/api/store.api";
import StoreHeader from "@/components/modules/store/StoreHeader";
import StoreNav from "@/components/modules/store/StoreNav";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, Outlet, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/store/_layout")({
    component: RouteComponent,
});

function RouteComponent() {
    const { storeId }: { storeId: string } = useParams({ strict: false });

    const { data, isLoading } = useQuery({
        queryKey: ["store-overview", storeId],
        queryFn: async () => await getStoreOverviewById(storeId),
    });

    if (isLoading || !data) {
        return <>Đang tìm kiếm cửa hàng</>;
    }

    return (
        <div>
            <StoreHeader store={data}></StoreHeader>
            <StoreNav></StoreNav>
            <Outlet></Outlet>
        </div>
    );
}

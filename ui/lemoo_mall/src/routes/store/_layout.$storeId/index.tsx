import VoucherList from "@/components/voucher/VoucherList";
import { createFileRoute, useParams } from "@tanstack/react-router";

export const Route = createFileRoute("/store/_layout/$storeId/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { storeId }: { storeId: string } = useParams({ strict: false });

    return (
        <div className="my-6 space-y-5">
            <VoucherList storeId={storeId}></VoucherList>
        </div>
    );
}

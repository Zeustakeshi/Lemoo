import { getShippingInfoByOrderId } from "@/api/shipping";
import OrderTracking from "@/components/modules/order/OrderTracking";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute, useRouter } from "@tanstack/react-router";

export const Route = createFileRoute("/order/tracking/$orderId")({
    component: RouteComponent,
});

function RouteComponent() {
    const { orderId } = Route.useParams();

    const router = useRouter();

    const { data, error, isLoading } = useQuery({
        queryKey: ["shipping-order", orderId],
        queryFn: () => getShippingInfoByOrderId(orderId),
        retry: false,
    });

    if (error) {
        router.navigate({
            to: `/order/my-order?error=${error}`,
        });
        return;
    }

    if (!data || isLoading) {
        return <div>Đang tải ....</div>;
    }

    return (
        <div>
            <OrderTracking shippingOrder={data} />
        </div>
    );
}

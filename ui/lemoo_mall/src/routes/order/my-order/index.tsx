import { getUserOrder } from "@/api/order.api";
import OrderCard from "@/components/modules/order/OrderCard";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import toast from "react-hot-toast";

export const Route = createFileRoute("/order/my-order/")({
  component: RouteComponent,
});

function RouteComponent() {
  const search: any = Route.useSearch();

  const { data, isLoading } = useQuery({
    queryKey: ["get-user-voucher"],
    queryFn: async () => await getUserOrder(0),
  });

  if (search && search?.error) {
    toast.error(search.error);
  }

  if (isLoading || !data) {
    return <div>Đang tải ....</div>;
  }

  return (
    <div className="my-5">
      <h1 className="text-2xl font-semibold">Đơn hàng của tôi</h1>
      <div className="my-5">
        {data.content?.map((orderItem) => (
          <OrderCard
            key={orderItem.id}
            items={orderItem.items}
            orderDate={orderItem.orderDate}
            orderId={orderItem.id}
            status={orderItem.status}
            storeId={orderItem.storeId}
            total={orderItem.total}
          ></OrderCard>
        ))}
      </div>
    </div>
  );
}

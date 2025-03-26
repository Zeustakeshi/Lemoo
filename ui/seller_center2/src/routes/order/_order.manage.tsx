import { OrderManagementPage } from "@/modules/order/OrderManagementPage";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/order/_order/manage")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <OrderManagementPage />
    </div>
  );
}

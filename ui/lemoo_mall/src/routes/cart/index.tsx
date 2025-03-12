import Order from "@/components/modules/order/Order";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Order />;
    </div>
  );
}

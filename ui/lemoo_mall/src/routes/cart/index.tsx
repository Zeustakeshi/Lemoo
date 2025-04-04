import CartPage from "@/components/modules/cart/CartPage";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cart/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <CartPage />;
    </div>
  );
}

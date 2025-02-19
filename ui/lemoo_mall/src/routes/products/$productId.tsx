import ProductDetail from "@/components/modules/product/product-detail/ProductDetail";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductDetail />;
}

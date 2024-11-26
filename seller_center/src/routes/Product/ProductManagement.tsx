import { createFileRoute } from "@tanstack/react-router";
import ProductPage from "../../components/ProductPage";

export const Route = createFileRoute("/Product/ProductManagement")({
  component: RouteComponent,
});

function RouteComponent() {
  return <ProductPage />;
}

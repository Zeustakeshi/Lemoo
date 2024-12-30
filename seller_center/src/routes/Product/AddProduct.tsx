import { createFileRoute } from "@tanstack/react-router";
import AddProduct from "../../components/Product/addProduct/AddProduct";

export const Route = createFileRoute("/Product/AddProduct")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AddProduct />;
}

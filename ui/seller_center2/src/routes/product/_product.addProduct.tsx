import { createFileRoute } from "@tanstack/react-router";
import FormAddProduct from "../../modules/product/FormAddProduct";

export const Route = createFileRoute("/product/_product/addProduct")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <FormAddProduct />
    </div>
  );
}

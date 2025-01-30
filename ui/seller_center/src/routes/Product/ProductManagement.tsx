import { createFileRoute, redirect } from "@tanstack/react-router";
import ProductPage from "../../components/ProductPage";
import { isLoggedIn } from "../../../apis";

export const Route = createFileRoute("/Product/ProductManagement")({
  component: RouteComponent,
  loader: async () => {
    if (!isLoggedIn()) {
      return redirect({ to: "/Auth/Login" });
    }
  },
});

function RouteComponent() {
  return <ProductPage />;
}

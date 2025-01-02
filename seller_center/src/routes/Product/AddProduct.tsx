import { createFileRoute, redirect } from "@tanstack/react-router";
import AddProduct from "../../components/Product/addProduct/AddProduct";
import { isLoggedIn } from "../../../apis";
import { Suspense } from "react";
import Loading from "../../components/LazyLoading/Loading";

export const Route = createFileRoute("/Product/AddProduct")({
  component: RouteComponent,
  loader: async () => {
    if (!isLoggedIn()) {
      return redirect({ to: "/Auth/Login" });
    }
  },
});

function RouteComponent() {
  return (
    <Suspense fallback={<Loading />}>
      <AddProduct />
    </Suspense>
  );
}

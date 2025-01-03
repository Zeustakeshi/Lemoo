import { createFileRoute, redirect } from "@tanstack/react-router";
import BannerUI from "../../components/BannerUI";
import { isLoggedIn } from "../../../apis";

export const Route = createFileRoute("/Product/BennerProducts")({
  component: RouteComponent,
  loader: async () => {
      if (!isLoggedIn()) {
        return redirect({ to: "/Auth/Login" });
      }
    },
});

function RouteComponent() {
  return <BannerUI />;
}

import { createFileRoute } from "@tanstack/react-router";
import BannerUI from "../../components/BannerUI";

export const Route = createFileRoute("/Product/BennerProducts")({
  component: RouteComponent,
});

function RouteComponent() {
  return <BannerUI />;
}

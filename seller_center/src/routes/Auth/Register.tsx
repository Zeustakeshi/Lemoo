import { createFileRoute } from "@tanstack/react-router";
import Resgister from "../../components/Auth/Resgister";

export const Route = createFileRoute("/Auth/Register")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Resgister />;
}

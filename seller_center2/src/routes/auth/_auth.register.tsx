import { createFileRoute } from "@tanstack/react-router";
import Resgister from "../../modules/auth/Resgister";

export const Route = createFileRoute("/auth/_auth/register")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Resgister />
    </div>
  );
}

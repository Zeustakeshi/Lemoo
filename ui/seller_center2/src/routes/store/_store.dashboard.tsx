import { createFileRoute } from "@tanstack/react-router";
import StoreDashboard from "../../modules/store/StoreDashboard";

export const Route = createFileRoute("/store/_store/dashboard")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <StoreDashboard />
    </div>
  );
}

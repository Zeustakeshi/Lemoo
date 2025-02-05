import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/store/_store")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

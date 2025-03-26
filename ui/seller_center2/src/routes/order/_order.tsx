import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/order/_order")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

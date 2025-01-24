import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/product/_product")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Outlet />
    </div>
  );
}

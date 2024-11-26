//__root.tsx
import { createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import LayoutSystem from "../Layout/LayoutSystem";
import LayoutRoutes from "../Layout/LayoutRoutes";

export const Route = createRootRoute({
  component: () => (
    <>
      <LayoutSystem>
        <LayoutRoutes />
      </LayoutSystem>

      <TanStackRouterDevtools />
    </>
  ),
});

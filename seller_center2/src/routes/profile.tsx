import { createFileRoute } from "@tanstack/react-router";
import Login from "../modules/auth/Login";

export const Route = createFileRoute("/profile")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <Login />
    </div>
  );
}

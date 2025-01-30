import { createFileRoute, redirect } from "@tanstack/react-router";
import Login from "../../components/Auth/Login";
import { isLoggedIn } from "../../../apis";

export const Route = createFileRoute("/Auth/Login")({
  component: RouteComponent,
  loader: async () => {
    if (isLoggedIn()) {
      return redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return <Login />;
}

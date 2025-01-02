import { createFileRoute, redirect } from "@tanstack/react-router";
import Resgister from "../../components/Auth/Resgister";
import { isLoggedIn } from "../../../apis";

export const Route = createFileRoute("/Auth/Register")({
  component: RouteComponent,
  loader: async () => {
    if (isLoggedIn()) {
      return redirect({ to: "/" });
    }
  },
});

function RouteComponent() {
  return <Resgister />;
}

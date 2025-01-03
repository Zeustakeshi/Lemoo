import { createFileRoute, redirect } from "@tanstack/react-router";
import TestStore from "../../components/Store/TestStore";
import { isLoggedIn } from "../../../apis";

export const Route = createFileRoute("/Store/CreatStore")({
  component: RouteComponent,
  loader: async () => {
    if (!isLoggedIn()) {
      return redirect({ to: "/Auth/Login" });
    }
  },
});

function RouteComponent() {
  return <TestStore />;
}

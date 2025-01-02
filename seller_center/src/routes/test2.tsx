import { createFileRoute } from "@tanstack/react-router";
import Test2 from "../components/test2";

export const Route = createFileRoute("/test2")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Test2 />;
}

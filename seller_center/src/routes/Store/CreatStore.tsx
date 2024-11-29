import { createFileRoute } from "@tanstack/react-router";
import TestStore from "../../components/Store/TestStore";

export const Route = createFileRoute("/Store/CreatStore")({
  component: RouteComponent,
});

function RouteComponent() {
  return <TestStore />;
}

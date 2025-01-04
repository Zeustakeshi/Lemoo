import { createFileRoute } from "@tanstack/react-router";
import Test from "../components/Test";
//routes/Test.tsx
export const Route = createFileRoute("/Test")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Test />;
}

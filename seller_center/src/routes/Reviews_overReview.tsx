import { createFileRoute } from "@tanstack/react-router";
import Reviews_overReview from "../components/Reviews_overReview";

export const Route = createFileRoute("/Reviews_overReview")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Reviews_overReview />;
}

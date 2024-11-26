import { createLazyFileRoute } from "@tanstack/react-router";
import HomePageUI from "../components/HomePageUI";

export const Route = createLazyFileRoute("/")({
  component: Index,
});

function Index() {
  return <HomePageUI />;
}

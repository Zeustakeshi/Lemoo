//Hoang.tsx
import { createFileRoute } from "@tanstack/react-router";
import HomePageUI from "../components/HomePageUI";
export const Route = createFileRoute("/Hoang")({
  component: () => (
    <div>
      <HomePageUI />
    </div>
  ),
});

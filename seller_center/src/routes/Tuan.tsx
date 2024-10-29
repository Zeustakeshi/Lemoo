import { createFileRoute } from "@tanstack/react-router";
import LoginUI from "../components/LoginUI";

export const Route = createFileRoute("/Tuan")({
  component: () => (
    <div>
      <LoginUI />
    </div>
  ),
});

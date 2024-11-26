import { createFileRoute } from "@tanstack/react-router";
import AccountSetting from "../../components/AccountSetting";

export const Route = createFileRoute("/Accout/AccoutSetting")({
  component: RouteComponent,
});

function RouteComponent() {
  return <AccountSetting />;
}

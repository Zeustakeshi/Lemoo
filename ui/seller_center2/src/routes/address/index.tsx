import AddressSeller from "@/modules/address/AddressSeller";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/address/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <AddressSeller />
    </div>
  );
}

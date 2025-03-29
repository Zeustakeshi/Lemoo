import UpdateAddress from "@/components/modules/customer/UpdateAddress";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/customer/update_address")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <UpdateAddress />
    </div>
  );
}

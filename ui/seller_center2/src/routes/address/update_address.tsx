// import UpdateAddress from "@/modules/address/UpdateAddress";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/address/update_address")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      {/* <UpdateAddress /> */}
      <h1>Update Address</h1>
    </div>
  );
}

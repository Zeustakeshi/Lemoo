
import { createFileRoute } from "@tanstack/react-router";
import UserForm from "../../store/UserForm";

export const Route = createFileRoute("/store/_store/create")({
  component: RouteComponent,
});

function RouteComponent() {
 
  return (
    <div>
      <p></p>
      <UserForm />
    </div>
  );
}

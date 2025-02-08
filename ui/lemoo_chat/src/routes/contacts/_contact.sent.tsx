import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/contacts/_contact/sent")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/contacts/pending"!</div>;
}

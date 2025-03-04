import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/promotion/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/promotion/"!</div>;
}

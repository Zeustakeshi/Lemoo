import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/promotion/vouchers/regular/new")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/promotion/vouchers/regular/new"!</div>;
}

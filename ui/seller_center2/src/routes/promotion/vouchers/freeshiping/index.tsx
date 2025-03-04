import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/promotion/vouchers/freeshiping/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/promotion/vouchers/freeshiping/"!</div>;
}

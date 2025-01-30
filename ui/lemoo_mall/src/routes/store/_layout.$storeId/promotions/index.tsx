import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/store/_layout/$storeId/promotions/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/store/_layout/$storeId/promotions/"!</div>;
}

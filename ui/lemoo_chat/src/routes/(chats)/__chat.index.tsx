import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(chats)/__chat/")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/(chats)/"!</div>;
}

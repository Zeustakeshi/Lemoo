import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(chats)/__chat/rooms/$roomId")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Hello "/(chats)/__chat/[roomId]"!</div>;
}

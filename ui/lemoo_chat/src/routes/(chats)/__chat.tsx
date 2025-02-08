import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(chats)/__chat")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            hello
            <Outlet></Outlet>
        </div>
    );
}

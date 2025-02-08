import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(chats)/__chat/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <a href="http://sso.lemoo.com:5172/auth/login?callback_url=http://chat.lemoo.com:5174">
                logout
            </a>
        </div>
    );
}

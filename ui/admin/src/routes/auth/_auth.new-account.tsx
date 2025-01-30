import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth/new-account")({
    component: RouteComponent,
});

function RouteComponent() {
    return <div>Tạo tài khoản admin tại đây</div>;
}

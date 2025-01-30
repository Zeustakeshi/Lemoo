import LoginForm from "@/modules/auth/LoginForm";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth/login")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <h1 className="w-full text-center font-semibold text-xl mb-6">
                Đăng nhập
            </h1>
            <LoginForm></LoginForm>
        </div>
    );
}

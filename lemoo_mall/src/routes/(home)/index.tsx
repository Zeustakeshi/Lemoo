import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(home)/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { logout } = useAuth();
    return (
        <div>
            Hello "/(home)/home"!
            <Button onClick={() => logout()}>đăng xuất</Button>
        </div>
    );
}

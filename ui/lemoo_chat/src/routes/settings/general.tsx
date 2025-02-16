import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/settings/general")({
    component: RouteComponent,
});

function RouteComponent() {
    const { logout } = useAuth();

    return (
        <div>
            <Button
                onClick={() => {
                    logout();
                }}
                variant="destructive"
            >
                Đăng xuất
            </Button>
        </div>
    );
}

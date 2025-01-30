import { Button } from "@/components/ui/button";
import { logout } from "@/store/auth/auth.thunk";
import { createFileRoute } from "@tanstack/react-router";
import { useDispatch } from "react-redux";

export const Route = createFileRoute("/(home)/")({
    component: RouteComponent,
});

function RouteComponent() {
    const dispatch = useDispatch();
    return (
        <div>
            <Button onClick={() => dispatch(logout())}>Đăng xuất</Button>
        </div>
    );
}

import AppWrapper from "@/components/wrapper/AppWrapper";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_sidebar/stores/_store")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <AppWrapper>
            <h1 className="text-2xl font-semibold">Danh sách cửa hàng</h1>
            <div className="my-3">
                <Outlet></Outlet>
            </div>
        </AppWrapper>
    );
}

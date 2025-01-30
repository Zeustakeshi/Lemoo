import StoreHeader from "@/components/modules/store/StoreHeader";
import StoreNav from "@/components/modules/store/StoreNav";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/store/_layout")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div>
            <StoreHeader></StoreHeader>
            <StoreNav></StoreNav>
            <Outlet></Outlet>
        </div>
    );
}

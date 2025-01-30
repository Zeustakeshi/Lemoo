import { AppSidebar } from "@/components/sidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_sidebar")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <SidebarProvider>
            <AppSidebar />
            <Outlet></Outlet>
        </SidebarProvider>
    );
}

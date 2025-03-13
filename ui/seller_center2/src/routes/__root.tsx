import SidebarRight from "@/components/navigation/SidebarRight";
import { createRootRoute, Outlet } from "@tanstack/react-router";
import SidebarLeft from "../components/navigation/SidebarLeft";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <div className="min-h-screen flex bg-gray-50">
            <SidebarLeft></SidebarLeft>
            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6">
                <Outlet />
            </main>
            <SidebarRight></SidebarRight>
        </div>
    );
}

import { createRootRoute, Outlet } from "@tanstack/react-router";
import Sidebar from "../components/navigation/sidebar";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <div className="min-h-screen flex bg-gray-50">
            <Sidebar></Sidebar>
            {/* Main Content */}
            <main className="flex-1 bg-gray-100 p-6">
                <Outlet />
            </main>
        </div>
    );
}

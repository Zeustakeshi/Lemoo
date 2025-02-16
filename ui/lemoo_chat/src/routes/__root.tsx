import Navbar from "@/modules/navbar/Navbar";
import { Outlet, createRootRoute } from "@tanstack/react-router";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <div className="w-screen h-screen overflow-hidden flex justify-start items-start">
            <Navbar></Navbar>
            <Outlet />
        </div>
    );
}

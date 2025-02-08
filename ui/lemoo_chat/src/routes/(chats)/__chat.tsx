import ChatSidebar from "@/modules/sidebar/ChatSidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/(chats)/__chat")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="grid grid-cols-12 w-full h-full">
            <ChatSidebar className="col-span-3 h-full"></ChatSidebar>
            <div className="col-span-9  h-full bg-primary/5">
                <Outlet></Outlet>
            </div>
        </div>
    );
}

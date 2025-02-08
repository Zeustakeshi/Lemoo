import ContactSidebar from "@/modules/sidebar/ContactSidebar";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/contacts/_contact")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="grid grid-cols-12 w-full h-full">
            <ContactSidebar className="col-span-3 h-full"></ContactSidebar>
            <div className="col-span-9 h-full bg-slate-100">
                <Outlet></Outlet>
            </div>
        </div>
    );
}

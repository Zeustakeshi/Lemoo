import { createRootRoute, Outlet } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            {/* <SidebarProvider>
                <AppSidebar></AppSidebar>
                <main>
                    <SidebarTrigger />
                </main>
            </SidebarProvider> */}
            <Outlet></Outlet>
        </React.Fragment>
    );
}

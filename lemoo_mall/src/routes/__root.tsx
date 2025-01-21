import Header from "@/components/modules/header/Header";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";
export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <Header></Header>
            <div className="dark:bg-slate-800 h-[calc(100svh-104px)]">
                <Outlet />
            </div>
        </React.Fragment>
    );
}

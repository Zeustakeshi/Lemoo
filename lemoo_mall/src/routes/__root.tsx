import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <React.Fragment>
            <div className="text-2xl font-semibold">Hello "__root"!</div>
            <Outlet />
        </React.Fragment>
    );
}

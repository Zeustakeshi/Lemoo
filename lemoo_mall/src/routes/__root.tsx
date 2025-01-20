import { Button } from "@/components/ui/button";
import { useTheme } from "@/context/ThemeContext";
import { Outlet, createRootRoute } from "@tanstack/react-router";
import * as React from "react";
export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const { setTheme } = useTheme();
    return (
        <React.Fragment>
            <div className="text-2xl font-semibold w-screen h-screen bg-blue-50 dark:bg-slate-900">
                <Button onClick={() => setTheme("light")}>Light theme</Button>
                <Button onClick={() => setTheme("dark")} variant="secondary">
                    Dark theme
                </Button>
            </div>
            <Outlet />
        </React.Fragment>
    );
}

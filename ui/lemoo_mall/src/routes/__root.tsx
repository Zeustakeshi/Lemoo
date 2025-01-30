import Header from "@/components/modules/header/Header";
import AppWrapper from "@/components/wrappers/AppWrapper";
import { Outlet, createRootRoute } from "@tanstack/react-router";
export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    return (
        <div className="w-screen h-screen hide-scrollbar">
            <Header></Header>
            <AppWrapper className="min-h-[calc(100svh-104px)]">
                <Outlet />
            </AppWrapper>
        </div>
    );
}

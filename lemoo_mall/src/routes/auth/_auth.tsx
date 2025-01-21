import AppWrapper from "@/components/wrappers/AppWrapper";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/auth/_auth")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="">
            <AppWrapper className="flex justify-center items-center ">
                <div className="shadow-md my-4 bg-white px-8 py-5 rounded-2xl min-w-[540px] min-h-[500px]">
                    <Outlet></Outlet>
                </div>
            </AppWrapper>
        </div>
    );
}

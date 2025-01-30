import AppWrapper from "@/components/wrapper/AppWrapper";
import { selectAuth } from "@/store/auth/auth";
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

export const Route = createFileRoute("/auth/_auth")({
    component: RouteComponent,
});

function RouteComponent() {
    const { user } = useSelector(selectAuth);

    const router = useRouter();

    useEffect(() => {
        if (user)
            router.navigate({
                to: "/",
            });
    }, [user]);

    return (
        <AppWrapper className="flex justify-center items-center w-screen h-screen bg-blue-300">
            <div className=" min-w-[400px] bg-white rounded-md shadow-lg p-4">
                <Outlet></Outlet>
            </div>
        </AppWrapper>
    );
}

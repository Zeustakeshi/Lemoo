import { getUseInfo } from "@/api/auth.api";
import { selectAuth } from "@/store/auth/auth";
import { setUserAsync } from "@/store/auth/auth.thunk";
import { useMutation } from "@tanstack/react-query";
import { Outlet, createRootRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const Route = createRootRoute({
    component: RootComponent,
});

function RootComponent() {
    const { user } = useSelector(selectAuth);

    const { mutateAsync } = useMutation({
        mutationKey: ["user-info"],
        mutationFn: getUseInfo,
    });

    const router = useRouter();
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) return;
        (async () => {
            try {
                const user = await mutateAsync();
                dispatch(setUserAsync(user));
            } catch (error: any) {
                router.navigate({
                    to: "/auth/login",
                });
            }
        })();
    }, [user]);

    return (
        <>
            <Outlet />
        </>
    );
}

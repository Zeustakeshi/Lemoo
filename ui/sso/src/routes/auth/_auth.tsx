import { TokenType } from "@/common/enums/token";
import Logo from "@/components/ui/logo";
import { getTokenValue } from "@/lib/tokenStore";
import { createFileRoute, Outlet, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/auth/_auth")({
    component: RouteComponent,
});

function RouteComponent() {
    const router = useRouter();
    useEffect(() => {
        (async () => {
            const refreshToken = await getTokenValue(TokenType.REFRESH_TOKEN);
            if (refreshToken) {
                router.navigate({ to: "/" });
            }
        })();
    }, []);

    return (
        <div className="w-screen h-screen flex justify-center items-center bg-white p-4">
            <div className=" flex-1 w-[60%] h-full">
                <Logo></Logo>
                <Outlet></Outlet>
            </div>

            <div className="w-[40%] h-full rounded-xl overflow-hidden">
                <img
                    src="https://cdn.dribbble.com/userupload/14898990/file/original-ba68e98ea10e1867e831884c3b153387.png?resize=1200x900&vertical=center"
                    alt=""
                    className="w-full h-full object-cover"
                />
            </div>
        </div>
    );
}

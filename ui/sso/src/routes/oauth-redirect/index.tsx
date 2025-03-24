import { loginWithGoogle } from "@/api/auth.api";
import { saveToken } from "@/lib/tokenStore";
import { createFileRoute, redirect, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import { z } from "zod";

const oauthRedirectSearchSchema = z.object({
    code: z.string(),
});

export const Route = createFileRoute("/oauth-redirect/")({
    validateSearch: (search) => oauthRedirectSearchSchema.parse(search),
    beforeLoad: ({ search }) => {
        const result = oauthRedirectSearchSchema.safeParse(search);
        if (!result.success) {
            throw redirect({
                to: "/auth/login",
                search: {
                    error: "missing_oauth_code",
                },
            });
        }
    },
    component: RouteComponent,
});

function RouteComponent() {
    const { code } = Route.useSearch();
    const router = useRouter();

    useEffect(() => {
        if (!code) return;

        (async () => {
            try {
                const data = await loginWithGoogle(code);
                await saveToken(data.accessToken);
                await saveToken(data.refreshToken);
                router.navigate({ to: "/" });
            } catch (error: any) {
                router.navigate({
                    to: "/auth/login",
                    search: {
                        error: JSON.stringify(error),
                    },
                });
            }
        })();
    }, [code]);

    return <div>Đang chuyển hướng....</div>;
}

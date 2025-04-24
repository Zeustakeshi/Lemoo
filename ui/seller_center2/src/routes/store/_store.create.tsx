import { storeInfoApi } from "@/api/storeInfo.api";
import { createFileRoute, useRouter } from "@tanstack/react-router";
import { useEffect } from "react";
import UserForm from "../../store/UserForm";

export const Route = createFileRoute("/store/_store/create")({
    component: RouteComponent,
});

function RouteComponent() {
    const router = useRouter();
    useEffect(() => {
        (async () => {
            try {
                const resStore = await storeInfoApi();
                sessionStorage.setItem("storeInfo", JSON.stringify(resStore));
                router.navigate({ to: "/" });
            } catch (error) {}
        })();
    }, []);

    return (
        <div>
            <UserForm />
        </div>
    );
}

import { getUserInfo } from "@/api/user.api";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(dashboard)/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data } = useQuery({
        queryKey: ["get-user-info"],
        queryFn: async () => await getUserInfo(),
    });

    return <div>{JSON.stringify(data)}</div>;
}

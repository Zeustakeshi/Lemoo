import HomeBanner from "@/components/modules/banner/HomeBanner";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(home)/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="">
            <HomeBanner></HomeBanner>
        </div>
    );
}

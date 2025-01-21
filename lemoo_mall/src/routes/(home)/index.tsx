import HomeBanner from "@/components/modules/banner/HomeBanner";
import HomeCategoryList from "@/components/modules/categories/HomeCategoryList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(home)/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="space-y-5">
            <HomeBanner></HomeBanner>
            <HomeCategoryList></HomeCategoryList>
        </div>
    );
}

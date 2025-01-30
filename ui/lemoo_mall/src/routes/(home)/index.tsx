import HomeBanner from "@/components/modules/banner/HomeBanner";
import HomeCategoryList from "@/components/modules/categories/HomeCategoryList";
import ProductFeature from "@/components/modules/product/ProductFeature";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/(home)/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="space-y-5">
            <HomeBanner></HomeBanner>
            <ProductFeature></ProductFeature>
            <HomeCategoryList></HomeCategoryList>
        </div>
    );
}

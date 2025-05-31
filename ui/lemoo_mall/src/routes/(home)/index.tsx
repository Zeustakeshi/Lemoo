import HomeBanner from "@/components/modules/banner/HomeBanner";
import HomeCategoryList from "@/components/modules/categories/HomeCategoryList";
import ProductBestSeller from "@/components/modules/product/ProductBestSeller";
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
            <ProductFeature title="Tìm kiếm nhiều nhất"></ProductFeature>
            <ProductBestSeller title="Sản phẩm mua nhiều"></ProductBestSeller>
        </div>
    );
}

import ProductFeature from "@/components/modules/product/ProductFeature";
import VoucherList from "@/components/modules/store/VoucherList";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/store/_layout/$storeId/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="my-6 space-y-5">
            <VoucherList></VoucherList>
            <ProductFeature></ProductFeature>
            <ProductFeature></ProductFeature>
            <ProductFeature></ProductFeature>
        </div>
    );
}

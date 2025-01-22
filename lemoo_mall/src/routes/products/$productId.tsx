import ProductImage from "@/components/modules/product/product-detail/ProductImage";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$productId")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="grid grid-cols-12 w-full min-h-[700px]">
            <div className=" col-span-4 h-full">
                <ProductImage></ProductImage>
            </div>
            <div className="bg-red-500 col-span-5 h-full"></div>
            <div className="bg-orange-500 col-span-3 h-full"></div>
        </div>
    );
}

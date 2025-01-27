import { getCartInfo } from "@/api/cart.api";
import CartItemGroup from "@/components/modules/cart/CartItemGroup";
import ProductFeature from "@/components/modules/product/ProductFeature";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cart/")({
    component: RouteComponent,
});

function RouteComponent() {
    const { data, isLoading } = useQuery({
        queryKey: ["cart-info"],
        queryFn: getCartInfo,
    });

    console.log({ data });

    if (isLoading || !data)
        return <div className="text-2xl font-semibold">Đang tải</div>;

    return (
        <div>
            <div className="grid grid-cols-12">
                <div className="col-span-8">
                    {data.items.map((cartItem) => (
                        <CartItemGroup
                            key={cartItem.id}
                            cartItemId={cartItem.id}
                            storeId={cartItem.storeId}
                            skus={cartItem.skus}
                        ></CartItemGroup>
                    ))}
                </div>
                <div className="col-span-4 bg-orange-100"></div>
            </div>
            <div className="my-5 space-y-4">
                <ProductFeature></ProductFeature>
                <ProductFeature></ProductFeature>
            </div>
        </div>
    );
}

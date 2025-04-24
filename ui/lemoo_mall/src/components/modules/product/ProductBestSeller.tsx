import { getProductFeature } from "@/api/product.api";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import ProductFeatureCard from "./ProductFeatureCard";

type Props = {
    title?: string;
};

const ProductBestSeller = ({ title = "Sản phẩm nổi bật" }: Props) => {
    const { data } = useQuery({
        queryKey: ["get product feature"],
        queryFn: async () => await getProductFeature(100),
    });

    return (
        <div>
            <div className="w-full flex justify-between items-center mb-3">
                <h4 className="text-xl font-semibold ">{title}</h4>
                <Button variant="link">Xem tất cả</Button>
            </div>
            <div className="grid grid-cols-6">
                {data?.content.map((product) => (
                    <ProductFeatureCard
                        key={product.id}
                        product={product}
                    ></ProductFeatureCard>
                ))}
            </div>
        </div>
    );
};

export default ProductBestSeller;

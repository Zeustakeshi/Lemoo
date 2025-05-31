import { getProductFeature } from "@/api/product.api";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useQuery } from "@tanstack/react-query";
import Autoplay from "embla-carousel-autoplay";
import ProductFeatureCard from "./ProductFeatureCard";

type Props = {
    title?: string;
};

const ProductFeature = ({ title = "Sản phẩm nổi bật" }: Props) => {
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
            <div className="">
                <Carousel
                    plugins={[
                        Autoplay({
                            delay: 4000,
                        }),
                    ]}
                    className="w-full col-span-8"
                >
                    <CarouselContent className="">
                        {data?.content?.map((product, index) => (
                            <CarouselItem
                                className="w-max max-w-max"
                                key={index}
                            >
                                <ProductFeatureCard
                                    product={product}
                                ></ProductFeatureCard>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};

export default ProductFeature;

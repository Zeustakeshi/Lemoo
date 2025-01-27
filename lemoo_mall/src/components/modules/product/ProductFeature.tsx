import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import ProductFeatureCard from "./ProductFeatureCard";

type Props = {};

const ProductFeature = (props: Props) => {
    return (
        <div>
            <div className="w-full flex justify-between items-center mb-3">
                <h4 className="text-xl font-semibold ">Sản phẩm nổi bật</h4>
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
                        {Array.from({ length: 10 }).map((_, index) => (
                            <CarouselItem
                                className="w-max max-w-max"
                                key={index}
                            >
                                <ProductFeatureCard></ProductFeatureCard>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};

export default ProductFeature;

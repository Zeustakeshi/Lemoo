import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import { useProductDetail } from "@/context/ProductDetailContext";
import { cn } from "@/lib/utils";

// Component for rendering the image carousel
const ImageCarousel = ({}: {}) => {
    const { productDetail, setSelectedSku, selectedSku } = useProductDetail();

    return (
        <Carousel className="p-2 w-full">
            <div className="relative">
                <CarouselContent>
                    {productDetail.skus.map((sku, index) => (
                        <CarouselItem
                            key={sku.lemooSku}
                            className="max-w-max w-max cursor-pointer flex flex-col justify-center items-center "
                            onClick={() => setSelectedSku(sku)}
                        >
                            <div
                                className={cn(
                                    "w-[40px] p-1 rounded-md border  aspect-square",
                                    {
                                        "border-primary":
                                            sku.lemooSku ===
                                            selectedSku?.lemooSku,
                                    }
                                )}
                            >
                                {/* Thumbnail Image - Reduced from 50px to 40px */}
                                <img
                                    className="size-full object-contain"
                                    src={sku.image}
                                    alt={`Product image ${index + 1}`}
                                />
                            </div>
                            <p className="text-xs font-semibold text-muted-foreground text-center mt-1">
                                {sku.name}
                            </p>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </div>
        </Carousel>
    );
};

export default ImageCarousel;

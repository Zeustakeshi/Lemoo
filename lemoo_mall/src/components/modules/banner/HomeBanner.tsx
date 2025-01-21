import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import { bannerImages } from "@/data/banner.data";
import Autoplay from "embla-carousel-autoplay";
import { useState } from "react";

type Props = {};

const HomeBanner = ({}: Props) => {
    const [images, setImages] = useState<string[]>(bannerImages);
    return (
        <div className=" grid-cols-10 gap-2">
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 4000,
                    }),
                ]}
                className="w-full col-span-8"
            >
                <div className="relative">
                    <CarouselContent className="">
                        {images.map((image, index) => (
                            <CarouselItem key={index}>
                                <div className="h-[280px] rounded-xl overflow-hidden">
                                    <img
                                        className="size-full object-cover"
                                        src={image}
                                        alt=""
                                    />
                                </div>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                    <CarouselPrevious className="absolute left-2 top-[50%] -translate-y-[50%]" />
                    <CarouselNext className="absolute  right-2 top-[50%] -translate-y-[50%]" />
                </div>
            </Carousel>
        </div>
    );
};

export default HomeBanner;

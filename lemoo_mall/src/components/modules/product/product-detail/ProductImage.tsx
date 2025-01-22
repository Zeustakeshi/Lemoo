import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";

type Props = {};

const ProductImage = (props: Props) => {
    return (
        <div className="w-full">
            <div className="aspect-square w-full border border-primary rounded-md bg-white dark:bg-slate-900">
                <img
                    className="size-full object-contain"
                    src="https://m.media-amazon.com/images/I/71DbpZqSGlL._AC_SX679_.jpg"
                    alt=""
                />
            </div>
            <Carousel className="w-full  my-3">
                <div className="relative">
                    <CarouselContent className="">
                        {Array.from({ length: 3 }).map((image, index) => (
                            <CarouselItem
                                key={index}
                                className="max-w-max w-max cursor-pointer"
                            >
                                <div className="  w-[50px] p-1 rounded-md border border-primary aspect-square">
                                    <img
                                        className="size-full object-contain"
                                        src="https://picsum.photos/200"
                                        alt=""
                                    />
                                </div>
                                <p className="text-xs font-semibold text-muted-foreground">
                                    đỏ - xl
                                </p>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </div>
            </Carousel>
        </div>
    );
};

export default ProductImage;

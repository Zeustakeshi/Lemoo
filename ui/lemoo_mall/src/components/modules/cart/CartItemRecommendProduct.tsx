import ProductCard, {
    ProductCardBody,
    ProductCardImage,
    ProductCardPrice,
    ProductCardRatting,
    ProductCardTitle,
} from "@/components/product/ProductCard";
import { Button } from "@/components/ui/button";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { SetStateAction } from "react";
type Props = {
    setShow: React.Dispatch<SetStateAction<boolean>>;
};

const CartItemRecommendProduct = ({ setShow }: Props) => {
    return (
        <div
            onMouseLeave={() => setShow(false)}
            className="absolute w-full h-max top-[100%] bg-white shadow-2xl z-10 p-5 rounded-md"
        >
            <div className="w-full flex justify-between items-center mb-1">
                <h4 className="text-xl font-semibold ">Sản phẩm tương tự</h4>
            </div>
            <Carousel
                plugins={[
                    Autoplay({
                        delay: 4000,
                    }),
                ]}
                className="w-full col-span-2"
            >
                <CarouselContent className="">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <CarouselItem className="w-max max-w-max" key={index}>
                            <ProductRecommendCard></ProductRecommendCard>
                        </CarouselItem>
                    ))}
                </CarouselContent>
            </Carousel>
        </div>
    );
};

type ProductRecommendCardProps = {};

const ProductRecommendCard = ({}: ProductRecommendCardProps) => {
    return (
        <ProductCard productId="1">
            <ProductCardImage url="https://img.lazcdn.com/g/p/deb8e84d2577bd99eee8a589e9908af0.png_400x400q80.png_.avif" />
            <ProductCardBody>
                <ProductCardTitle>
                    Thùng Sữa chua uống Probi Ít Đường chai 130ml -24 chai/Thùng
                    Yogurt
                </ProductCardTitle>
                <ProductCardRatting value={3.3} ratingsCount={200} />

                <ProductCardPrice
                    originPrice={10000}
                    promotionPrice={9000}
                ></ProductCardPrice>
                <Button size="sm" className="w-full mt-2">
                    Thêm vào giỏ
                </Button>
            </ProductCardBody>
        </ProductCard>
    );
};

export default CartItemRecommendProduct;

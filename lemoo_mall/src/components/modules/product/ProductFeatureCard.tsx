import ProductCard, {
    ProductCardBody,
    ProductCardImage,
    ProductCardPrice,
    ProductCardRatting,
    ProductCardTitle,
} from "@/components/product/ProductCard";

type Props = {};

const ProductFeatureCard = ({}: Props) => {
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
            </ProductCardBody>
        </ProductCard>
    );
};

export default ProductFeatureCard;

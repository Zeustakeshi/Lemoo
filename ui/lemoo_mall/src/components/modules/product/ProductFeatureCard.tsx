import { ProductFeatureType } from "@/common/type/product.type";
import ProductCard, {
    ProductCardBody,
    ProductCardImage,
    ProductCardPrice,
    ProductCardRatting,
    ProductCardTitle,
} from "@/components/product/ProductCard";

type Props = { product: ProductFeatureType };

const ProductFeatureCard = ({ product }: Props) => {
    return (
        <ProductCard productId="1">
            <ProductCardImage url={product.thumbnail} />
            <ProductCardBody>
                <ProductCardTitle>{product.name}</ProductCardTitle>
                <ProductCardRatting value={3.3} ratingsCount={200} />
                <ProductCardPrice
                    originPrice={product.originPrice}
                    promotionPrice={product.promotionPrice}
                ></ProductCardPrice>
            </ProductCardBody>
        </ProductCard>
    );
};

export default ProductFeatureCard;

import { ProductSearchResponse } from "@/common/type/search.type";
import ProductCard, {
    ProductCardBody,
    ProductCardImage,
    ProductCardPrice,
    ProductCardRatting,
    ProductCardTitle,
} from "@/components/product/ProductCard";

type Props = { product: ProductSearchResponse };

const ProductSearchCard = ({ product }: Props) => {
    return (
        <ProductCard productId={product.id}>
            <ProductCardImage url={product.image} />
            <ProductCardBody>
                <ProductCardTitle>{product.name}</ProductCardTitle>
                <ProductCardRatting value={3.3} ratingsCount={200} />
                <ProductCardPrice
                    originPrice={product.price}
                    promotionPrice={product.price}
                ></ProductCardPrice>
            </ProductCardBody>
        </ProductCard>
    );
};

export default ProductSearchCard;

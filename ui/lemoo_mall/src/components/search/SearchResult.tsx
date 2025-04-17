import { ProductSearchResponse } from "@/common/type/search.type";
import { cn } from "@/lib/utils";
import ProductSearchCard from "../modules/product/ProductSearchCard";

type Props = {
    className?: string;
    products: ProductSearchResponse[];
};

const SearchResult = ({ products, className }: Props) => {
    return (
        <div className={cn("h-full grid grid-cols-6", className)}>
            {products.map((product, index) => (
                <ProductSearchCard
                    product={product}
                    key={index}
                ></ProductSearchCard>
            ))}
        </div>
    );
};

export default SearchResult;

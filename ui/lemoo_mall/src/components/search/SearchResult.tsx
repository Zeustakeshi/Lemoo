import { cn } from "@/lib/utils";
import ProductSearchCard from "../modules/product/ProductSearchCard";

type Props = {
    className?: string;
};

const SearchResult = ({ className }: Props) => {
    return (
        <div className={cn("h-full grid grid-cols-4", className)}>
            {Array.from({ length: 20 }).map((_, index) => (
                <ProductSearchCard key={index}></ProductSearchCard>
            ))}
        </div>
    );
};

export default SearchResult;

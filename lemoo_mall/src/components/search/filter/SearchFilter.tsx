import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import CategoryFilter from "./CategoryFilter";
import PriceFilter from "./PriceFilter";
import RattingFilter from "./RattingFilter";

type Props = {
    className?: string;
};

const SearchFilter = ({ className }: Props) => {
    return (
        <div className={cn(className, "")}>
            <CategoryFilter></CategoryFilter>
            <Separator className="my-3"></Separator>
            <PriceFilter></PriceFilter>
            <Separator className="my-3"></Separator>
            <RattingFilter></RattingFilter>
        </div>
    );
};

export default SearchFilter;

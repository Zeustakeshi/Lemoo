import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchQueryType } from "@/schema/search.schema";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

type Props = {};

const PriceFilter = ({}: Props) => {
    const [minPrice, setMinPrice] = useState<number | undefined>();
    const [maxPrice, setMaxPrice] = useState<number | undefined>();
    const router = useRouter();

    return (
        <div>
            <h4 className="font-semibold mb-2">Giá</h4>
            <div className="flex gap-2 justify-between items-center">
                <Input
                    min={1000}
                    value={minPrice}
                    onChange={(e) => setMinPrice(parseInt(e.target.value))}
                    type="number"
                    placeholder="min"
                ></Input>
                <span>-</span>
                <Input
                    min={1000}
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    type="number"
                    placeholder="max"
                ></Input>
            </div>
            <Button
                onClick={() => {
                    const searchQuery = router.state.resolvedLocation
                        .search as SearchQueryType;
                    if (!searchQuery || !minPrice || !maxPrice) return;
                    router.navigate({
                        to: "/search",
                        search: {
                            ...searchQuery,
                            min_price: minPrice,
                            max_price: maxPrice,
                        },
                    });
                }}
                size="sm"
                className="w-full my-3"
            >
                lọc
            </Button>
        </div>
    );
};

export default PriceFilter;

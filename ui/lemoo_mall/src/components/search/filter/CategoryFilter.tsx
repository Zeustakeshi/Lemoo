import { categories } from "@/data/category";
import { cn } from "@/lib/utils";
import { SearchQueryType } from "@/schema/search.schema";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

type Props = {};

const CategoryFilter = (props: Props) => {
    const [activeItem, setActiveItem] = useState<string>("");
    const router = useRouter();

    return (
        <div>
            <h4 className="font-semibold mb-2">Danh mục</h4>
            {categories.slice(0, 5).map((category, index) => (
                <div
                    onClick={() => {
                        const searchQuery = router.state.resolvedLocation
                            .search as SearchQueryType;
                        router.navigate({
                            to: "/search",
                            search: {
                                ...searchQuery,
                                cat: category.name,
                            },
                        });
                        setActiveItem(category.name);
                    }}
                    className={cn(
                        "my-1 transition-all text-sm hover:text-primary cursor-pointer transition-all text-slate-500",
                        {
                            "text-primary font-semibold ":
                                category.name == activeItem,
                        }
                    )}
                    key={index}
                >
                    {category.name}
                </div>
            ))}
        </div>
    );
};

export default CategoryFilter;

import Ratting from "@/components/ui/ratting";
import { cn } from "@/lib/utils";
import { SearchQueryType } from "@/schema/search.schema";
import { useRouter } from "@tanstack/react-router";
import { useState } from "react";

type Props = {};

const RattingFilter = (props: Props) => {
    const router = useRouter();
    const [activeItem, setActiveItem] = useState<number>(-1);

    return (
        <div>
            <h4 className="font-semibold mb-2">Đánh giá</h4>
            <div>
                {Array.from({ length: 5 }).map((_, index) => (
                    <div
                        className="py-1 my-1 flex justify-start items-center gap-2 cursor-pointer transition-all"
                        onClick={() => {
                            const searchQuery = router.state.resolvedLocation
                                .search as SearchQueryType;

                            if (!searchQuery) return;
                            console.log(searchQuery);
                            router.navigate({
                                to: "/search",
                                search: {
                                    ...searchQuery,
                                    ratting: 5 - index,
                                },
                            });
                            setActiveItem(5 - index);
                        }}
                    >
                        <Ratting
                            key={index}
                            value={5 - index}
                            size={100}
                            readOnly
                        ></Ratting>
                        {index != 0 && (
                            <span
                                className={cn({
                                    "text-primary font-semibold":
                                        activeItem === 5 - index,
                                })}
                            >
                                Trở lên
                            </span>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RattingFilter;

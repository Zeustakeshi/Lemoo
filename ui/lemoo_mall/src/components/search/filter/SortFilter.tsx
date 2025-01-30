import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { SearchQueryType } from "@/schema/search.schema";
import { useRouter } from "@tanstack/react-router";

type Props = {};

const SortFilter = (props: Props) => {
    const router = useRouter();

    return (
        <div className="flex justify-end items-center gap-2">
            <Select
                onValueChange={(value) => {
                    const searchQuery = router.state.resolvedLocation
                        .search as SearchQueryType;
                    if (!searchQuery) return;
                    router.navigate({
                        to: "/search",
                        search: {
                            ...searchQuery,
                            sort: value as any,
                        },
                    });
                }}
            >
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Sắp xếp theo" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="popularity">Phù hợp nhất</SelectItem>
                    <SelectItem value="price_desc">Giá từ tăng dần</SelectItem>
                    <SelectItem value="price_asc">Giá giảm dần</SelectItem>
                </SelectContent>
            </Select>
        </div>
    );
};

export default SortFilter;

import SearchFilter from "@/components/search/filter/SearchFilter";
import SortFilter from "@/components/search/filter/SortFilter";
import SearchResult from "@/components/search/SearchResult";

import { SearchQuerySchema, SearchQueryType } from "@/schema/search.schema";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/search/")({
    validateSearch: (search: Record<string, unknown>): SearchQueryType => {
        const result = SearchQuerySchema.safeParse(search);

        if (!result.success) {
            console.error(result.error.errors);
            window.location.href = "/";
            return { q: "" };
        }
        return result.data;
    },
    component: RouteComponent,
});

function RouteComponent() {
    const searchQuery = Route.useSearch();

    console.log({ searchQuery });
    return (
        <div className="grid grid-cols-10 gap-4 py-4">
            <SearchFilter className="col-span-2"></SearchFilter>
            <div className="col-span-8">
                <div className="w-full flex justify-between items-center">
                    <h4 className="text-sm mb-2 text-muted-foreground">
                        Kết quả tìm kiếm cho từ khóa:{" "}
                        <span className="text-base text-primary font-semibold">
                            {" "}
                            {searchQuery.q}
                        </span>
                    </h4>
                    <SortFilter></SortFilter>
                </div>
                <SearchResult></SearchResult>
            </div>
        </div>
    );
}

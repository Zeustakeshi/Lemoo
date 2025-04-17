import { searchProduct } from "@/api/search.api";
import SearchResult from "@/components/search/SearchResult";

import { SearchQuerySchema, SearchQueryType } from "@/schema/search.schema";
import { setSearchLoading } from "@/store/search/searchSlice";
import { useQuery } from "@tanstack/react-query";
import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

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

    const { data, isLoading } = useQuery({
        queryKey: ["search-product", searchQuery.q],
        queryFn: async () => await searchProduct(searchQuery.q),
        enabled: !!searchQuery.q,
    });

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(setSearchLoading(isLoading));
    }, [isLoading]);

    if (!data || isLoading) {
        return <div>Loading ... </div>;
    }

    return (
        <div className="grid grid-cols-10 gap-4 py-4">
            {/* <SearchFilter className="col-span-2"></SearchFilter> */}
            <div className="col-span-10">
                {/* <div className="w-full flex justify-between items-center">
                    <SortFilter></SortFilter>
                </div> */}
                <SearchResult products={data}></SearchResult>
            </div>
        </div>
    );
}

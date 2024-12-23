import { CategoryResponse } from "@/common/type/categories";
import { Pageable } from "@/common/type/page.type";
import { api } from "@/lib/api";

export const getCategories = async (
    page: number,
    limit: number
): Promise<Pageable<CategoryResponse>> => {
    return await api.get("/categories", {
        params: {
            page,
            limit,
        },
    });
};

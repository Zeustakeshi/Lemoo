import { CategoryResponse } from "@/common/type/category.type";
import { Pageable } from "@/common/type/page.type";
import { api } from "@/lib/api";

export const getCategories = async ({
    page,
    limit,
}: {
    page: number;
    limit: number;
}): Promise<Pageable<CategoryResponse>> => {
    return await api.get("/categories", { params: { page, limit } });
};

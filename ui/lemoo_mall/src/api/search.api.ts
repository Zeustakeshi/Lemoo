import { ProductSearchResponse } from "@/common/type/search.type";
import { api } from "@/lib/api";

export const searchProduct = async (
    query: string
): Promise<ProductSearchResponse[]> => {
    return await api.get("/search", {
        params: {
            q: query,
        },
    });
};

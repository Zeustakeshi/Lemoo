import { Pageable } from "@/common/type/page.type";
import { ProductFeatureResponse } from "@/common/type/product.type";
import { api } from "@/lib/api";

export const getProductFeature = async (
    page: number,
    limit?: number
): Promise<Pageable<ProductFeatureResponse>> => {
    return await api.get("/products/recommend/feature", {
        params: { page, limit: limit ?? 10 },
    });
};

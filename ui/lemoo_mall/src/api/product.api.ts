import { Pageable } from "@/common/type/page.type";
import { ProductFeatureType } from "@/common/type/product.type";
import { api } from "@/lib/api";

export const getProductFeature = async (
    limit?: number
): Promise<Pageable<ProductFeatureType>> => {
    return await api.get("/products/recommend/feature", {
        params: { limit: limit ?? 10 },
    });
};

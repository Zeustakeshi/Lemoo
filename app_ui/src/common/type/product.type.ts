export type ProductFeatureResponse = {
    id: string;
    name: string;
    thumbnail: string;
    totalSold: number;
    ratting: number;
    rattingCount: number;
    promotionPrice: number;
    originPrice: number;
};

export type ProductVariant = {
    name: string;
    values: {
        code: string;
        name: string;
    };
};

export type ProductSku = {
    lemooSku: string;
    name: string;
    image: string;
    originPrice: number;
    promotionPrice: number;
    variants: object;
};

export type ProductDetail = {
    id: string;
    name: string;
    images: string[];
    description: string;
    storeId: string;
    totalSold: number;
    ratting: number;
    rattingCount: number;
    isSoldOut: boolean;
    variants: ProductVariant[];
    skus: ProductSku[];
};

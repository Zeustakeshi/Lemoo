export enum ProductStatus {
    LIVE = "LIVE",
    INACTIVE = "INACTIVE",
    DELETED = "DELETED",
    PENDING = "PENDING",
    REJECTED = "REJECTED",
    SOLD_OUT = "SOLD_OUT",
}

export type ProductResponse = {
    id: string;
    name: string;
    image: string;
    status: ProductStatus;
    skus: ProductSkuResponse[];
};

export type ProductSkuResponse = {
    id: string;
    sellerSku: string;
    lemooSku: string;
    name: string;
    allowSale: boolean;
    stock: number;
    price: number;
};

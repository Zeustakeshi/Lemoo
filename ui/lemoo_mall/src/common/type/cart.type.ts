export type CartType = {
    id: string;
    items: CartItemType[];
};

export type CartItemType = {
    id: string;
    storeId: string;
    skus: CartItemSkuType[];
};

export type CartItemSkuType = {
    lemooSku: string;
    productId: string;
    image: string;
    quantity: number;
    price: number;
    variants: Record<string, string>;
};

export type CartResponse = {
    id: string;
    items: CartItemResponse[];
};

export type CartItemResponse = {
    id: string;
    storeId: string;
    skus: CartItemSkuResponse[];
};

export type CartItemSkuResponse = {
    lemooSku: string;
    productId: string;
    image: string;
    quantity: number;
    price: number;
    variants: Record<string, string>;
};

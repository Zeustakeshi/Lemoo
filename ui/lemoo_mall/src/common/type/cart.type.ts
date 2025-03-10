export type CartType = {
  id: string;
  items: CartItemType[];
};

export type CartItemType = {
  id: string;
  storeId: string;
  name: string;
  skus: CartItemSkuType[];
};

export type CartItemSkuType = {
  lemooSku: string;
  nameSku: string;
  productId: string;
  image: string;
  quantity: number;
  price: number;
  variants?: Record<string, string>;
};

export type AddProductToCart = {
  productName: string;
  productSku: string;
  storeId: string;
  productQuantity: number;
  productPrice: number;
  productId: string;
  productImage: string;
};

export type SkuType = {
  id: string;
  price: number;
  discount?: number;
  productName?: string;
};

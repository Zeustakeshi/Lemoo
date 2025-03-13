/**
 * Dữ liệu trả về từ api
 */
export type DataTypeCart = {
  /**
   * Nội dung dữ liệu trả về
   */
  content: Content[];
  /**
   * Cờ thể hiện có dữ liệu trả về hay không
   */
  empty: boolean;
  /**
   * Cờ thể hiện có phải trang đầu tiên không
   */
  first: boolean;
  /**
   * Cờ thể hiện có phải trang cuối cùng không
   */
  last: boolean;
  /**
   * Số trang hiện tại
   */
  pageNumber: number;
  /**
   * Số lượng dữ liệu trả về trong trang hiện tại
   */
  size: number;
  /**
   * Tổng số lượng dữ liệu hiện có
   */
  totalElements: number;
  /**
   * Tổng số trang hiện có
   */
  totalPages: number;
  [property: string]: any;
};

export type Content = {
  /**
   * Mã cart item
   */
  id: string;
  status?: string;
  /**
   * Mã sản phẩm
   */
  productId: string;
  /**
   * Số lượng sản phẩm trong giỏ hàng
   */
  quantity: number;
  sku: Sku;
  /**
   * Mã cửa hàng
   */
  storeId: string;
  [property: string]: any;
};

export type Sku = {
  /**
   * Ảnh sku
   */
  image: string;
  /**
   * Mã sku sản phẩm
   */
  lemooSku: string;
  /**
   * Tên sku
   */
  name: string;
  /**
   * Giá sku
   */
  price: number;
  [property: string]: any;
};

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

export type CartSelectType = {
  item: {
    nameSku: string;
    lemooSku: string;
    quantity: number;
    image: string;
    price: number;
  }[];
};

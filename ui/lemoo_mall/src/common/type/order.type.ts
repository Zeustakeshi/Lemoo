export type OrderType = {
  /**
   * Order item
   */
  items: Item[];
  /**
   * Phương thức thanh toán
   */
  paymentMethod: PaymentMethod;
  /**
   * Id địa chỉ giao hàng
   */
  shippingAddressId: string; // Changed from optional to required (removed ?)
};

export type Item = {
  /**
   * Sku trong đơn hàng
   */
  skus: Skus[]; // Changed from lemooSku: string to array of Skus
  /**
   * Id cửa hàng
   */
  storeId: string; // Added new required field
  /**
   * Danh sách id các voucher
   */
  vouchers: string[]; // Changed from promotions in OrderType to vouchers in Item
  [property: string]: any;
};

export type Skus = {
  /**
   * Mã sku sản phẩm
   */
  lemooSku: string;
  /**
   * Số lượng đặt hàng
   */
  quantity: number;
  [property: string]: any;
};

/**
 * Phương thức thanh toán
 */
export type PaymentMethod = "COD";

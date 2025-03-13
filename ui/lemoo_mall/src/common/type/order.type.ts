export type OrderType = {
  items: Item[];
  /**
   * Phương thức thanh toán
   */
  paymentMethod: PaymentMethod;
  /**
   * Danh sách mã giảm giá
   */
  promotions: string[];
  /**
   * Địa chỉ giao hàng
   */
  shippingAddressId?: string;
  [property: string]: any;
};

export type Item = {
  /**
   * Mã sku
   */
  lemooSku: string;
  /**
   * Số lượng
   */
  quantity: number;
  [property: string]: any;
};

/**
 * Phương thức thanh toán
 */
export type PaymentMethod = "COD";

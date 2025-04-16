import { OrderStatus } from "../enum/order.enum";

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

export type OrderDetailType = {
    id: string;
    items: {
        lemooSku: string;
        name: string;
        image: string;
        quantity: number;
        price: number;
    }[];
    total: number;
    shippingAddress: {
        id: string;
        address: {
            province: {
                code: string;
                name: string;
            };
            district: {
                code: string;
                name: string;
            };
            ward: {
                code: string;
                name: string;
            };
            detail: string;
            fullAddress: string;
        };
        recipientName: string;
        recipientPhone: string;
    };
    paymentMethod: PaymentMethod;
    status: OrderStatus;
    orderDate: string;
    storeId: string;
    vouchers: string[];
};

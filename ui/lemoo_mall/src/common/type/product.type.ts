/**
 * Dữ liệu trả về từ api
 */
export type TypeProdcutDetail = {
    /**
     * Mô tả sản phẩm
     */
    description: string;
    /**
     * Mã sản phẩm
     */
    id: string;
    /**
     * Danh sách ảnh sản phẩm
     */
    images: string[];
    /**
     * Cờ thể hiện sản phẩm còn hàng không
     */
    isSoldOut: boolean;
    /**
     * Tên sản phẩm
     */
    name: string;
    /**
     * Đánh giá sản phẩm
     */
    ratting: number;
    /**
     * Số lượt đánh giá sản phẩm
     */
    rattingCount: number;
    skus: Skus[];
    /**
     * Mã cửa hàng
     */
    storeId: string;
    /**
     * Số lượng đã bán
     */
    totalSold: number;
    /**
     * Danh sách biến thể
     */
    variants: Variant[];
    [property: string]: any;
};

export type Skus = {
    /**
     * Ảnh sku
     */
    image: string;
    /**
     * Mã sku
     */
    lemooSku: string;
    /**
     * Tên sku
     */
    name: string;
    /**
     * Giá gốc sku
     */
    originPrice: number;
    /**
     * Giá khuyến mãi sku
     */
    promotionPrice: number;
    /**
     * Biến thể tạo thành sku
     */
    variants: { [key: string]: any };
    [property: string]: any;
};

export type Variant = {
    /**
     * Tên biến thể
     */
    name: string;
    /**
     * Giá trị biến thể
     */
    values: Value[];
    [property: string]: any;
};

export type Value = {
    code: string;
    name: string;
    [property: string]: any;
};

export type ProductFeatureType = {
    id: string;
    name: string;
    thumbnail: string;
    originPrice: number;
    promotionPrice: number;
    totalSold: number;
    ratting: number;
    rattingCount: number;
};

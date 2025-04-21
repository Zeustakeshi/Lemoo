/**
 * Dữ liệu trả về từ api
 */
export type DataVoucher = {
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
     * Thời gian thu thập
     */
    collectedAt: string;
    /**
     * Trạng thái voucher
     */
    status: string;
    voucher: UserVoucherResponse;
    [property: string]: any;
};

/**
 * UserVoucherResponse
 */
export type UserVoucherResponse = {
    /**
     * Thời gian người dùng có thể thu thập voucher
     */
    collectStartTime: string;
    /**
     * Loại giảm giá
     */
    discountType: DiscountType;
    /**
     * Giá trị giảm giá
     */
    discountValue: number;
    /**
     * Mã voucher
     */
    id: string;
    /**
     * Thời gian kết thúc
     */
    periodEndTime: string;
    /**
     * Thời gian bắt đầu
     */
    periodStartTime: string;
    [property: string]: any;
};

/**
 * Loại giảm giá
 */
export type DiscountType = "MONEY_VALUE" | "PERCENTAGE";

export type StoreVoucherResponse = {
    collectStartTime: string;
    discountType: DiscountType;
    discountValue: number;
    id: string;
    name: string;
    periodEndTime: string;
    periodStartTime: string;
    type: "REGULAR_VOUCHER" | "STORE_FOLLOWER_VOUCHER" | "FIRST_PURCHASE";
    [property: string]: any;
};

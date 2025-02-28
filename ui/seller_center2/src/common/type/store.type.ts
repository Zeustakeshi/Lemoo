/**
 * Seller store response
 */
export interface Store {
    /**
     * Tên pháp lý
     */
    companyName: string;
    /**
     * Địa chỉ email chính
     */
    email: string;
    /**
     * Mã cửa hàng
     */
    id: string;
    /**
     * Logo cửa hàng
     */
    logo: string;
    /**
     * Tên cửa hàng
     */
    name: string;
    /**
     * Số điện thoại chính
     */
    phone: string;
    /**
     * Mã cửa hàng  (thu gọn)
     */
    shortCode: string;
    /**
     * Trạng thái của cửa hàng
     */
    status: Status;
    /**
     * Trạng thái xác nhận
     */
    verified: boolean;
}

/**
 * Trạng thái của cửa hàng
 */
export enum Status {
    PENDING = "PENDING",
    ACTIVE = "ACTIVE",
    NOT_ACTIVE = "NOT_ACTIVE",
    DELETED = "DELETED",
}

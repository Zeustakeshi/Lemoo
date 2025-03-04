import { VoucherScope, VoucherStatus } from "../common/enum/voucher.enum";

export const getVoucherScopeText = (voucherScope: VoucherScope): string => {
    switch (voucherScope) {
        case VoucherScope.ENTIRE_STORE:
            return "Toàn cửa hàng";
        case VoucherScope.SPECIFIC_PRODUCT:
            return "Sản phẩm được chọn";
        default:
            return "Toàn cửa hàng";
    }
};

export const getVoucherStatusText = (voucherStatus: VoucherStatus): string => {
    switch (voucherStatus) {
        case VoucherStatus.ACTIVE:
            return "Đang hoạt động";
        case VoucherStatus.NOT_ACTIVE:
            return "Chưa kích hoạt";
        default:
            return "Chưa kích hoạt";
    }
};

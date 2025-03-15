import { ProductStatus } from "@/common/type/product.type";

export const getProductStatusText = (status: ProductStatus) => {
    switch (status) {
        case ProductStatus.LIVE:
            return "Đang hoạt động";
        case ProductStatus.INACTIVE:
            return "Không hoạt động";
        case ProductStatus.DELETED:
            return "Đã xóa";
        case ProductStatus.PENDING:
            return "Đang chờ duyệt";
        case ProductStatus.REJECTED:
            return "Bị từ chối";
        case ProductStatus.SOLD_OUT:
            return "Đã bán hết";
        default:
            return "Không xác định";
    }
};

export const getProductStatusColor = (status: ProductStatus) => {
    switch (status) {
        case ProductStatus.LIVE:
            return "text-green-500";
        case ProductStatus.INACTIVE:
            return "text-gray-500";
        case ProductStatus.DELETED:
            return "text-red-500";
        case ProductStatus.PENDING:
            return "text-yellow-500";
        case ProductStatus.REJECTED:
            return "text-red-500";
        case ProductStatus.SOLD_OUT:
            return "text-purple-500";
        default:
            return "text-gray-500";
    }
};

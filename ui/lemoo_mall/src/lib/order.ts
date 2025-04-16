import { OrderStatus } from "@/common/enum/order.enum";

export const getOderStatusColor = (status: OrderStatus): string => {
    switch (status) {
        case OrderStatus.UN_PAID:
            return "#A0AEC0";
        case OrderStatus.PENDING:
            return "#F6AD55";
        case OrderStatus.CANCELLED:
            return "#F56565";
        case OrderStatus.CONFIRMED:
            return "#4299E1";
        case OrderStatus.PACKED:
            return "#9F7AEA";
        case OrderStatus.SHIPPED:
            return "#4FD1C5";
        case OrderStatus.IN_TRANSIT:
            return "#38B2AC";
        case OrderStatus.FAILED_DELIVERY:
            return "#A1887F";
        case OrderStatus.DELIVERED:
            return "#48BB78";
        case OrderStatus.COMPLETED:
            return "#2F855A";
        default:
            return "#4A5568";
    }
};

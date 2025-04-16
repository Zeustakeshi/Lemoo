import { ShippingOrderStatus } from "../enum/shipping.enum";

export type ShippingOrderResponse = {
    content: string;
    shippingOrderCode: string;
    totalAmount: number;
    orderId: string;
    logs: {
        status: ShippingOrderStatus;
        tripCode: string;
        updatedDate: string;
    }[];
    leadtimeOrder: {
        from_estimate_date: string;
        to_estimate_date: string;
        picked_date: string;
    };
    status: ShippingOrderStatus;
};

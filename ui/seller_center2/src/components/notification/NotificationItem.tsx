import { NotificationItemResponse } from "@/common/type/notification.type";
import { forwardRef } from "react";
import ProductNotificationItem from "./items/ProductNotificationItem";
type Props = {
    notification: NotificationItemResponse;
};

const NotificationItem = ({ notification }: Props, ref: any) => {
    switch (notification.type) {
        default:
            return (
                <ProductNotificationItem
                    notify={notification}
                    ref={ref}
                ></ProductNotificationItem>
            );
    }
};

export default forwardRef(NotificationItem);

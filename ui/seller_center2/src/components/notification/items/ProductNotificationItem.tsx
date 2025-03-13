import { NotificationItemResponse } from "@/common/type/notification.type";
import {
    getNotifyBackgroundColor,
    getNotifyLevelText,
} from "@/lib/notification.lib";
import { cn } from "@/lib/utils";
import moment from "moment";
import { forwardRef } from "react";

type Props = {
    notify: NotificationItemResponse;
};

const ProductNotificationItem = ({ notify }: Props, ref: any) => {
    return (
        <div
            ref={ref}
            className={cn(
                "px-5 py-5 mb-4 rounded-md",
                getNotifyBackgroundColor(notify.level)
            )}
        >
            <div className="flex justify-between items-center">
                <div className="flex justify-start items-center gap-3 mb-2">
                    <h3 className=" font-semibold px-1 py-1 bg-primary w-max text-white rounded-md text-xs">
                        Sản phẩm
                    </h3>
                    <div
                        className={cn(
                            "!bg-opacity-100 w-max rounded-md p-1 text-xs",
                            getNotifyBackgroundColor(notify.level)
                        )}
                    >
                        {getNotifyLevelText(notify.level)}
                    </div>
                </div>
                <span className="text-slate-900 text-sm">
                    {moment(notify.timestamp).fromNow()}
                </span>
            </div>

            <p className="font-sans">{notify.notifyText}</p>
        </div>
    );
};

export default forwardRef(ProductNotificationItem);

import { NotifyLevel } from "@/common/type/notification.type";

export const getNotifyBackgroundColor = (level: NotifyLevel) => {
    switch (level) {
        case NotifyLevel.CRITICAL:
            return "bg-red-600/5 border border-red-600";
        case NotifyLevel.WARNING:
            return "bg-orange-600/5 border border-orange-600";
        case NotifyLevel.SUCCESS:
            return "bg-green-600/5 border border-green-600";
        case NotifyLevel.ERROR:
            return "bg-red-700/5 border border-red-700";
        case NotifyLevel.INFO:
            return "bg-blue-600/5 border border-blue-600";
        default:
            return "bg-primary/5 border border-primary";
    }
};

export const getNotifyLevelText = (level: NotifyLevel) => {
    switch (level) {
        case NotifyLevel.CRITICAL:
            return "Quan trọng";
        case NotifyLevel.WARNING:
            return "Cảnh báo";
        case NotifyLevel.SUCCESS:
            return "Thành công";
        case NotifyLevel.ERROR:
            return "Lỗi";
        case NotifyLevel.INFO:
            return "Thông tin";
        default:
            return "Thông báo";
    }
};

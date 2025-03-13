export enum NotificationType {
    SYSTEM = "SYSTEM",
    ORDER = "ORDER",
    PRODUCT = "PRODUCT",
    PROMOTION = "PROMOTION",
    USER = "USER",
    PAYMENT = "PAYMENT",
    DELIVERY = "DELIVERY",
    FEEDBACK = "FEEDBACK",
}

export enum NotifyLevel {
    INFO = "INFO",
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    ERROR = "ERROR",
    CRITICAL = "CRITICAL",
}

export type NotificationItemResponse = {
    notifyText: string;
    type: NotificationType;
    level: NotifyLevel;
    timestamp: string;
};

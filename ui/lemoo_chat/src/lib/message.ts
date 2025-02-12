import { MessageStatus } from "@/common/enum/message.enum";

export const messageStatusMapper = (status: MessageStatus) => {
    switch (status) {
        case MessageStatus.SENT:
            return "Đã gửi";
        case MessageStatus.RECEIVED:
            return "Đã nhận";
        case MessageStatus.SEND_FAILED:
            return "Gửi thất bại";
        case MessageStatus.RECEIVE_FAILED:
            return "Nhận thất bại";
        case MessageStatus.SEEN:
            return "Đã xem";
        case MessageStatus.PENDING:
            return "Đang gửi";
        default:
            return "Đang gửi";
    }
};

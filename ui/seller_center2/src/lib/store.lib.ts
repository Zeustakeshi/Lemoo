import { Status } from "../common/type/store.type";

export const getStoreStatusText = (status: Status): string => {
    switch (status) {
        case Status.PENDING:
            return "Đang chờ duyệt";
        case Status.ACTIVE:
            return "Đang hoạt động";
        case Status.NOT_ACTIVE:
            return "Không hoạt động";
        case Status.DELETED:
            return "Đã xóa";
        default:
            return "";
    }
};

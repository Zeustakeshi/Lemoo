import { StoreStatus } from "@/common/type/store.type";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function sleep<T>(data: T, delay: number = 1000): Promise<T> {
    return new Promise((rs) => setTimeout(() => rs(data), delay));
}

export function getStoreStatusText(status: StoreStatus): string {
    switch (status) {
        case "ACTIVE":
            return "Đang hoạt động";
        case "PENDING":
            return "Đang chờ duyệt";
        case "NOT_ACTIVE":
            return "Không hoạt động";
        case "DELETED":
            return "Bị khóa hoạt động";
        default:
            return "Không xác định";
    }
}

export function getStoreStatusColor(status: StoreStatus): string {
    switch (status) {
        case "ACTIVE":
            return "#16a34a";
        case "PENDING":
            return "#fbbf24";
        case "NOT_ACTIVE":
            return "#94a3b8";
        case "DELETED":
            return "#ef4444";
        default:
            return "#4c0519";
    }
}

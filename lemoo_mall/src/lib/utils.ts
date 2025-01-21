import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatMoneyVND = (amount: number): string => {
    if (isNaN(amount)) {
        throw new Error("Invalid number");
    }

    return amount.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

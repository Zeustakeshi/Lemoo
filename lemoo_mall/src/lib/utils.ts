import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function sleep(ms?: number) {
    return new Promise((rs) => setTimeout(rs, ms ?? 1000));
}

export async function sleepAndFakeData<T>(data: any, ms?: number): Promise<T> {
    return new Promise((rs) => setTimeout(() => rs(data), ms ?? 1000));
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

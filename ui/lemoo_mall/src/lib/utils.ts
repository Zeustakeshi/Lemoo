import { CartItemSkuType, CartItemType } from "@/common/type/cart.type";
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

export const calculateTotalSku = (cartItems?: CartItemType[]): number => {
    if (!cartItems) return 0;

    const sumSkuQuantity = (skus: CartItemSkuType[]) => {
        return skus.reduce((acc, curr) => acc + curr.quantity, 0);
    };

    return cartItems.reduce((acc, curr) => acc + sumSkuQuantity(curr.skus), 0);
};

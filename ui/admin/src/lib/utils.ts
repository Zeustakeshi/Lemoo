import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export async function sleep<T>(data: T, delay: number = 1000): Promise<T> {
    return new Promise((rs) => setTimeout(() => rs(data), delay));
}

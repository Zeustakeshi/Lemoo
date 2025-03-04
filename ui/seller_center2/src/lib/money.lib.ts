export const formatMoneyVND = (amount: number): string => {
    if (isNaN(amount)) {
        throw new Error("Invalid number");
    }

    return amount.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

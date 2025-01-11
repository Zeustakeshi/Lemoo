export const sleep = async (ms: number) => {
    return new Promise((rs) => {
        return setTimeout(rs, ms);
    });
};

export const formatMoneyVND = (amount: number): string => {
    if (isNaN(amount)) {
        throw new Error("Invalid number");
    }

    return amount.toLocaleString("vi-VN", {
        style: "currency",
        currency: "VND",
    });
};

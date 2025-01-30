export type StoreStatus = "ACTIVE" | "PENDING" | "NOT_ACTIVE" | "DELETED";

export type StoreType = {
    storeId: string;
    name: string;
    shortCode: string;
    status: StoreStatus;
    type: "INDIVIDUAL" | "CORPORATE";
};

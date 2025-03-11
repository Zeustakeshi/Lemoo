export type AddressResponse = {
    id: string;
    createdAt: string;
    updatedAt: string;
    userId: string;
    isDefault: boolean;
    recipientName: string;
    recipientPhone: string;
    address: {
        province: string;
        district: string;
        ward: string;
        detail: string;
        fullAddress: string;
    };
    type: "RESIDENTIAL" | "COMPANY";
};

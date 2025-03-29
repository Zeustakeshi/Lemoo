export type AddressResponse = {
  id: string;
  createdAt: string;
  updatedAt: string;
  userId: string;
  isDefault: boolean;
  recipientName: string;
  recipientPhone: string;
  address: {
    province: { code: string; name: string };
    district: { code: string; name: string };
    ward: { code: string; name: string };
    detail: string;
    fullAddress: string;
  };
  type: "RESIDENTIAL" | "COMPANY";
};

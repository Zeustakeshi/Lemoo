export type VoucherRegular = {
  name: string;
  periodStartTime: string;
  periodEndTime: string;
  collectStartTime: string;
  discountType: "MONEY_VALUE" | "PERCENTAGE"; // Hoặc khai báo enum trước đó
  discountValue: number;
  minimumOrderValue: number;
  maximumDiscountValue: number;
  totalAvailable: number;
  budget: number;
  scope: "ENTIRE_STORE" | "SPECIFIC_PRODUCT"; // Sử dụng dấu nháy kép cho chuỗi
  limit: number;
};

export interface FormVariants {
  name: string; // Tên thuộc tính (màu sắc, kích thước)
  values: string[]; // Danh sách các giá trị của thuộc tính
}

interface VariantAttributes {
  // VariantAttributes
  [key: string]: string; // Các giá trị thuộc tính cho biến thể, ví dụ: "Màu sắc": "Đỏ", "Kích thước": "S"
}

export interface SkusVar {
  //Variant
  name: string; // Tên biến thể (ví dụ: "Đỏ - S")
  image: DataMedia;
  sellerSku: string; // SKU của người bán
  allowSale: boolean; // Cờ cho phép bán hay không
  price: number; // Giá bán
  specialPrice?: number; // Giá đặc biệt (tùy chọn)
  specialFromDate?: string; // Thời gian bắt đầu áp dụng giá đặc biệt (tùy chọn)
  specialToDate?: string; // Thời gian kết thúc áp dụng giá đặc biệt (tùy chọn)
  stock: number; // Số lượng tồn kho
  packageWidth: number; // Chiều rộng đóng gói
  packageHeight: number; // Chiều cao đóng gói
  packageLength: number; // Chiều dài đóng gói
  packageWeight: number; // Cân nặng đóng gói
  variants: VariantAttributes; // Các giá trị thuộc tính của biến thể (màu sắc, kích thước)
}

export interface DataMedia {
  mediaId: string;
  url: string;
}

export interface FormDataAddProduct {
  name: string; // Tên sản phẩm
  description: string; // Mô tả sản phẩm
  categoryId: string; // Mã danh mục
  smallImage: DataMedia;
  video: DataMedia;
  images: DataMedia[];
  variants: FormVariants[]; // Các thuộc tính của sản phẩm (màu sắc, kích thước, v.v.)
  skus: SkusVar[]; // Các biến thể của sản phẩm
}

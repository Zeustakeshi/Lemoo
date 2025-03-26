// Định nghĩa kiểu cho một mục trong đơn hàng
type OrderItem = {
  lemooSku: string;
  image: string;
  price: number;
  quantity: number;
};

// Định nghĩa kiểu cho một đơn hàng
type Order = {
  id: string;
  paymentMethod: "COD" | "CREDIT_CARD" | "PAYPAL" | string; // Có thể mở rộng nếu có thêm phương thức thanh toán
  orderDate: string; // Dữ liệu datetime dạng ISO string
  status: "PENDING" | "COMPLETED" | "CANCELLED" | string; // Có thể mở rộng nếu có thêm trạng thái
  vouchers: string[]; // Danh sách voucher (có thể là mã giảm giá)
  items: OrderItem[]; // Danh sách sản phẩm trong đơn hàng
};

// Định nghĩa kiểu cho dữ liệu phân trang của đơn hàng
type OrderPageable = {
  totalPages: number;
  totalElements: number;
  size: number;
  content: Order[]; // Danh sách các đơn hàng
  first: boolean;
  last: boolean;
  pageNumber: number;
  empty: boolean;
};

// Định nghĩa kiểu cho phản hồi từ API
export type OrderResponse = {
  data: OrderPageable;
  timestamp: string; // Dữ liệu datetime dạng ISO string
  success: boolean;
};

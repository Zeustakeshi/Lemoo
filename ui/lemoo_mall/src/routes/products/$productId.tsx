import ProductImage from "@/components/modules/product/product-detail/ProductImage";
import { createFileRoute } from "@tanstack/react-router";
import { BadgeDollarSign, Star } from "lucide-react";

export const Route = createFileRoute("/products/$productId")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="grid grid-cols-12 w-full min-h-[700px] gap-2 p-6 ">
      {/* Phần hình ảnh sản phẩm */}
      <div className="col-span-7 h-full flex items-center justify-center bg-white rounded-2xl shadow-lg">
        <ProductImage />
      </div>

      {/* Phần thông tin chi tiết */}
      <div className="col-span-5 h-full bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6">
        {/* Tên sản phẩm */}
        <h1 className="text-4xl font-semibold text-gray-800 ">
          Thun Polo Nam Thêu Chữ U
        </h1>

        {/* Loại sản phẩm */}
        <div className="text-gray-600">
          <span className="font-semibold">Danh mục:</span> Quần áo
        </div>

        {/* Giá sản phẩm */}
        <div className="text-2xl font-semibold ">
          <span>₫</span> <span>1.200.000 </span>
        </div>

        {/* Đánh giá sản phẩm */}
        <div className="text-gray-600">
          <span className="font-semibold flex items-center space-x-2">
            <span> Đánh giá: 4/5</span> <Star className="text-yellow-400" />{" "}
            <Star className="text-yellow-400" />
            <Star className="text-yellow-400" />{" "}
            <Star className="text-yellow-400" />
          </span>
        </div>

        {/* Số lượng đã bán */}
        <div className="text-gray-600">
          <span className="font-semibold flex items-center space-x-2">
            <BadgeDollarSign />
            <span> Đã bán: 1000</span>
          </span>
        </div>
        {/* Biến thể */}
        <div className="flex flex-wrap gap-2 ">
          {["S", "M", "L", "XL", "XXL", "XXXL"].map((size) => (
            <button
              key={size}
              className="px-6 py-3 min-w-24 border border-gray-700 font-semibold rounded-3xl hover:bg-gray-200 transition duration-300"
            >
              {size}
            </button>
          ))}
        </div>
        {/* Nút hành động */}
        <div className="flex flex-col gap-2 ">
          <button className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-3xl  hover:bg-blue-600 transition duration-300">
            Mua Ngay
          </button>
          <button className="px-6 py-3 border border-gray-800 text-gray-800 font-semibold rounded-3xl  hover:bg-gray-200 transition duration-300">
            Thêm Vào Giỏ
          </button>
        </div>
        {/* Mô tả sản phẩm */}
        <div className="text-gray-600">
          <span className="font-semibold">Mô tả:</span> ÁO THUN POLO Áo thun
          Cotton 100% co dãn 4 chiều ✔️Size sz M L XL XXL Size M 35-45kg Size L
          45-55kg Size XL 55-65kg Size XXL 65-75kg Tuỳ chiều cao nhích size cho
          phù hợp giúp em nha. Bảng cân nặng chỉ là tương đối ạ
        </div>
      </div>
    </div>
  );
}

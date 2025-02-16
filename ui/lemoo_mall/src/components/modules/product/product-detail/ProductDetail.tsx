import { BadgeDollarSign, Star } from "lucide-react";
import ProductImage from "./ProductImage";
import { Button } from "@/components/ui/button";

const ProductDetail = () => {
  // Các biến hằng số để dễ cấu hình
  const productRating = 4;
  const maxRating = 5;
  const sizes = ["S", "M", "L", "XL", "XXL", "XXXL"];
  const discountCodes = [
    {
      code: "ABCXYZ",
      description:
        "Nhập mã ABCXYZ để nhận ưu đãi giảm giá 10% cho đơn hàng từ 500.000đ",
    },
    {
      code: "ABCXYZ",
      description:
        "Nhập mã ABCXYZ để nhận ưu đãi giảm giá 10% cho đơn hàng từ 500.000đ",
    },
    {
      code: "ABCXYZ",
      description:
        "Nhập mã ABCXYZ để nhận ưu đãi giảm giá 10% cho đơn hàng từ 500.000đ",
    },
  ];

  // Dữ liệu sản phẩm liên quan (giả lập)
  const relatedProducts = [
    {
      id: 1,
      name: "Áo sơ mi nam",
      price: "900.000",
      imageUrl:
        "https://i.pinimg.com/736x/b8/b9/b7/b8b9b72c2e991f615016e04e7e6bbfac.jpg",
      rating: 4,
    },
    {
      id: 2,
      name: "Quần jean nam",
      price: "1.100.000",
      imageUrl:
        "https://i.pinimg.com/736x/c2/b3/67/c2b367c607c11a6d79ed39cc67bb7b23.jpg",
      rating: 3,
    },
    {
      id: 3,
      name: "Áo khoác nam",
      price: "2.000.000",
      imageUrl:
        "https://i.pinimg.com/736x/04/23/a5/0423a5ce66d695573c8f5c8c75304f67.jpg",
      rating: 5,
    },
    {
      id: 4,
      name: "Giày thể thao nam",
      price: "1.500.000",
      imageUrl:
        "https://i.pinimg.com/736x/7c/71/fb/7c71fbd743fd7cced70ed9fa45314d66.jpg",
      rating: 4,
    },
    {
      id: 5,
      name: "Giày thể thao nam",
      price: "1.500.000",
      imageUrl:
        "https://i.pinimg.com/736x/7c/71/fb/7c71fbd743fd7cced70ed9fa45314d66.jpg",
      rating: 4,
    },
    {
      id: 6,
      name: "Giày thể thao nam",
      price: "1.500.000",
      imageUrl:
        "https://i.pinimg.com/736x/7c/71/fb/7c71fbd743fd7cced70ed9fa45314d66.jpg",
      rating: 4,
    },
    {
      id: 7,
      name: "Giày thể thao nam",
      price: "1.500.000",
      imageUrl:
        "https://i.pinimg.com/736x/7c/71/fb/7c71fbd743fd7cced70ed9fa45314d66.jpg",
      rating: 4,
    },
    {
      id: 8,
      name: "Giày thể thao nam",
      price: "1.500.000",
      imageUrl:
        "https://i.pinimg.com/736x/7c/71/fb/7c71fbd743fd7cced70ed9fa45314d66.jpg",
      rating: 4,
    },
  ];

  return (
    <div className="w-full p-6 bg-gray-50">
      {/* Responsive grid: 1 cột trên mobile, 12 cột trên md trở lên */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* --- Product Image Section --- */}
        <section
          className="col-span-1 md:col-span-7 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4"
          aria-label="Hình ảnh sản phẩm"
        >
          <ProductImage />
        </section>

        {/* --- Product Details Section --- */}
        <section
          className="col-span-1 md:col-span-5 bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6"
          aria-label="Thông tin chi tiết sản phẩm"
        >
          {/* Tên sản phẩm */}
          <h1 className="text-4xl font-semibold text-gray-800">
            Thun Polo Nam Thêu Chữ U
          </h1>

          {/* Danh mục */}
          <div className="text-gray-600">
            <span className="font-semibold">Danh mục:</span> Quần áo
          </div>

          {/* Giá sản phẩm */}
          <div className="text-2xl font-semibold">
            <span>₫</span> <span>1.200.000</span>
          </div>

          {/* Đánh giá sản phẩm */}
          <div className="flex items-center gap-1">
            {Array.from({ length: maxRating }, (_, i) => (
              <Star
                key={i}
                size={20}
                className={
                  i < productRating ? "text-yellow-400" : "text-gray-300"
                }
              />
            ))}
            <span className="ml-2 text-gray-600">
              {productRating}/{maxRating}
            </span>
          </div>

          {/* Số lượng đã bán */}
          <div className="flex items-center gap-2 text-gray-600">
            <BadgeDollarSign />
            <span className="font-semibold">Đã bán: 1000</span>
          </div>

          {/* Biến thể – lựa chọn kích thước */}
          <div className="flex flex-wrap gap-2" aria-label="Chọn kích thước">
            {sizes.map((size) => (
              <Button
                key={size}
                variant="outline"
                className="px-6 py-3 min-w-[3rem] font-semibold rounded-3xl hover:bg-gray-200 transition duration-300"
              >
                {size}
              </Button>
            ))}
          </div>

          {/* Nút hành động */}
          <div className="flex flex-col gap-2">
            <Button className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-3xl hover:bg-blue-600 transition duration-300">
              Mua Ngay
            </Button>
            <Button
              variant="outline"
              className="px-6 py-3 border border-gray-800 text-gray-800 font-semibold rounded-3xl hover:bg-gray-200 transition duration-300"
            >
              Thêm Vào Giỏ
            </Button>
          </div>

          {/* Mô tả sản phẩm */}
          <article className="text-gray-600">
            <span className="font-semibold">Mô tả:</span> ÁO THUN POLO - Áo thun
            Cotton 100% co dãn 4 chiều. ✔️ Size sz M L XL XXL. Size M: 35-45kg,
            Size L: 45-55kg, Size XL: 55-65kg, Size XXL: 65-75kg. Tuỳ chiều cao,
            có thể nhích size cho phù hợp. (Bảng cân nặng chỉ mang tính tương
            đối.)
          </article>
        </section>

        {/* --- Additional Information Section --- */}
        <section
          className="col-span-1 md:col-span-12 mt-8 space-y-6"
          aria-label="Thông tin bổ sung"
        >
          {/* Shop Section */}
          <div className="p-4 flex flex-col md:flex-row items-center justify-between border rounded-2xl shadow-sm bg-white">
            <div className="flex items-center gap-4">
              <img
                className="w-12 h-12 rounded-full"
                src="https://i.pinimg.com/474x/bb/84/e8/bb84e8891c5b8aea249381b5d7c936e5.jpg"
                alt="Logo Shop"
              />
              <div>
                <p className="font-semibold">Tên Shop</p>
                <p className="text-sm text-gray-500">100+ sản phẩm | 4.8 sao</p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button variant="outline">Xem Shop</Button>
              <Button>Chat Ngay</Button>
            </div>
          </div>

          {/* Product Information & Discount Codes Section */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Product Information */}
            <div className="md:w-2/3 p-4 border rounded-2xl shadow-sm bg-white">
              <h2 className="text-lg font-semibold">MÔ TẢ SẢN PHẨM</h2>
              <p className="text-gray-600 mt-2">
                Mô tả chi tiết về sản phẩm, các tính năng và hướng dẫn sử
                dụng...
              </p>
              <ul className="mt-2 text-gray-500 text-sm space-y-1 list-disc pl-5">
                <li>Kích thước: 30x20 cm</li>
                <li>Chất liệu: Cotton</li>
                <li>Xuất xứ: Việt Nam</li>
              </ul>
            </div>
            {/* Discount Codes */}
            <div className="md:w-1/3 p-4 border rounded-2xl shadow-sm bg-white">
              <h2 className="text-lg font-semibold">Mã giảm giá của shop</h2>
              <div className="flex flex-col gap-4 overflow-auto max-h-60 mt-2">
                {discountCodes.map((item, index) => (
                  <div key={index} className="p-2 border-b last:border-b-0">
                    <div className="border p-2 rounded-lg bg-red-300">
                      <p className="text-red-900">{item.description}</p>
                      <div className="flex items-center justify-end mt-2">
                        <button className="mt-2 px-4 py-2 rounded-lg text-right text-sm bg-red-500">
                          <p className="text-white"> Lưu</p>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reviews Section */}
          <div className="p-4 border rounded-2xl shadow-sm bg-white">
            <h2 className="text-lg font-semibold">ĐÁNH GIÁ SẢN PHẨM</h2>
            <div className="mt-4 space-y-4">
              {[1, 2, 3].map((review) => (
                <div key={review} className="border-b pb-4">
                  <div className="flex items-center gap-3">
                    <img
                      className="w-12 h-12 rounded-full object-cover"
                      src="https://i.pinimg.com/474x/3c/ab/30/3cab30f6e4ef44ee0bf328a8d01daff2.jpg"
                      alt={`User ${review}`}
                    />
                    <p className="font-semibold">User {review}</p>
                  </div>
                  <div className="flex items-center gap-1 mt-2">
                    {Array.from({ length: maxRating }, (_, i) => (
                      <Star
                        key={i}
                        size={16}
                        className={
                          i < productRating
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-sm mt-2">
                    Sản phẩm rất tốt! Lorem ipsum dolor sit amet consectetur
                    adipisicing elit. Asperiores, nihil. Amet totam aut et
                    nostrum modi vel officia est, sequi soluta quo! Voluptatem
                    veritatis tenetur, repellendus dolores totam magnam soluta?
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* --- Related Products Section --- */}
        <section
          className="col-span-1 md:col-span-12 mt-8"
          aria-label="Sản phẩm liên quan"
        >
          <h2 className="text-2xl font-bold mb-4">Sản phẩm liên quan</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover transition-transform duration-300 transform hover:scale-105"
                />
                <h3 className="mt-2 text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <div className="mt-1 text-gray-600">
                  <span>₫{product.price}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < product.rating ? "text-yellow-400" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  Xem chi tiết
                </Button>
              </div>
            ))}
          </div>
        </section>
        {/* --- Recommend --- */}
        <section
          className="col-span-1 md:col-span-12 mt-8"
          aria-label="Sản phẩm liên quan"
        >
          <h2 className="text-2xl font-bold mb-4">Có thể bạn cũng thích</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {relatedProducts.map((product) => (
              <div
                key={product.id}
                className="bg-white p-4 rounded-2xl shadow hover:shadow-lg transition duration-300 overflow-hidden"
              >
                <img
                  src={product.imageUrl}
                  alt={product.name}
                  className="w-full h-40 object-cover transition-transform duration-300 transform hover:scale-105"
                />
                <h3 className="mt-2 text-lg font-semibold text-gray-800">
                  {product.name}
                </h3>
                <div className="mt-1 text-gray-600">
                  <span>₫{product.price}</span>
                </div>
                <div className="flex items-center gap-1 mt-1">
                  {Array.from({ length: maxRating }, (_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < product.rating ? "text-yellow-400" : "text-gray-300"
                      }
                    />
                  ))}
                </div>
                <Button variant="outline" className="mt-4 w-full">
                  Xem chi tiết
                </Button>
              </div>
            ))}
          </div>
        </section>
      </div>
      {/* --- Button to Load More Products --- */}
      <div className="flex items-center justify-center mt-5">
        <button className="px-16 py-2 border shadow-lg bg-slate-50">
          Xem thêm
        </button>
      </div>
    </div>
  );
};

export default ProductDetail;

import { getProductDetail } from "@/api/product.api";
import { Button } from "@/components/ui/button";
import Ratting from "@/components/ui/ratting";
import VoucherList from "@/components/voucher/VoucherList";
import { formatMoneyVND } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { Star } from "lucide-react";
import { useEffect, useState } from "react";
import ProductImage from "./ProductImage";
import {
  discountCodesData,
  maxRatingData,
  productRatingData,
  relatedProductsData,
} from "@/data/product.data";
import { AddToCart } from "@/api/cart.api";
import { CartItemType, SkuType } from "@/common/type/cart.type";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { addCartItem } from "@/store/cart/cartSlice";
import { getStoreOverviewById } from "@/api/store.api";

const ProductDetail = () => {
  const navigation = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const { productId }: { productId: string } = useParams({ strict: false });

  // Query để lấy chi tiết sản phẩm
  const { data: productData } = useQuery({
    queryKey: [`product-detail`, productId],
    queryFn: async () => await getProductDetail(productId),
  });

  // Query để lấy thông tin cửa hàng
  const { data: storeData, isLoading: isStoreLoading } = useQuery({
    queryKey: [`store-detail`, productData?.storeId],
    queryFn: async () => {
      if (productData?.storeId) {
        return await getStoreOverviewById(productData.storeId);
      }
      return null;
    },
    enabled: !!productData?.storeId, // Chỉ gọi API khi storeId tồn tại
  });

  console.log("Dữ liệu API sản phẩm: ", productData);
  console.log("Dữ liệu API cửa hàng: ", storeData);

  const productRating = productRatingData;
  const maxRating = maxRatingData;
  const discountCodes = discountCodesData;
  const relatedProducts = relatedProductsData;

  const [selectSku, setSelectSku] = useState<SkuType>();
  const [quantity, setQuantity] = useState(1);
  const [dataImage, setDataImage] = useState<string[]>();
  const listImage = [] as string[];

  useEffect(() => {
    if (productData) {
      if (productData?.skus?.length > 0) {
        productData.skus.forEach((item: any) => {
          listImage.push(item.image);
          setSelectSku({
            id: productData?.skus[0]?.lemooSku ?? "",
            price: productData?.skus[0]?.originPrice ?? 0,
            discount: productData?.skus[0]?.promotionPrice ?? 0,
          });
        });
        console.log("Dữ liệu chi tiết sản phẩm: ", productData);
        setDataImage(listImage);
      }
    }
  }, [productData]);

  const handleIncrease = () => setQuantity((prev) => prev + 1);
  const handleDecrease = () => {
    if (quantity > 1) setQuantity((prev) => prev - 1);
  };

  // Thêm vào giỏ hàng
  const addToCart = async () => {
    const dataCart: CartItemType = {
      id: productData?.id ?? "",
      name: productData?.name ?? "",
      storeId: productData?.storeId ?? "",
      skus: [
        {
          lemooSku: selectSku?.id ?? "",
          nameSku: selectSku?.productName ?? "",
          productId: productData?.id ?? "",
          image: productData?.images?.[0] ?? "",
          quantity: quantity,
          price: selectSku?.discount ?? selectSku?.price ?? 0,
        },
      ],
    };

    try {
      const res = await AddToCart(selectSku?.id ?? "", quantity);
      dispatch(addCartItem(dataCart));
      console.log("Thêm vào giỏ hàng thành công!, dữ liệu: ", res);
    } catch (e) {
      console.log("Lỗi thêm vào giỏ hàng: ", e);
    }
  };

  // Xử lý chuyển hướng đến trang cửa hàng
  const handleStore = async () => {
    if (!productData?.storeId) {
      console.error("storeId không tồn tại");
      return;
    }
    navigation({ to: `/store/${productData.storeId}` });
  };

  return (
    <div className="w-full p-6 bg-gray-50">
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        {/* --- Product Image Section --- */}
        <section
          className="col-span-1 md:col-span-7 bg-white rounded-2xl shadow-lg flex items-center justify-center p-4"
          aria-label="Hình ảnh sản phẩm"
        >
          {dataImage && <ProductImage images={dataImage ?? []} />}
        </section>

        {/* --- Product Details Section --- */}
        <section
          className="col-span-1 md:col-span-5 bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6"
          aria-label="Thông tin chi tiết sản phẩm"
        >
          <h1 className="text-2xl font-semibold text-gray-800">
            {productData?.name}
          </h1>
          <div className="text-2xl font-semibold">
            {selectSku ? (
              selectSku.discount ? (
                <div className="flex items-center gap-2">
                  <span className="text-red-500">
                    {formatMoneyVND(selectSku.discount)}
                  </span>
                  <span className="text-gray-500 line-through">
                    {formatMoneyVND(selectSku.price)}
                  </span>
                </div>
              ) : (
                <span>{formatMoneyVND(selectSku.price)}</span>
              )
            ) : (
              ""
            )}
          </div>
          <div className="flex items-center gap-4">
            <span className="font-semibold">Số lượng:</span>
            <div className="flex items-center border rounded-lg">
              <Button
                variant="outline"
                onClick={handleDecrease}
                className="px-3 py-1"
              >
                -
              </Button>
              <input
                type="text"
                value={quantity}
                readOnly
                className="w-12 text-center border-none outline-none"
              />
              <Button
                variant="outline"
                onClick={handleIncrease}
                className="px-3 py-1"
              >
                +
              </Button>
            </div>
          </div>
          <Ratting
            value={productData?.ratting ?? 0}
            readOnly
            className="my-1"
            size={100}
          />
          <div className="flex flex-wrap gap-2" aria-label="Chọn kích thước">
            {productData?.skus.map((item) => (
              <Button
                key={item.id}
                variant="outline"
                onClick={() =>
                  setSelectSku({
                    id: item.lemooSku,
                    price: item.originPrice,
                    discount: item.promotionPrice,
                    productName: item.name,
                  })
                }
                className="px-6 py-3 min-w-[3rem] font-semibold rounded-lg hover:bg-gray-200 transition duration-300"
              >
                {item.name}
              </Button>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            <Button className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-3xl hover:bg-blue-600 transition duration-300">
              Mua Ngay
            </Button>
            <Button
              onClick={addToCart}
              variant="outline"
              className="px-6 py-3 border border-gray-800 text-gray-800 font-semibold rounded-3xl hover:bg-gray-200 transition duration-300"
            >
              Thêm Vào Giỏ
            </Button>
          </div>
          <article className="text-gray-600">
            <span className="font-semibold">Mô tả:</span>{" "}
            {productData?.description}
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
                src={
                  storeData?.logo ||
                  "https://i.pinimg.com/736x/bb/84/e8/bb84e8891c5b8aea249381b5d7c936e5.jpg"
                }
                alt="Logo Shop"
              />
              <div>
                <p className="font-semibold">
                  {storeData?.name || productData?.storeId}
                </p>
                <p className="text-sm text-gray-500">
                  {isStoreLoading
                    ? "Đang tải..."
                    : `${storeData?.follower || 0} lượt theo dõi `}
                </p>
              </div>
            </div>
            <div className="flex gap-2 mt-4 md:mt-0">
              <Button onClick={handleStore} variant="outline">
                Xem Shop
              </Button>
              <Button>Chat Ngay</Button>
            </div>
          </div>

          {/* Product Information & Discount Codes Section */}
          <div className="flex flex-col md:flex-row gap-4">
            <div className="md:w-2/3 p-4 border rounded-2xl shadow-sm bg-white">
              <h2 className="text-lg font-semibold">MÔ TẢ SẢN PHẨM</h2>
              <p className="text-gray-600 mt-2">{productData?.description}</p>
            </div>
            <div className="md:w-1/3 p-4 border rounded-2xl shadow-sm bg-white">
              <div className="flex flex-col gap-4 overflow-auto max-h-60 mt-2">
                {discountCodes.map((item, index) => (
                  <VoucherList key={index} />
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

        {/* --- Recommend Section --- */}
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

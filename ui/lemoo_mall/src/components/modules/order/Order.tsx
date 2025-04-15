import { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { formatMoneyVND } from "@/lib/utils";
import { CartSelectType } from "@/common/type/cart.type";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { api } from "@/lib/api";
import { DataVoucher } from "@/common/type/voucher.type";
import { OrderType } from "@/common/type/order.type";
import toast from "react-hot-toast";
import { useNavigate } from "@tanstack/react-router";

type ShippingMethod = {
  id: string;
  name: string;
  cost: number;
  estTime: string;
};

type PaymentMethod = {
  id: string;
  name: string;
  icon: string;
};

// Fake Data
const shippingMethods: ShippingMethod[] = [
  {
    id: "standard",
    name: "Giao hàng tiêu chuẩn",
    cost: 30000,
    estTime: "3-5 ngày",
  },
  { id: "express", name: "Giao hàng nhanh", cost: 50000, estTime: "1-2 ngày" },
  { id: "premium", name: "Giao hàng hỏa tốc", cost: 80000, estTime: "4-6 giờ" },
];

const paymentMethods: PaymentMethod[] = [
  { id: "momo", name: "Ví MoMo", icon: "💰" },
  { id: "zalopay", name: "ZaloPay", icon: "💳" },
  { id: "COD", name: "Thanh toán khi nhận hàng", icon: "📦" },
];

// Fake Data

type OrderFormData = {
  selectedItems: { [key: string]: boolean };
};

const Order = () => {
  const navigation = useNavigate();
  const customerAdress = useSelector((state: RootState) => state.customer);
  // Đảm bảo dữ liệu không bị lỗi khi truy cập `content`
  const addresses = customerAdress?.customer?.content ?? [];
  const AddressDefault = addresses.find((item) => item.isDefault);
  console.log("Adress Default: ", AddressDefault);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vouchers, setVouchers] = useState<DataVoucher>();

  const { control, handleSubmit } = useForm<OrderFormData>({
    defaultValues: {
      selectedItems: {},
    },
  });
  const orderInfo = useSelector((state: RootState) => state.orderCart.items);

  const [products, setProducts] = useState<CartSelectType>(orderInfo);

  const [scope, animate] = useAnimate();
  const [discountCode, setDiscountCode] = useState("ABC");
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");

  useEffect(() => {
    setProducts(orderInfo);
  }, [orderInfo]);

  const handleLoadVoucher = async () => {
    try {
      const response = await api.get("/promotion/vouchers/collected");
      console.log("Voucher data:", response);
      setVouchers(response);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error loading voucher:", error);
    }
  };

  const updateQuantity = (lemooSku: string, amount: number) => {
    setProducts((prev: CartSelectType) => ({
      item: prev.item.map((product) =>
        product.lemooSku === lemooSku
          ? { ...product, quantity: Math.max(1, product.quantity + amount) }
          : product
      ),
    }));
    animate("button1", { scale: [1.1, 1] }, { duration: 0.2 });
  };

  const subtotal = products.item.reduce(
    (sum, product) => sum + product.price * product.quantity,
    0
  );

  const handleUpdateAddress = () => {
    navigation({ to: "/customer/update_address" });
  };

  const onSubmit: SubmitHandler<OrderFormData> = async (data) => {
    // Lấy các sản phẩm được chọn từ giỏ hàng
    const selectedProducts = orderInfo.item.filter(
      (item) => data.selectedItems[item.lemooSku]
    );

    // Nhóm các sản phẩm theo storeId
    const groupedByStore = selectedProducts.reduce(
      (acc, item) => {
        const storeId = item.storeId;
        if (!acc[storeId]) {
          acc[storeId] = [];
        }
        acc[storeId].push({
          lemooSku: item.lemooSku,
          quantity: item.quantity,
        });
        return acc;
      },
      {} as { [key: string]: { lemooSku: string; quantity: number }[] }
    );

    // Tạo mảng items theo định dạng ApidogModel
    const items = Object.entries(groupedByStore).map(([storeId, skus]) => ({
      storeId,
      vouchers: [], // Hiện tại chưa có logic lấy voucher, để mảng rỗng
      skus: skus.map((sku) => ({
        lemooSku: sku.lemooSku,
        quantity: products.item.find((item) => item.lemooSku === sku.lemooSku)
          ?.quantity,
      })),
    }));

    // Tạo dữ liệu đơn hàng theo cấu trúc ApidogModel
    const dataOrder = {
      shippingAddressId: AddressDefault?.id || "",
      paymentMethod: paymentMethod || "COD", // Sử dụng paymentMethod từ state, mặc định là "COD" nếu chưa chọn
      items,
    };

    try {
      const responseOrder = await api.post<OrderType>("/orders", dataOrder);

      toast.success(
        "Đặt hàng thành công!, đơn hàng sẽ sớm được giao cho đơn vị vận chuyển."
      );
    } catch (error) {
      toast.error("Hãy kiểm tra lại thông tin đơn hàng và thử lại.");
      console.error("Error placing order:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <motion.div
          ref={scope}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left Column - Cart & Discount */}
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="bg-white rounded-2xl shadow-xl h-fit lg:sticky lg:top-8"
          >
            <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl">
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                🛒 Giỏ hàng của bạn ({orderInfo.item.length})
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Products List */}
              <div className="space-y-4">
                <AnimatePresence mode="popLayout">
                  {products.item.map((product) => (
                    <motion.div
                      key={product.lemooSku}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 50 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="group bg-gray-50 rounded-xl p-4 mb-4 hover:bg-blue-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <Controller
                          name={`selectedItems.${product.lemooSku}`}
                          control={control}
                          defaultValue={false}
                          render={({ field }) => (
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={(e) => field.onChange(e.target.checked)}
                              className=" h-4 w-4 mr-2 text-blue-600 border-gray-300 focus:ring-blue-500"
                            />
                          )}
                        />
                        <div className="flex items-center gap-4">
                          {/* Thêm hình ảnh sản phẩm */}
                          <motion.img
                            src={product.image}
                            alt={product.nameSku}
                            className="w-16 h-16 rounded-lg object-cover shadow-md"
                            whileHover={{ scale: 1.05 }}
                          />
                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {product.nameSku}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {formatMoneyVND(product.price)}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <motion.div className="flex items-center bg-white rounded-full p-1 space-x-2 shadow-sm">
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(product.lemooSku, -1)
                              }
                              type="button"
                              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                            >
                              -
                            </motion.button>
                            <motion.span
                              key={product.quantity}
                              animate={{ scale: [1.2, 1] }}
                              className="w-12 text-center"
                            >
                              {product.quantity}
                            </motion.span>
                            <motion.button
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                updateQuantity(product.lemooSku, 1)
                              }
                              type="button"
                              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                            >
                              +
                            </motion.button>
                          </motion.div>
                          <motion.span
                            animate={{ color: ["#3b82f6", "#1e293b"] }}
                            transition={{ duration: 0.5 }}
                            className="font-medium text-gray-800 w-32 text-right"
                          >
                            {formatMoneyVND(product.price * product.quantity)}
                          </motion.span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
              <motion.div
                className="mt-4 text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                Voucher của bạn
                <button
                  type="button"
                  onClick={handleLoadVoucher}
                  className="text-blue-600 dark:text-blue-400 font-medium hover:underline transition-colors duration-200"
                >
                  Xem voucher
                </button>
              </motion.div>
              {/* Voucher Modal */}
              <AnimatePresence>
                {isModalOpen && (
                  <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={() => setIsModalOpen(false)}
                  >
                    <motion.div
                      className="bg-white dark:bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[80vh] overflow-y-auto shadow-xl"
                      initial={{ scale: 0.9, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.9, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      onClick={(e) => e.stopPropagation()}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                          Vouchers của bạn
                        </h3>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={() => setIsModalOpen(false)}
                          className="hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <h1 className="h-5 w-5" />
                        </Button>
                      </div>

                      {vouchers && vouchers.length > 0 ? (
                        <ul className="space-y-4">
                          {vouchers.content.map((item) => (
                            <li
                              key={item.voucher.id}
                              className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg flex justify-between items-center"
                            >
                              <input
                                type="radio"
                                name="shipping"
                                value={item.voucher.id}
                                checked={discountCode === item.voucher.id}
                                onChange={() =>
                                  setDiscountCode(item.voucher.id)
                                }
                                className="hidden"
                              />
                              <div>
                                <p className="font-medium text-gray-900 dark:text-white">
                                  Mã Voucher: {item.voucher.id}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Giảm {item.voucher.discountValue} - Hết hạn
                                  vào:
                                  {item.voucher.periodEndTime}
                                </p>
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  Loại giảm giá: {item.voucher.discountType}
                                </p>
                              </div>
                              <Button
                                type="button"
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  console.log("Apply", item.voucher.id)
                                }
                                className="text-blue-600 border-blue-600 hover:bg-blue-50"
                              >
                                Áp dụng
                              </Button>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                          Bạn chưa có voucher nào. Hãy tham gia các chương trình
                          khuyến mãi để nhận voucher nhé!
                        </p>
                      )}
                    </motion.div>
                  </motion.div>
                )}
              </AnimatePresence>
              {/* Shipping Methods */}
              <motion.div className="space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  🚚 Phương thức vận chuyển
                </h3>
                <div className="space-y-3 shipping-methods">
                  {shippingMethods.map((method) => (
                    <motion.label
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer 
          ${shippingMethod === method.id ? "border-blue-500 bg-blue-100" : "border-gray-200 hover:border-blue-300"}`}
                    >
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={shippingMethod === method.id}
                        onChange={() => setShippingMethod(method.id)}
                        className="hidden"
                      />
                      <div className="flex-1">
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">
                          {method.estTime}
                        </p>
                      </div>
                      <span className="font-semibold">
                        {formatMoneyVND(method.cost)}
                      </span>
                    </motion.label>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Shipping & Payment */}
          <motion.div
            initial={{ x: 50 }}
            animate={{ x: 0 }}
            className="bg-white rounded-2xl shadow-xl h-fit"
          >
            <div className="p-5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-2xl">
              <h2 className="text-xl font-bold text-white">
                Thông tin giao hàng
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              {AddressDefault && (
                <motion.div className="p-6 border border-gray-100 rounded-xl shadow-sm bg-white transition-all ">
                  <div className="space-y-4">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">
                      📦 Địa Chỉ Nhận Hàng
                    </h3>

                    <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm text-gray-700 space-y-3">
                      <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                        <span>Tên người nhận:</span>
                        <span>{AddressDefault.recipientName},</span>
                        <span className="text-blue-600">
                          {AddressDefault.recipientPhone}
                        </span>
                      </div>

                      <div className="space-y-1 text-base leading-relaxed">
                        <span className="font-semibold text-gray-900">
                          Địa chỉ giao hàng:
                        </span>
                        <p>
                          {AddressDefault.address.detail},{" "}
                          {AddressDefault.address.ward.name}
                        </p>
                        <p>
                          {AddressDefault.address.district.name},{" "}
                          {AddressDefault.address.province.name}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 pt-2">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-green-100 text-green-600">
                        Mặc định
                      </span>
                      <button
                        onClick={handleUpdateAddress}
                        className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                      >
                        Thay đổi địa chỉ →
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Payment Methods */}
              <motion.div className="space-y-4 payment-methods">
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  💳 Hình thức thanh toán
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {paymentMethods.map((method) => (
                    <motion.label
                      key={method.id}
                      whileHover={{ scale: 1.02 }}
                      className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl cursor-pointer 
          ${paymentMethod === method.id ? "border-blue-500 bg-blue-100" : "border-gray-200 hover:border-blue-300"}`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.id}
                        checked={paymentMethod === method.id}
                        onChange={() => setPaymentMethod(method.id)}
                        className="hidden"
                      />
                      <span className="text-2xl">{method.icon}</span>
                      <p className="text-sm text-center font-medium">
                        {method.name}
                      </p>
                    </motion.label>
                  ))}
                </div>
              </motion.div>

              {/* Order Summary */}
              <motion.div className="bg-green-50 p-6 rounded-xl space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span> {formatMoneyVND(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Giảm giá:</span>
                    <span className="text-red-500">- thiết lập sau...</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>Tính sau...</span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Tổng cộng:</span>
                    tính sau...
                  </div>
                </div>
                <motion.button
                  whileHover={{
                    scale: 1.02,
                    boxShadow: "0px 5px 15px rgba(79, 70, 229, 0.3)",
                  }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl font-semibold text-lg relative overflow-hidden"
                >
                  <span className="relative z-10">🚀 Đặt hàng ngay</span>
                  <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: "linear",
                    }}
                  />
                </motion.button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </form>
  );
};

export default Order;

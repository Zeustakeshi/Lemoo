import { useEffect, useState } from "react";
import { motion, AnimatePresence, useAnimate } from "framer-motion";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { formatMoneyVND } from "@/lib/utils";
import { CartSelectType } from "@/common/type/cart.type";
import { useForm, SubmitHandler, Controller } from "react-hook-form";

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
  { id: "cod", name: "Thanh toán khi nhận hàng", icon: "📦" },
];

const discountCodes = [
  { code: "SALE10", value: 10, type: "percent" },
  { code: "FREESHIP", value: 100, type: "ship" },
  { code: "VNXK50", value: 50000, type: "fixed" },
];
// Fake Data

type OrderFormData = {
  selectedItems: { [key: string]: boolean };
  ship: string;
  infoShip: {
    name: string;
    address: string;
    phone: string;
  };
  discount: string;
  buyMethod: string;
};

const Order = () => {
  const { control, handleSubmit } = useForm<OrderFormData>({
    defaultValues: {
      selectedItems: {},
      infoShip: { name: "", address: "", phone: "" },
      ship: "",
      discount: "",
      buyMethod: "",
    },
  });
  const orderInfo = useSelector((state: RootState) => state.orderCart.items);

  const [products, setProducts] = useState<CartSelectType>(orderInfo);

  const [scope, animate] = useAnimate();
  const [discountCode, setDiscountCode] = useState("");
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [shippingMethod, setShippingMethod] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [discountError, setDiscountError] = useState("");

  useEffect(() => {
    setProducts(orderInfo);
  }, [orderInfo]);

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

  const shippingCost =
    shippingMethods.find((m) => m.id === shippingMethod)?.cost || 0;

  const total = subtotal - appliedDiscount + shippingCost;

  const handleApplyDiscount = () => {
    const validCode = discountCodes.find((code) => code.code === discountCode);
    if (!validCode) {
      setDiscountError("Mã giảm giá không hợp lệ");
      animate(".discount-input", { x: [-5, 5, 0] }, { duration: 0.3 });
      setAppliedDiscount(0);
      return;
    }

    setDiscountError("");
    switch (validCode.type) {
      case "percent":
        setAppliedDiscount(subtotal * (validCode.value / 100));
        break;
      case "fixed":
      case "ship":
        setAppliedDiscount(validCode.value);
        break;
      default:
        setAppliedDiscount(0);
    }
  };

  const onSubmit: SubmitHandler<OrderFormData> = (data) => {
    const selectedProducts = orderInfo.item
      .filter((item) => data.selectedItems[item.lemooSku])
      .map((item) => ({
        lemooSku: item.lemooSku,
        quantity: item.quantity,
        image: item.image,
        nameSku: item.nameSku,
        price: item.price,
      }));

    console.log("Dữ liệu sau khi mua xong gửi đi:", {
      items: selectedProducts,
      infoShip: data.infoShip,
      discont: discountCode,
      shipMethod: shippingMethod,
      shipPayment: paymentMethod,
    });

    // alert(`Đặt hàng thành công! Tổng tiền: ${formatMoneyVND(total)}`);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
        <motion.div
          ref={scope}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8"
        >
          {/* Left Column - Cart & Discount */}
          <motion.div
            initial={{ x: -50 }}
            animate={{ x: 0 }}
            className="bg-white rounded-2xl shadow-xl h-fit lg:sticky lg:top-8"
          >
            <div className="p-6 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
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

              {/* Discount Code */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="bg-blue-50 p-4 rounded-xl"
              >
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    className="discount-input flex-1 p-3 border-2 border-blue-200 rounded-lg"
                    value={discountCode}
                    onChange={(e) =>
                      setDiscountCode(e.target.value.toUpperCase())
                    }
                  />
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleApplyDiscount}
                    type="button"
                    className="px-4 bg-blue-600 text-white rounded-lg font-medium"
                  >
                    Áp dụng
                  </motion.button>
                </div>
                {discountError && (
                  <p className="mt-2 text-red-500 text-sm">{discountError}</p>
                )}
              </motion.div>
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
            <div className="p-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-2xl">
              <h2 className="text-2xl font-bold text-white">
                Thông tin giao hàng
              </h2>
            </div>
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <motion.div className="space-y-4">
                <Controller
                  name="infoShip.name"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Họ và tên"
                      className="border p-2 w-full mb-2"
                    />
                  )}
                />
                <Controller
                  name="infoShip.address"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Địa chỉ"
                      className="border p-2 w-full mb-2"
                    />
                  )}
                />
                <Controller
                  name="infoShip.phone"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      placeholder="Số điện thoại"
                      className="border p-2 w-full mb-4"
                    />
                  )}
                />
              </motion.div>
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
                    <span className="text-red-500">
                      -{formatMoneyVND(appliedDiscount)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Phí vận chuyển:</span>
                    <span>{formatMoneyVND(shippingCost)} </span>
                  </div>
                  <div className="flex justify-between font-semibold border-t pt-2">
                    <span>Tổng cộng:</span>
                    <motion.span key={total} className="text-xl text-green-600">
                      {formatMoneyVND(total)}
                    </motion.span>
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

import { CartSelectType, DataTypeCart } from "@/common/type/cart.type";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { api } from "@/lib/api";
import { addCartOrder } from "@/store/order/orderSlice";
import { AppDispatch, RootState } from "@/store/store";
import { useNavigate } from "@tanstack/react-router";
import { Trash2, ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "react-hot-toast";
import { customerInfo } from "@/lib/customerInfo";
import { updateCustomer } from "@/store/customer/customerSclice";

type CartFormData = {
  selectedItems: { [key: string]: boolean };
  item: CartSelectType;
};

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigate();
  const [dataCart, setDataCart] = useState<DataTypeCart>();
  const stateCart = useSelector((state: RootState) => state.cart.cart);
  const { control, handleSubmit, watch } = useForm<CartFormData>({
    defaultValues: {
      selectedItems: {},
      item: {} as CartSelectType,
    },
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.get("/cart");
        console.log("Cart data:", data);
        setDataCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
        toast.error("Failed to load cart items");
      }
    };
    fetchData();
  }, [stateCart]);

  const onSubmit: SubmitHandler<CartFormData> = async (data) => {
    const selectedProducts =
      dataCart?.content
        ?.filter((item) => data.selectedItems[item.id])
        .map((item) => ({
          lemooSku: item.sku.lemooSku,
          quantity: item.quantity,
          image: item.sku.image,
          nameSku: item.sku.name,
          price: item.sku.price,
        })) || [];

    if (selectedProducts.length === 0) {
      toast.error("Please select at least one item");
      return;
    }
    const customerAdress = await customerInfo();

    if (!customerAdress || customerAdress.empty == true) {
      toast.error(
        "Bạn chưa thiết lập địa chỉ giao hàng. Hãy thiết lập địa chỉ giao hàng trước khi mua hàng"
      );
      dispatch(addCartOrder({ items: { item: selectedProducts } }));
      navigation({ to: "/customer" });
    } else {
      dispatch(updateCustomer(customerAdress));
      dispatch(addCartOrder({ items: { item: selectedProducts } }));
      navigation({ to: "/order" });
    }
  };

  const storeIdInfo = [
    ...new Set(dataCart?.content?.map((item) => item.storeId)),
  ];
  console.log("Store ID:", storeIdInfo);

  const selectedItems = watch("selectedItems");
  const totalSelected =
    dataCart?.content?.reduce(
      (sum, item) =>
        selectedItems[item.id] ? sum + item.sku.price * item.quantity : sum,
      0
    ) || 0;

  const handleRemoveItem = (itemId: string) => {
    // Add your remove logic here
    console.log("Xóa sản phẩm", itemId);
    toast.success("Item removed from cart");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Lemoo | Giỏ hàng
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            {dataCart?.totalElements || 0} sản phẩm trong giỏ hàng
          </p>
        </motion.div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <motion.div
              className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <AnimatePresence>
                {storeIdInfo.map((storeId) => (
                  <motion.div
                    key={storeId}
                    className="mb-6 border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.4 }}
                  >
                    <h2 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100 flex items-center gap-2">
                      <span className="flex items-center gap-2">
                        <ShoppingBag className="h-5 w-5 text-blue-500" />
                        Cửa hàng:
                      </span>
                      <span className="text-gray-600  text-lg font-medium">
                        {storeId}
                      </span>
                    </h2>

                    <ul className="space-y-4">
                      {dataCart?.content
                        .filter((item) => item.storeId === storeId)
                        .map((cart) => (
                          <motion.li
                            key={cart.id}
                            layout
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-200 shadow-sm"
                          >
                            <div className="w-8 flex-shrink-0">
                              {cart.status === "ACTIVE" ? (
                                <Controller
                                  name={`selectedItems.${cart.id}`}
                                  control={control}
                                  defaultValue={false}
                                  render={({ field }) => (
                                    <input
                                      type="checkbox"
                                      checked={field.value}
                                      onChange={(e) =>
                                        field.onChange(e.target.checked)
                                      }
                                      className="h-5 w-5 text-blue-600 rounded focus:ring-blue-500 border-gray-300"
                                    />
                                  )}
                                />
                              ) : (
                                <span className="text-red-600 font-semibold">
                                  Hết hàng
                                </span>
                              )}
                            </div>

                            <img
                              src={cart.sku.image}
                              alt={cart.sku.name}
                              className="w-24 h-24 object-cover rounded-lg shadow-sm transition-transform duration-200 hover:scale-105"
                            />

                            <div className="flex-1 min-w-0">
                              <h3 className="font-semibold text-gray-900 dark:text-white truncate">
                                {cart.sku.name}
                              </h3>
                              <div className="flex items-center gap-4 mt-2">
                                <p className="text-sm text-gray-600 dark:text-gray-400">
                                  SL: {cart.quantity}
                                </p>
                                <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                                  {new Intl.NumberFormat("vi-VN", {
                                    style: "currency",
                                    currency: "VND",
                                  }).format(cart.sku.price)}
                                </p>
                              </div>
                            </div>

                            <div className="flex items-center gap-4">
                              <span
                                className={`text-sm font-medium px-2 py-1 rounded-full ${
                                  cart.status === "OUT_OF_STOCK"
                                    ? ""
                                    : "bg-green-100 text-green-600"
                                }`}
                              >
                                {cart.status === "OUT_OF_STOCK"
                                  ? "-----"
                                  : "Còn hàng"}
                              </span>
                              <Button
                                type="button"
                                size="icon"
                                variant="ghost"
                                onClick={() => handleRemoveItem(cart.id)}
                                className="hover:bg-red-100 hover:text-red-600 transition-colors duration-200"
                              >
                                <Trash2 className="h-5 w-5" />
                              </Button>
                            </div>
                          </motion.li>
                        ))}
                    </ul>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Tính tiền */}
            <motion.div
              className="lg:col-span-1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 sticky top-6">
                <h2 className="text-xl font-semibold mb-4">Tổng Cộng</h2>
                <div className="space-y-3">
                  <div className="flex justify-between text-gray-600 dark:text-gray-400">
                    <span>Tạm tính</span>
                    <span>
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalSelected)}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Tổng</span>
                    <span className="text-blue-600">
                      {new Intl.NumberFormat("vi-VN", {
                        style: "currency",
                        currency: "VND",
                      }).format(totalSelected)}
                    </span>
                  </div>
                </div>
                <motion.button
                  type="submit"
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                  disabled={!totalSelected}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Mua Hàng
                </motion.button>
              </div>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CartPage;

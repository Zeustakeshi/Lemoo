import { CartSelectType } from "@/common/type/cart.type";
import { formatMoneyVND } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Control, Controller } from "react-hook-form";

type OrderFormData = {
    selectedItems: { [key: string]: boolean };
};

interface CartSectionProps {
    products: CartSelectType;
    control: Control<OrderFormData>;
    updateQuantity: (lemooSku: string, amount: number) => void;
    handleLoadVoucher: () => void;
}

const CartSection = ({
    products,
    control,
    updateQuantity,
    handleLoadVoucher,
}: CartSectionProps) => {
    return (
        <motion.div
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-white rounded-2xl shadow-xl h-fit lg:sticky lg:top-8"
        >
            <div className="p-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-t-2xl">
                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                    🛒 Giỏ hàng của bạn ({products.item.length})
                </h2>
            </div>
            <div className="p-6 space-y-6">
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
                                        render={({ field }) => (
                                            <input
                                                type="checkbox"
                                                checked={field.value}
                                                onChange={(e) =>
                                                    field.onChange(
                                                        e.target.checked
                                                    )
                                                }
                                                className="h-4 w-4 mr-2 text-blue-600 border-gray-300 focus:ring-blue-500"
                                            />
                                        )}
                                    />
                                    <div className="flex items-center gap-4">
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
                                                    updateQuantity(
                                                        product.lemooSku,
                                                        -1
                                                    )
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
                                                    updateQuantity(
                                                        product.lemooSku,
                                                        1
                                                    )
                                                }
                                                type="button"
                                                className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
                                            >
                                                +
                                            </motion.button>
                                        </motion.div>
                                        <motion.span
                                            animate={{
                                                color: ["#3b82f6", "#1e293b"],
                                            }}
                                            transition={{ duration: 0.5 }}
                                            className="font-medium text-gray-800 w-32 text-right"
                                        >
                                            {formatMoneyVND(
                                                product.price * product.quantity
                                            )}
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
            </div>
        </motion.div>
    );
};

export default CartSection;

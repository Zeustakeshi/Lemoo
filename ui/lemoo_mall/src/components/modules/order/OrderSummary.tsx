import { formatMoneyVND } from "@/lib/utils";
import { motion } from "framer-motion";

interface OrderSummaryProps {
    subtotal: number;
}

const OrderSummary = ({ subtotal }: OrderSummaryProps) => {
    return (
        <motion.div className="p-6 bg-green-50 rounded-xl space-y-4">
            <div className="space-y-2">
                <div className="flex justify-between">
                    <span>Tạm tính:</span>
                    <span>{formatMoneyVND(subtotal)}</span>
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
                    <span>tính sau...</span>
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
    );
};

export default OrderSummary;

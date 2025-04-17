import { ShippingOrderResponse } from "@/common/type/shipping.type";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { motion } from "framer-motion";
import { Clock, Package, Truck } from "lucide-react";

const statusLabels: Record<string, string> = {
    READY_TO_PICK: "Sẵn sàng lấy hàng",
    PICKING: "Đang lấy hàng",
    CANCEL: "Đã hủy",
    MONEY_COLLECT_PICKING: "Thu tiền khi lấy hàng",
    PICKED: "Đã lấy hàng",
    STORING: "Đang lưu kho",
    TRANSPORTING: "Đang vận chuyển",
    SORTING: "Đang phân loại",
    DELIVERING: "Đang giao hàng",
    MONEY_COLLECT_DELIVERING: "Thu tiền khi giao hàng",
    DELIVERED: "Đã giao hàng",
    DELIVERY_FAIL: "Giao hàng thất bại",
    WAITING_TO_RETURN: "Chờ hoàn trả",
    RETURN: "Hoàn trả",
    RETURN_TRANSPORTING: "Đang vận chuyển hoàn",
    RETURN_SORTING: "Đang phân loại hoàn",
    RETURNING: "Đang hoàn trả",
    RETURN_FAIL: "Hoàn trả thất bại",
    RETURNED: "Đã hoàn trả",
    EXCEPTION: "Ngoại lệ",
    DAMAGE: "Hàng bị hư hỏng",
    LOST: "Hàng bị thất lạc",
};

const statusStyles: Record<string, string> = {
    DELIVERED: "bg-green-100 text-green-700 ring-green-200",
    PICKED: "bg-blue-100 text-blue-700 ring-blue-200",
    CANCEL: "bg-red-100 text-red-700 ring-red-200",
    DELIVERY_FAIL: "bg-red-100 text-red-700 ring-red-200",
    default: "bg-gray-100 text-gray-700 ring-gray-200",
};

function formatDate(dateString: string): string {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    const hh = String(date.getHours()).padStart(2, "0");
    const min = String(date.getMinutes()).padStart(2, "0");
    return `${hh}:${min} ${dd}/${mm}/${yyyy}`;
}

type Props = {
    shippingOrder: ShippingOrderResponse;
};

export default function OrderTracking({ shippingOrder }: Props) {
    // Sắp xếp logs theo thời gian, mới nhất lên đầu
    const sortedLogs = [...shippingOrder.logs].sort(
        (a, b) =>
            new Date(b.updatedDate).getTime() -
            new Date(a.updatedDate).getTime()
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12 px-4">
            <motion.h1
                className="text-3xl font-bold text-center text-primary dark:text-white mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                Theo Dõi Đơn Hàng
            </motion.h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <Card className="max-w-3xl mx-auto bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-2xl border-0">
                    <CardContent className="p-8 space-y-8">
                        {/* Order Header and Info - Hàng ngang */}
                        <div className="flex flex-col sm:flex-row justify-between items-start gap-6">
                            <div className="flex-1 space-y-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <Package className="w-4 h-4" />
                                    Mã đơn hàng
                                </p>
                                <p className="text-xl font-semibold text-gray-900 dark:text-white">
                                    {shippingOrder.shippingOrderCode}
                                </p>
                            </div>
                            <div className="flex-1 space-y-2">
                                <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2">
                                    <Truck className="w-4 h-4" />
                                    Thông tin đơn hàng
                                </p>
                                <p className="text-base font-medium text-gray-800 dark:text-gray-200">
                                    {shippingOrder.content}
                                </p>
                            </div>
                            <div
                                className={`text-sm font-medium px-4 py-2 rounded-full ring-1 transition-all duration-300 self-start sm:self-center ${
                                    statusStyles[shippingOrder.status] ||
                                    statusStyles.default
                                }`}
                            >
                                {statusLabels[shippingOrder.status] ||
                                    shippingOrder.status}
                            </div>
                        </div>

                        <Separator className="bg-gray-200 dark:bg-gray-700" />

                        {/* Estimated Delivery */}
                        <div className="bg-gradient-to-r from-primary/5 to-transparent p-6 rounded-xl">
                            <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-2 mb-2">
                                <Clock className="w-4 h-4" />
                                Dự kiến giao hàng
                            </p>
                            <p className="text-lg font-semibold text-gray-900 dark:text-white">
                                {formatDate(
                                    shippingOrder.leadtimeOrder
                                        .from_estimate_date
                                )}
                            </p>
                        </div>

                        <Separator className="bg-gray-200 dark:bg-gray-700" />

                        {/* Order History Timeline */}
                        <div>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                                Lịch sử đơn hàng
                            </p>
                            <div className="h-[600px] overflow-y-auto pr-4 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 scrollbar-track-gray-100 dark:scrollbar-track-gray-800">
                                <div className="space-y-6 relative">
                                    {sortedLogs.map((log, index) => (
                                        <motion.div
                                            key={index}
                                            className="relative pl-8"
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.2 }}
                                        >
                                            <div className="absolute left-0 top-1 w-4 h-4 bg-primary rounded-full border-2 border-white dark:border-gray-800" />
                                            <div className="absolute left-[7px] top-4 bottom-0 w-0.5 bg-primary/20 -z-10" />
                                            <div className="bg-white dark:bg-gray-700 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
                                                <p className="font-medium text-gray-800 dark:text-gray-200">
                                                    {statusLabels[log.status] ||
                                                        log.status}
                                                </p>
                                                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                                    {formatDate(
                                                        log.updatedDate
                                                    )}
                                                </p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}

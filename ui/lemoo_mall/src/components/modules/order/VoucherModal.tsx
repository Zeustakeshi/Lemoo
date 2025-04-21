import { DataVoucher } from "@/common/type/voucher.type";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";

interface VoucherModalProps {
    isOpen: boolean;
    vouchers?: DataVoucher;
    discountCode: string;
    onClose: () => void;
    onSelectVoucher: (voucherId: string) => void;
}

const VoucherModal = ({
    isOpen,
    vouchers,
    discountCode,
    onClose,
    onSelectVoucher,
}: VoucherModalProps) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
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
                                onClick={onClose}
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
                                            name="voucher"
                                            value={item.voucher.id}
                                            checked={
                                                discountCode === item.voucher.id
                                            }
                                            onChange={() =>
                                                onSelectVoucher(item.voucher.id)
                                            }
                                            className="hidden"
                                        />
                                        <div>
                                            <p className="font-medium text-gray-900 dark:text-white">
                                                Mã Voucher: {item.voucher.id}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Giảm{" "}
                                                {item.voucher.discountValue} -
                                                Hết hạn vào:{" "}
                                                {item.voucher.periodEndTime}
                                            </p>
                                            <p className="text-sm text-gray-600 dark:text-gray-400">
                                                Loại giảm giá:{" "}
                                                {item.voucher.discountType}
                                            </p>
                                        </div>
                                        <Button
                                            type="button"
                                            size="sm"
                                            variant="outline"
                                            onClick={() =>
                                                onSelectVoucher(item.voucher.id)
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
                                Bạn chưa có voucher nào. Hãy tham gia các chương
                                trình khuyến mãi để nhận voucher nhé!
                            </p>
                        )}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VoucherModal;

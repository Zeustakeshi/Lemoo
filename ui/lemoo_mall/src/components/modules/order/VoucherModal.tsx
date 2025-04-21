import { DataVoucher } from "@/common/type/voucher.type";
import { AnimatePresence, motion } from "framer-motion";

interface VoucherModalProps {
    isOpen: boolean;
    vouchers?: DataVoucher;
    onClose: () => void;
}

const VoucherModal = ({ isOpen, vouchers, onClose }: VoucherModalProps) => {
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
                        <p className="text-gray-500 dark:text-gray-400 text-center py-4">
                            Bạn chưa có voucher nào. Hãy tham gia các chương
                            trình khuyến mãi để nhận voucher nhé!
                        </p>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default VoucherModal;

import { motion } from "framer-motion";

interface AddressSectionProps {
    defaultAddress?: any;
    onUpdateAddress: () => void;
}

const AddressSection = ({
    defaultAddress,
    onUpdateAddress,
}: AddressSectionProps) => {
    return (
        <>
            <div className="p-5 bg-gradient-to-r from-green-600 to-emerald-600 rounded-t-2xl">
                <h2 className="text-xl font-bold text-white">
                    Thông tin giao hàng
                </h2>
            </div>
            {defaultAddress && (
                <motion.div className="p-6 border border-gray-100 rounded-xl shadow-sm bg-white transition-all">
                    <div className="space-y-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2">
                            📦 Địa Chỉ Nhận Hàng
                        </h3>
                        <div className="p-4 border border-gray-300 rounded-lg bg-white shadow-sm text-gray-700 space-y-3">
                            <div className="flex items-center gap-2 text-lg font-semibold text-gray-900">
                                <span>Tên người nhận:</span>
                                <span>{defaultAddress.recipientName},</span>
                                <span className="text-blue-600">
                                    {defaultAddress.recipientPhone}
                                </span>
                            </div>
                            <div className="space-y-1 text-base leading-relaxed">
                                <span className="font-semibold text-gray-900">
                                    Địa chỉ giao hàng:
                                </span>
                                <p>
                                    {defaultAddress.address.detail},{" "}
                                    {defaultAddress.address.ward.name}
                                </p>
                                <p>
                                    {defaultAddress.address.district.name},{" "}
                                    {defaultAddress.address.province.name}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-sm font-semibold bg-green-100 text-green-600">
                                Mặc định
                            </span>
                            <button
                                onClick={onUpdateAddress}
                                className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200"
                            >
                                Thay đổi địa chỉ →
                            </button>
                        </div>
                    </div>
                </motion.div>
            )}
        </>
    );
};

export default AddressSection;

import { motion } from "framer-motion";

interface PaymentMethod {
    id: string;
    name: string;
    icon: string;
}

interface PaymentSectionProps {
    paymentMethods: PaymentMethod[];
    selectedPayment: string;
    onPaymentChange: (id: string) => void;
}

const PaymentSection = ({
    paymentMethods,
    selectedPayment,
    onPaymentChange,
}: PaymentSectionProps) => {
    return (
        <motion.div className="p-6 space-y-4 payment-methods">
            <h3 className="text-lg font-semibold flex items-center gap-2">
                💳 Hình thức thanh toán
            </h3>
            <div className="grid grid-cols-2 gap-3">
                {paymentMethods.map((method) => (
                    <motion.label
                        key={method.id}
                        whileHover={{ scale: 1.02 }}
                        className={`flex flex-col items-center gap-2 p-4 border-2 rounded-xl cursor-pointer 
                            ${selectedPayment === method.id ? "border-blue-500 bg-blue-100" : "border-gray-200 hover:border-blue-300"}`}
                    >
                        <input
                            type="radio"
                            name="payment"
                            value={method.id}
                            checked={selectedPayment === method.id}
                            onChange={() => onPaymentChange(method.id)}
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
    );
};

export default PaymentSection;

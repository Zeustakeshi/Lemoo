import { CartSelectType } from "@/common/type/cart.type";
import { OrderType } from "@/common/type/order.type";
import { DataVoucher } from "@/common/type/voucher.type";
import { api } from "@/lib/api";
import { RootState } from "@/store/store";
import { useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import AddressSection from "./AddressSection";
import CartSection from "./CartSection";
import OrderSummary from "./OrderSummary";
import PaymentSection from "./PaymentSection";
import VoucherModal from "./VoucherModal";

type PaymentMethod = {
    id: string;
    name: string;
    icon: string;
};

const paymentMethods: PaymentMethod[] = [
    { id: "momo", name: "Ví MoMo", icon: "💰" },
    { id: "COD", name: "Thanh toán khi nhận hàng", icon: "📦" },
];

type OrderFormData = {
    selectedItems: { [key: string]: boolean };
};

const Order = () => {
    const navigate = useNavigate();
    const customerAddress = useSelector((state: RootState) => state.customer);
    const addresses = customerAddress?.customer?.content ?? [];
    const defaultAddress = addresses.find((item) => item.isDefault);

    const orderInfo = useSelector((state: RootState) => state.orderCart.items);
    const [products, setProducts] = useState<CartSelectType>(orderInfo);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [vouchers, setVouchers] = useState<DataVoucher>();
    const [discountCode, setDiscountCode] = useState("ABC");
    const [paymentMethod, setPaymentMethod] = useState("COD");

    // Initialize form with all items selected by default
    const { control, handleSubmit, setValue } = useForm<OrderFormData>({
        defaultValues: {
            selectedItems: orderInfo.item.reduce(
                (acc, item) => ({
                    ...acc,
                    [item.lemooSku]: true,
                }),
                {}
            ),
        },
    });

    const router = useRouter();

    useEffect(() => {
        setProducts(orderInfo);
        // Update selected items when orderInfo changes
        orderInfo.item.forEach((item) => {
            setValue(`selectedItems.${item.lemooSku}`, true);
        });
    }, [orderInfo, setValue]);

    const handleLoadVoucher = async () => {
        try {
            const response = await api.get("/promotion/vouchers/collected");
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
                    ? {
                          ...product,
                          quantity: Math.max(1, product.quantity + amount),
                      }
                    : product
            ),
        }));
    };

    const subtotal = products.item.reduce(
        (sum, product) => sum + product.price * product.quantity,
        0
    );

    const onSubmit: SubmitHandler<OrderFormData> = async (data) => {
        const selectedProducts = orderInfo.item.filter(
            (item) => data.selectedItems[item.lemooSku]
        );

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

        const items = Object.entries(groupedByStore).map(([storeId, skus]) => ({
            storeId,
            vouchers: [],
            skus: skus.map((sku) => ({
                lemooSku: sku.lemooSku,
                quantity: products.item.find(
                    (item) => item.lemooSku === sku.lemooSku
                )?.quantity,
            })),
        }));

        const dataOrder = {
            shippingAddressId: defaultAddress?.id || "",
            paymentMethod,
            items,
        };

        try {
            const responseOrder = await api.post<OrderType>(
                "/orders",
                dataOrder
            );
            toast.success("Đặt hàng thành công!");
            router.navigate({ to: "/order/my-order" });
        } catch (error) {
            toast.error("Hãy kiểm tra lại thông tin đơn hàng và thử lại.");
            console.error("Error placing order:", error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-8 px-4">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
                    <CartSection
                        products={products}
                        control={control}
                        updateQuantity={updateQuantity}
                        handleLoadVoucher={handleLoadVoucher}
                    />
                    <div className="bg-white rounded-2xl shadow-xl h-fit">
                        <AddressSection
                            defaultAddress={defaultAddress}
                            onUpdateAddress={() =>
                                navigate({ to: "/customer/update_address" })
                            }
                        />
                        <PaymentSection
                            paymentMethods={paymentMethods}
                            selectedPayment={paymentMethod}
                            onPaymentChange={setPaymentMethod}
                        />
                        <OrderSummary subtotal={subtotal} />
                    </div>
                </div>
            </div>
            <VoucherModal
                isOpen={isModalOpen}
                vouchers={vouchers}
                discountCode={discountCode}
                onClose={() => setIsModalOpen(false)}
                onSelectVoucher={setDiscountCode}
            />
        </form>
    );
};

export default Order;

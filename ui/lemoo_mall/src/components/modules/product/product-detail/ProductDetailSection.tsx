import { AddToCart } from "@/api/cart.api";
import { CartItemType } from "@/common/type/cart.type";
import { Button } from "@/components/ui/button";
import Ratting from "@/components/ui/ratting";
import { useProductDetail } from "@/context/ProductDetailContext";
import { cn, formatMoneyVND } from "@/lib/utils";
import { addCartItem } from "@/store/cart/cartSlice";
import { useState } from "react";
import { useDispatch } from "react-redux";

const ProductDetailsSection = ({}: {}) => {
    const [quantity, setQuantity] = useState(1);
    const { selectedSku, setSelectedSku } = useProductDetail();

    const dispatch = useDispatch();

    const { productDetail } = useProductDetail();

    // Add product to cart
    const addToCart = async () => {
        const dataCart: CartItemType = {
            id: productDetail?.id ?? "",
            name: productDetail?.name ?? "",
            storeId: productDetail?.storeId ?? "",
            skus: [
                {
                    lemooSku: selectedSku?.lemooSku ?? "",
                    nameSku: selectedSku?.productName ?? "",
                    productId: productDetail?.id ?? "",
                    image: productDetail?.images?.[0] ?? "",
                    quantity,
                    price: selectedSku?.discount ?? selectedSku?.price ?? 0,
                },
            ],
        };

        try {
            const res = await AddToCart(selectedSku?.lemooSku ?? "", quantity);
            dispatch(addCartItem(dataCart));
            console.log("Added to cart successfully!", res);
        } catch (e) {
            console.error("Error adding to cart:", e);
        }
    };

    // Handle quantity increment
    const handleIncrease = () => setQuantity((prev) => prev + 1);

    // Handle quantity decrement
    const handleDecrease = () =>
        setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

    return (
        <section
            className="col-span-1 md:col-span-7 bg-white rounded-2xl shadow-lg p-8 flex flex-col gap-6"
            aria-label="Product Details"
        >
            {/* Product Name */}
            <h1 className="text-2xl font-semibold text-gray-800">
                {productDetail?.name}
            </h1>

            {/* Product Price */}
            <div className="text-2xl font-semibold">
                {selectedSku && (
                    <div className="flex items-center gap-2">
                        <span className="text-primary ">
                            {formatMoneyVND(selectedSku.originPrice)}
                        </span>
                    </div>
                )}
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center gap-4">
                <span className="font-semibold">Số lượng:</span>
                <div className="flex items-center border rounded-lg">
                    <Button
                        variant="outline"
                        onClick={handleDecrease}
                        className="px-3 py-1"
                    >
                        -
                    </Button>
                    <input
                        type="text"
                        value={quantity}
                        readOnly
                        className="w-12 text-center border-none outline-none"
                    />
                    <Button
                        variant="outline"
                        onClick={handleIncrease}
                        className="px-3 py-1"
                    >
                        +
                    </Button>
                </div>
            </div>

            {/* Product Rating */}
            <Ratting
                value={productDetail?.ratting ?? 0}
                readOnly
                className="my-1"
                size={100}
            />

            {/* SKU Selection */}
            <div className="flex flex-wrap gap-2" aria-label="Select SKU">
                {productDetail?.skus.map((sku: any) => {
                    return (
                        <Button
                            key={sku.lemooSku}
                            variant="outline"
                            onClick={() => setSelectedSku(sku)}
                            className={cn(
                                "px-6 py-3 min-w-[3rem] font-semibold rounded-lg hover:bg-gray-200 transition duration-300",
                                {
                                    "bg-primary text-white hover:bg-primary hover:text-white":
                                        selectedSku?.lemooSku == sku.lemooSku,
                                }
                            )}
                        >
                            {sku.name}
                        </Button>
                    );
                })}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2">
                <Button className="px-6 py-3 bg-gray-700 text-white font-semibold rounded-3xl hover:bg-blue-600 transition duration-300">
                    Mua ngay
                </Button>
                <Button
                    onClick={addToCart}
                    variant="outline"
                    className="px-6 py-3 border border-gray-800 text-gray-800 font-semibold rounded-3xl hover:bg-gray-200 transition duration-300"
                >
                    Thêm vào giỏ hàng
                </Button>
            </div>
        </section>
    );
};

export default ProductDetailsSection;

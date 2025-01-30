import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

type Props = {
    quantity: number;
    cartItemId: string;
    skuCode: string;
};

const CartItemQuantity = ({ quantity, cartItemId, skuCode }: Props) => {
    const [quantityValue, setQuantityValue] = useState<number>(
        () => quantity ?? 0
    );

    const handleIncreaseQuantity = () => {
        setQuantityValue((q) => q + 1);
    };

    const handleDecreaseQuantity = () => {
        if (quantityValue <= 0) return;
        setQuantityValue((q) => q - 1);
    };

    return (
        <div className="col-span-2 flex justify-end items-center gap-2 max-w-[250px]">
            <Button onClick={handleDecreaseQuantity} variant="secondary">
                -
            </Button>
            <Input
                min={0}
                max={10000}
                type="number"
                value={quantityValue}
                onChange={(e) => setQuantityValue(parseInt(e.target.value))}
            ></Input>
            <Button onClick={handleIncreaseQuantity} variant="secondary">
                +
            </Button>
        </div>
    );
};

export default CartItemQuantity;

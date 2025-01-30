import Button from "@/components/ui/Button";
import { Feather } from "@expo/vector-icons";
import React from "react";

type Props = {};

const Cart = (props: Props) => {
    return (
        <Button
            variant="ghost"
            className="p-3 shadow-2xl shadow-slate-500 bg-white"
        >
            <Feather name="shopping-cart" size={20} color="#004CFF" />
        </Button>
    );
};

export default Cart;

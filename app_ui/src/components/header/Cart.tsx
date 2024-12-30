import { Feather } from "@expo/vector-icons";
import React from "react";
import Button from "../ui/Button";

type Props = {};

const Cart = (props: Props) => {
    return (
        <Button
            variant="ghost"
            className="p-4 shadow-2xl shadow-slate-500 bg-white"
        >
            <Feather name="shopping-cart" size={20} color="#004CFF" />
        </Button>
    );
};

export default Cart;

import { DataTypeCart } from "@/common/type/cart.type";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { api } from "@/lib/api";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

const CartSheet = () => {
  const [dataCart, setDataCart] = useState<DataTypeCart>();
  const stateCart = useSelector((state: RootState) => state.cart.cart);

  const navigation = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await api.get("/cart");
        setDataCart(data);
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };
    fetchData();
  }, [stateCart]);

  const handleToggleCart = () => {
    navigation({ to: "/cart" });
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          onClick={handleToggleCart}
          size="icon"
          variant="ghost"
          className="relative group"
        >
          <ShoppingBag className="h-5 w-5 text-gray-600 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white" />
          {dataCart?.totalElements ? (
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-xs flex items-center justify-center rounded-full translate-x-1/2 -translate-y-1/2">
              {dataCart.totalElements}
            </span>
          ) : null}
        </Button>
      </SheetTrigger>
    </Sheet>
  );
};

export default CartSheet;

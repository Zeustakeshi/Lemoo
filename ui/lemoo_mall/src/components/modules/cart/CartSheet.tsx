import { CART_STORAGE_KEY } from "@/common/constants/cart";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useAuth } from "@/context/AuthContext";
import { ShoppingBag } from "lucide-react";
import { useEffect, useState } from "react";

const CartSheet = () => {
  const { cartInfo, removeFromCartContext } = useAuth();
  const [localCart, setLocalCart] = useState(cartInfo || []);
  useEffect(() => {
    const storedCart = localStorage.getItem(CART_STORAGE_KEY);
    if (storedCart) {
      setLocalCart(JSON.parse(storedCart));
    }
  }, [cartInfo]); // Cập nhật state nếu cartInfo thay đổi

  const getTotalQuantity = () => {
    return (
      localCart?.reduce((total, cart) => {
        return (
          total +
          cart.items.reduce((itemTotal, item) => {
            return (
              itemTotal +
              item.skus.reduce((skuTotal, sku) => skuTotal + sku.quantity, 0)
            );
          }, 0)
        );
      }, 0) || 0
    );
  };

  const getTotalPrice = () => {
    return (
      localCart?.reduce((total, cart) => {
        return (
          total +
          cart.items.reduce((itemTotal, item) => {
            return (
              itemTotal +
              item.skus.reduce(
                (skuTotal, sku) => skuTotal + sku.quantity * sku.price,
                0
              )
            );
          }, 0)
        );
      }, 0) || 0
    );
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="  [&_svg]:size-6 [&_svg]:shrink-0 dark:[&_svg]:text-white "
        >
          {getTotalQuantity() > 0 && (
            <span className="absolute ml-10 mt-4 mr-4 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {getTotalQuantity()}
            </span>
          )}
          <ShoppingBag />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col min-w-[250px]">
        <SheetHeader>
          <SheetTitle className="">Giỏ hàng của tôi </SheetTitle>
          <SheetDescription className="text-justify">
            Các sản phẩm được thêm vào giỏ hàng sẽ được hiển thị tại đây
          </SheetDescription>
        </SheetHeader>
        <div className=" flex-1 w-full">
          <div className="p-4 border rounded-lg shadow bg-white">
            {localCart?.length === 0 ? (
              <p className="text-gray-500">Giỏ hàng trống.</p>
            ) : (
              <ul>
                {localCart?.map((cart) =>
                  cart.items.map((item) => (
                    <li key={item.id}>
                      {item.skus.map((sku) => (
                        <div
                          key={sku.lemooSku}
                          className="flex items-center space-x-2"
                        >
                          <img
                            src={sku.image}
                            alt={sku.lemooSku}
                            className="w-16 h-16 object-cover rounded-lg"
                          />
                          <div>
                            <p className="text-sm font-semibold">
                              {sku.nameSku}
                            </p>
                            <p className="text-sm text-gray-500">
                              Số lượng: {sku.quantity}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              removeFromCartContext(
                                item.id,
                                cart.id,
                                sku.lemooSku
                              )
                            }
                          >
                            Xóa
                          </Button>
                        </div>
                      ))}
                    </li>
                  ))
                )}
              </ul>
            )}
          </div>
        </div>
        <SheetFooter className="flex-none block dark:text-white">
          <Separator className="mb-3"></Separator>
          <h5 className="font-semibold">
            Tổng thanh toán:{" "}
            <span className="text-lg text-primary">
              {getTotalPrice().toLocaleString()} vnđ
            </span>
          </h5>
          <Button className="w-full mt-4">Thanh toán</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;

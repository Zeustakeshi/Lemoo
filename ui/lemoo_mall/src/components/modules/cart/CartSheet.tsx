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
import {
  getTotalPrice,
  getTotalQuantity,
  removeCartItemSku,
} from "@/store/cart/cartSlice";
import { AppDispatch, RootState } from "@/store/store";

import { ShoppingBag } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

const CartSheet = () => {
  const cartInfo = useSelector((state: RootState) => state.cart);

  const dispatch = useDispatch<AppDispatch>();

  const totalQuantity = useSelector(getTotalQuantity);
  const totalPrice = useSelector(getTotalPrice);

  console.log("**dataCart info: ", cartInfo);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
          className="  [&_svg]:size-6 [&_svg]:shrink-0 dark:[&_svg]:text-white "
        >
          {totalQuantity > 0 && (
            <span className="absolute ml-10 mt-4 mr-4 w-4 h-4 bg-red-500 text-white text-xs flex items-center justify-center rounded-full">
              {totalQuantity}
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
            {cartInfo?.cart?.items.length === 0 ? (
              <p className="text-gray-500">Giỏ hàng trống.</p>
            ) : (
              <ul>
                {cartInfo?.cart?.items.map((cart) => (
                  <div key={cart.id}>
                    <li> {cart.name}</li>
                    <li>
                      {cart.skus.map((sku) => (
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
                              dispatch(
                                removeCartItemSku({
                                  cartItemId: cart.id,
                                  skuCode: sku.lemooSku,
                                })
                              )
                            }
                          >
                            Xóa
                          </Button>
                        </div>
                      ))}
                    </li>
                  </div>
                ))}
              </ul>
            )}
          </div>
        </div>
        <SheetFooter className="flex-none block dark:text-white">
          <Separator className="mb-3"></Separator>
          <h5 className="font-semibold">
            Tổng thanh toán:{" "}
            <span className="text-lg text-primary">
              {totalPrice.toLocaleString()} vnđ
            </span>
          </h5>
          <Button className="w-full mt-4">Thanh toán</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;

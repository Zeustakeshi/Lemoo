import { CartSelectType, DataTypeCart } from "@/common/type/cart.type";
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
import { api } from "@/lib/api";
import { ShoppingBag, Trash2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store/store";

import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { addCartOrder } from "@/store/order/orderSlice";

type CartFormData = {
  selectedItems: { [key: string]: boolean };
  item: CartSelectType;
};

const CartSheet = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [dataCart, setDataCart] = useState<DataTypeCart>();
  const stateCart = useSelector((state: RootState) => state.cart.cart);
  const { control, handleSubmit, watch } = useForm<CartFormData>({
    defaultValues: {
      selectedItems: {},
      item: {} as CartSelectType,
    },
  });

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

  const onSubmit: SubmitHandler<CartFormData> = async (data) => {
    const selectedProducts =
      dataCart?.content
        ?.filter((item) => data.selectedItems[item.id])
        .map((item) => ({
          lemooSku: item.sku.lemooSku,
          quantity: item.quantity,
          image: item.sku.image,
          nameSku: item.sku.name,
          price: item.sku.price,
        })) || [];

    console.log("Dữ liệu chuyển qua Order:", { items: selectedProducts });
    dispatch(addCartOrder({ items: { item: selectedProducts } }));
    navigation({ to: "/cart" });
  };

  const selectedItems = watch("selectedItems");
  const totalSelected = dataCart?.content?.reduce(
    (sum, item) => (selectedItems[item.id] ? sum + item.sku.price : sum),
    0
  );

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="relative group">
          <ShoppingBag className="h-5 w-5 text-gray-600 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white" />
          {dataCart?.totalElements ? (
            <span className="absolute top-0 right-0 w-4 h-4 bg-primary text-white text-xs flex items-center justify-center rounded-full translate-x-1/2 -translate-y-1/2">
              {dataCart.totalElements}
            </span>
          ) : null}
        </Button>
      </SheetTrigger>

      <SheetContent className="w-[380px] flex flex-col bg-white dark:bg-gray-950">
        <SheetHeader className="pb-3">
          <SheetTitle className="text-xl font-medium text-gray-900 dark:text-white">
            Giỏ hàng
          </SheetTitle>
          <SheetDescription className="text-sm text-gray-500 dark:text-gray-400">
            {dataCart?.totalElements || 0} sản phẩm trong giỏ
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex-1 flex flex-col"
        >
          <div className="flex-1 overflow-hidden">
            {dataCart?.content?.length ? (
              <ul className="space-y-3 max-h-[65vh] px-2 py-4 overflow-y-auto">
                {dataCart.content
                  .sort((a, b) => a.storeId.localeCompare(b.storeId))
                  .map((cart) => (
                    <li
                      key={cart.id}
                      className="flex items-center gap-3 p-3 border rounded-lg bg-gray-50 dark:bg-gray-900"
                    >
                      <Controller
                        name={`selectedItems.${cart.id}`}
                        control={control}
                        defaultValue={false}
                        render={({ field }) => (
                          <input
                            type="checkbox"
                            checked={field.value}
                            onChange={(e) => field.onChange(e.target.checked)}
                            className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                        )}
                      />
                      <img
                        src={cart.sku.image}
                        alt={cart.sku.name}
                        className="w-16 h-16 object-cover rounded-md"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {cart.sku.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          SL: {cart.quantity}
                        </p>
                        <p className="text-xs text-gray-500">
                          Giá:{" "}
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(cart.sku.price)}
                        </p>
                        <span className="text-xs text-gray-500">
                          Store: {cart.storeId}
                        </span>
                      </div>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-gray-500 hover:text-red-500 dark:hover:text-red-400"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <ShoppingBag className="h-12 w-12 text-gray-300" />
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Chưa có sản phẩm nào
                </p>
              </div>
            )}
          </div>

          <SheetFooter className="pt-4">
            <div className="w-full space-y-3">
              <Separator />

              <Button
                type="submit"
                className="w-full h-10 bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
                disabled={!totalSelected}
              >
                Đặt hàng
              </Button>
            </div>
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default CartSheet;

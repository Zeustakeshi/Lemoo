import { Separator } from "@/components/ui/separator";
import { calculateTotalSku, formatMoneyVND } from "@/lib/utils";
import { selectCart } from "@/store/cart/cartSlice";
import { useSelector } from "react-redux";

type Props = {};

const CartOrderInfo = (props: Props) => {
    const { selectedCartItems, cart } = useSelector(selectCart);

    return (
        <div>
            <h4 className="font-semibold text-lg ">Thông tin đơn hàng</h4>
            <div className="my-3 space-y-2">
                <p className="flex justify-between items-center ">
                    <span className="text-muted-foreground text-sm">
                        Tạm tính ({calculateTotalSku(selectedCartItems)} sản
                        phẩm)
                    </span>
                    <span className="">{formatMoneyVND(38000)}</span>
                </p>
                <p className="flex justify-between items-center ">
                    <span className="text-muted-foreground text-sm">
                        Phí vận chuyển
                    </span>
                    <span className="">{formatMoneyVND(2000)}</span>
                </p>
            </div>
            <Separator className="my-2"></Separator>
            <div className="flex justify-between items-center">
                <p className=" font-semibold">Tổng cộng: </p>
                <p className="text-primary font-semibold">
                    {formatMoneyVND(40000)}
                </p>
            </div>
        </div>
    );
};

export default CartOrderInfo;

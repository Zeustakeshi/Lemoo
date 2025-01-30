import ShippingSetting from "@/components/shipping/ShippingSetting";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import CartOrderInfo from "./CartOrderInfo";

type Props = {};

const CartInfo = (props: Props) => {
    return (
        <div className=" h-max min-h-[600px] border-l pl-4">
            <ShippingSetting></ShippingSetting>
            <Separator className="my-4"></Separator>
            <CartOrderInfo></CartOrderInfo>
            <Button className="w-full mt-8">Thanh toán</Button>
        </div>
    );
};

export default CartInfo;

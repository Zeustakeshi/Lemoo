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
import { ShoppingBag } from "lucide-react";

type Props = {};

const CartSheet = (props: Props) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    size="icon"
                    variant="ghost"
                    className="  [&_svg]:size-6 [&_svg]:shrink-0 dark:[&_svg]:text-white "
                >
                    <ShoppingBag />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col min-w-[250px]">
                <SheetHeader>
                    <SheetTitle className="">Giỏ hàng của tôi</SheetTitle>
                    <SheetDescription className="text-justify">
                        Các sản phẩm được thêm vào giỏ hàng sẽ được hiển thị tại
                        đây
                    </SheetDescription>
                </SheetHeader>
                <div className=" flex-1 w-full">1</div>
                <SheetFooter className="flex-none block dark:text-white">
                    <Separator className="mb-3"></Separator>
                    <h5 className="font-semibold">
                        Tổng thanh toán:{" "}
                        <span className="text-lg text-primary">1000vnđ</span>
                    </h5>
                    <Button className="w-full mt-4">Thanh toán</Button>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};

export default CartSheet;

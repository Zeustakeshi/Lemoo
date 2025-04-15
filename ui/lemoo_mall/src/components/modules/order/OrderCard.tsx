import { getStoreOverviewById } from "@/api/store.api";
import { OrderStatus } from "@/common/enum/order.enum";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { getOderStatusColor } from "@/lib/order";
import { cn, formatMoneyVND } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { Trash2 } from "lucide-react";

type Props = {
    orderId: string;
    items: {
        lemooSku: string;
        name: string;
        image: string;
        quantity: number;
        price: number;
    }[];
    total: number;
    status: OrderStatus;
    orderDate: string;
    storeId: string;
};

const OrderCard = ({
    items,
    orderDate,
    orderId,
    status,
    total,
    storeId,
}: Props) => {
    const { data: store } = useQuery({
        queryKey: ["store-overview", storeId],
        queryFn: () => getStoreOverviewById(storeId),
    });

    const router = useRouter();

    return (
        <div className="my-3 border rounded-md p-3 shadow-sm">
            <div className=" flex justify-between items-center">
                <p className="px-3 py-2 rounded-xl bg-slate-100 w-max">
                    <span className="font-semibold">Mã đơn: </span>
                    <span className="text-primary font-semibold">
                        {orderId}
                    </span>
                </p>
                <Button
                    onClick={() =>
                        router.navigate({
                            to: `/order/tracking/${orderId}`,
                        })
                    }
                >
                    Theo dõi đơn hàng
                </Button>
            </div>

            {store && (
                <div className="my-2 flex gap-2 items-center">
                    <h3>
                        <span className="font-semibold">Cửa hàng: </span>
                        <span className="text-primary font-semibold">
                            {" "}
                            {store.name}
                        </span>
                    </h3>
                </div>
            )}

            {items.map((item) => (
                <div key={item.lemooSku}>
                    <Separator className="my-2"></Separator>
                    <div className="flex items-center justify-between">
                        <div className="flex justify-start items-center gap-5">
                            <div className="aspect-square w-[80px] rounded-md overflow-hidden">
                                <img
                                    src={item.image}
                                    className="w-full h-full object-cover"
                                    alt=""
                                />
                            </div>
                            <div className="flex flex-col justify-start items-start py-2">
                                <h3 className="text-lg font-semibold">
                                    {item.name}
                                </h3>
                                <p className="text-muted-foreground font-medium">
                                    Đỏ - xl
                                </p>
                            </div>
                        </div>
                        <div>
                            <p className="my-2 space-x-2">
                                <span className="text-muted-foreground">
                                    Số lượng:
                                </span>
                                <span className="font-semibold text-primary">
                                    {item.quantity}
                                </span>
                            </p>
                            <p className=" my-2 space-x-2">
                                <span className="text-muted-foreground">
                                    Giá:
                                </span>
                                <span className="font-semibold text-primary">
                                    {formatMoneyVND(item.price)}
                                </span>
                            </p>
                        </div>
                        <div
                            className={cn(
                                "rounded-full px-3 py-1 text-white font-semibold text-sm select-none"
                            )}
                            style={{
                                background: getOderStatusColor(status),
                            }}
                        >
                            {status}
                        </div>
                        <div>
                            <Button variant="destructive">
                                <Trash2></Trash2>
                            </Button>
                        </div>
                    </div>
                </div>
            ))}

            <Separator className="my-2"></Separator>
            <div className="flex justify-end mt-4">
                <h3>
                    <span className="font-semibold">Tổng: </span>
                    <span className="text-primary font-semibold text-lg">
                        {formatMoneyVND(total)}
                    </span>
                </h3>
            </div>
        </div>
    );
};

export default OrderCard;

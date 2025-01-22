import Ratting from "@/components/ui/ratting";
import { formatMoneyVND } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

type Props = {};

const ProductSearchCard = ({}: Props) => {
    const navigation = useNavigate();
    return (
        <div
            onClick={() =>
                navigation({
                    to: "/products/$productId",
                    params: { productId: "1" },
                })
            }
            className="w-[200px] rounded-t-xl  hover:shadow-lg cursor-pointer my-5 transition-all"
        >
            <div className="w-full aspect-square overflow-hidden">
                <img
                    className="size-full object-cover"
                    src="https://img.lazcdn.com/g/p/deb8e84d2577bd99eee8a589e9908af0.png_400x400q80.png_.avif"
                    alt=""
                />
            </div>
            <div className="p-4 pt-2">
                <p className="line-clamp-2 text-sm font-semibold ">
                    Thùng Sữa chua uống Probi Ít Đường chai 130ml -24 chai/Thùng
                    Yogurt
                </p>
                <div className="flex justify-start gap-1 items-center">
                    <Ratting
                        value={3.5}
                        readOnly
                        className="my-1"
                        size={60}
                    ></Ratting>
                    <span className="text-muted-foreground text-xs">(100)</span>
                </div>
                <p className=" font-semibold text-primary">
                    {formatMoneyVND(100000)}
                </p>
                <p className="text-xs text-muted-foreground line-through">
                    {" "}
                    {formatMoneyVND(100000)}
                </p>
            </div>
        </div>
    );
};

export default ProductSearchCard;

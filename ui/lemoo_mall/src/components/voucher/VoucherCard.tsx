import { collectVoucher } from "@/api/voucher.api";
import { StoreVoucherResponse } from "@/common/type/voucher.type";
import { useMutation } from "@tanstack/react-query";
import { Gift, Info } from "lucide-react";
import moment from "moment";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

type Props = {
    voucher: StoreVoucherResponse;
};

const VoucherCard = ({ voucher }: Props) => {
    const [collected, setCollected] = useState<boolean>(false);

    const { mutateAsync: collectVoucherMutation, isPending } = useMutation({
        mutationKey: ["collect-voucher", voucher.id],
        mutationFn: () => collectVoucher(voucher.id),
    });

    const handleCollectVoucher = async () => {
        try {
            await collectVoucherMutation();
            setCollected(true);
            toast.success("Thu thập voucher thành công");
        } catch (error: any) {
            toast.error(error);
        }
    };

    const getVoucherBadge = (type: string) => {
        switch (type) {
            case "STORE_FOLLOWER_VOUCHER":
                return {
                    label: "Follower",
                    className: "bg-blue-100 text-blue-800",
                };
            case "FIRST_PURCHASE":
                return {
                    label: "New User",
                    className: "bg-green-100 text-green-800",
                };
            case "REGULAR_VOUCHER":
            default:
                return {
                    label: "Regular",
                    className: "bg-gray-100 text-gray-800",
                };
        }
    };

    const getDiscountText = (discountType: string, discountValue: number) => {
        if (discountType === "PERCENTAGE") {
            return `Giảm ${discountValue}% giá trị đơn hàng`;
        } else if (discountType === "FIXED_AMOUNT") {
            return `Giảm ${discountValue.toLocaleString()} VNĐ`;
        }
        return "Giảm giá đặc biệt";
    };

    const badge = getVoucherBadge(voucher.type);

    return (
        <div className="p-[1px] overflow-hidden rounded-xl">
            <div className="relative px-4 py-2 rounded-xl border-2 border-primary dark:bg-slate-800 w-[300px] select-none">
                <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-primary">
                        Voucher
                    </h4>
                    <div className="flex justify-end items-center gap-2">
                        <span
                            className={`text-xs font-medium px-2 py-1 rounded-full ${badge.className}`}
                        >
                            {badge.label}
                        </span>
                        <p className="text-xs text-muted-foreground">
                            Hết hạn:{" "}
                            {moment(voucher.periodEndTime).format("DD/MM/YYYY")}
                        </p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="rounded-full flex justify-center items-center cursor-pointer">
                                    <Info className="text-primary" size={14} />
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                <h3 className="text-lg font-semibold">
                                    {voucher.name}
                                </h3>
                                <p>
                                    Loại: {badge.label} <br />
                                    Giảm giá:{" "}
                                    {getDiscountText(
                                        voucher.discountType,
                                        voucher.discountValue
                                    )}{" "}
                                    <br />
                                    Thời gian bắt đầu:{" "}
                                    {moment(voucher.periodStartTime).format(
                                        "DD/MM/YYYY"
                                    )}{" "}
                                    <br />
                                    Thời gian kết thúc:{" "}
                                    {moment(voucher.periodEndTime).format(
                                        "DD/MM/YYYY"
                                    )}{" "}
                                    <br />
                                    Điều kiện áp dụng:{" "}
                                    {voucher.type === "FIRST_PURCHASE"
                                        ? "Chỉ dành cho lần mua đầu tiên"
                                        : "Áp dụng cho mọi đơn hàng"}
                                </p>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="w-full border-b-2 border-b-primary my-1 border-dashed"></div>

                <div>
                    <div className="flex justify-start items-center gap-2">
                        <Gift className="text-primary" size={28} />
                        <h3 className="font-semibold line-clamp-2 max-w-[80%]">
                            {voucher.name}
                        </h3>
                    </div>
                    <div className="flex justify-between items-start">
                        <p className="text-xs text-muted-foreground mt-1">
                            {getDiscountText(
                                voucher.discountType,
                                voucher.discountValue
                            )}
                        </p>
                        <Button
                            disabled={isPending || collected}
                            onClick={handleCollectVoucher}
                        >
                            Thu thập
                        </Button>
                    </div>
                </div>
                <span className="absolute left-0 top-[50%] -translate-y-[50%] -translate-x-[65%] bg-white dark:bg-slate-800 size-[30px] rounded-full border-2 border-primary"></span>
                <span className="absolute right-0 top-[50%] -translate-y-[50%] translate-x-[65%] bg-white dark:bg-slate-800 size-[30px] rounded-full border-2 border-primary"></span>
            </div>
        </div>
    );
};

export default VoucherCard;

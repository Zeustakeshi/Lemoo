import { Gift, Info } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";

type Props = {};

const VoucherCard = (props: Props) => {
    return (
        <div className="p-[1px] overflow-hidden rounded-xl">
            <div className="relative  px-4 py-2 rounded-xl border-2 border-primary dark:bg-slate-800 w-[300px] select-none">
                <div className="flex justify-between items-center ">
                    <h4 className="text-lg font-semibold text-primary">
                        Voucher
                    </h4>
                    <div className="flex justify-end items-center gap-1">
                        <p className="text-xs text-muted-foreground">
                            Ngày hết hạn: 20/1/2025
                        </p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <div className="rounded-full flex justify-center items-center cursor-pointer">
                                    <Info className="text-primary" size={14} />
                                </div>
                            </DialogTrigger>
                            <DialogContent>
                                The React Framework – created and maintained by
                                @vercel. Thông tin khuyến mãi
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
                <div className="w-full border-b-2 border-b-primary my-1 border-dashed "></div>

                <div className="">
                    <div className="flex justify-start items-center gap-2">
                        <Gift className="text-primary" size={28} />
                        <h3 className="font-semibold line-clamp-2 max-w-[80%]">
                            Tặng bạn theo dõi
                        </h3>
                    </div>
                    <div className="flex justify-between items-start">
                        <p className="text-xs text-muted-foreground mt-1">
                            Giảm 15% giá trị đơn hàng
                        </p>
                        <Button>Thu thập</Button>
                    </div>
                </div>
                <span className="absolute left-0  top-[50%] -translate-y-[50%] -translate-x-[65%] bg-white dark:bg-slate-800 size-[30px] rounded-full  border-2 border-primary"></span>
                <span className="absolute right-0 top-[50%] -translate-y-[50%] translate-x-[65%] bg-white dark:bg-slate-800 size-[30px] rounded-full  border-2 border-primary"></span>
            </div>
        </div>
    );
};

export default VoucherCard;

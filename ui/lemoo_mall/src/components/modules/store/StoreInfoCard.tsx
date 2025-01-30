import { Button } from "@/components/ui/button";

type Props = {};

const StoreInfoCard = (props: Props) => {
    return (
        <div className="h-full  y relative !z-1 bg-white dark:bg-slate-800 shadow-md px-3 py-2 flex justify-between  w-[400px]">
            <div className="flex justify-start items-start flex-1  gap-2 ">
                <div className="h-full aspect-square overflow-hidden">
                    <img
                        className="size-full object-cover"
                        src="https://picsum.photos/200/300?grayscale"
                        alt=""
                    />
                </div>
                <div className="space-y-1 ">
                    <p className="text-xl font-semibold ">Lemoo store</p>
                    <p className="text-sm text-muted-foreground">
                        1000 Theo dõi
                    </p>
                </div>
            </div>
            <div>
                <Button>Theo dõi</Button>
            </div>
        </div>
    );
};

export default StoreInfoCard;

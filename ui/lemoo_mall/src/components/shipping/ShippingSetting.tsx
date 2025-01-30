import { MapPin } from "lucide-react";
import { Button } from "../ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../ui/dialog";
import { Separator } from "../ui/separator";

type Props = {};

const ShippingSetting = ({}: Props) => {
    return (
        <div>
            <div className="flex justify-between items-center">
                <h3 className="font-semibold text-lg">Thông tin vận chuyển</h3>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button variant="link">Thay đổi</Button>
                    </DialogTrigger>
                    <DialogContent className="h-min max-h-[500px]">
                        <DialogHeader>
                            <DialogTitle className="mb-2">
                                Thông tin vận chuyển
                            </DialogTitle>
                            <Separator className="my-3"></Separator>
                        </DialogHeader>
                        <div>
                            <div></div>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex justify-start items-center gap-4 my-2">
                <MapPin size={16} />
                <p className="text-sm text-muted-foreground">
                    Số 06, Trần Văn Ơn, Phú Hòa, Thủ Dầu Một, Bình Dương
                </p>
            </div>
        </div>
    );
};

export default ShippingSetting;

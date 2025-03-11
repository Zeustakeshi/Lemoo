import { getUserAddress } from "@/api/address.api";
import { db } from "@/db";
import { AddressModel } from "@/db/models/address.model";
import { useQuery } from "@tanstack/react-query";
import { MapPin } from "lucide-react";
import { useEffect, useState } from "react";
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
    const [addresses, setAddresses] = useState<AddressModel[]>([]);

    useEffect(() => {
        (async () => {
            const adds = await db.addresses.toArray();
            setAddresses(adds);
        })();
    }, []);

    const { data } = useQuery({
        queryKey: ["get-user-address"],
        queryFn: getUserAddress,
    });

    useEffect(() => {
        if (!data || data.content.length == 0) return;
        (async () => {
            await db.addresses.bulkAdd(
                data.content.map((address) => ({
                    id: address.id,
                    isDefault: address.isDefault,
                    address: {
                        detail: address.address.detail,
                        district: address.address.district,
                        province: address.address.province,
                        ward: address.address.ward,
                        fullAddress: address.address.fullAddress,
                    },
                    recipientName: address.recipientName,
                    recipientPhone: address.recipientPhone,
                    type: address.type,
                }))
            );
            const adds = await db.addresses.toArray();
            setAddresses(adds);
        })();
    }, [data]);

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
                            {addresses.map((address) => (
                                <div>{address.address.fullAddress}</div>
                            ))}
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
            <div className="flex justify-start items-center gap-4 my-2">
                <MapPin size={16} />
                {addresses.length == 0 && <h4>Không có địa chỉ nào</h4>}
                {addresses.length > 0 ? (
                    addresses.find((address) => address.isDefault)?.address
                        .fullAddress
                ) : (
                    <>Bạn chưa chọn địa chỉ mặc định</>
                )}
            </div>
        </div>
    );
};

export default ShippingSetting;

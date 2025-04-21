import { getAllVoucherByStoreId } from "@/api/voucher.api";
import { useQuery } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import VoucherCard from "./VoucherCard";

type Props = {
    storeId: string;
};

const VoucherList = ({ storeId }: Props) => {
    const { data } = useQuery({
        queryKey: ["store-detail", storeId],
        queryFn: () => getAllVoucherByStoreId(storeId),
    });

    if (!data) return <div>đang tải voucher</div>;

    return (
        <div>
            <div className="w-full flex justify-between items-center mb-3">
                <h4 className="text-xl font-semibold ">Khuyến mãi cho bạn</h4>
                <Button variant="link">Xem tất cả</Button>
            </div>
            <div className="">
                <Carousel className="w-full ">
                    <CarouselContent className="">
                        {data?.content?.map((voucher, index) => (
                            <CarouselItem
                                className="w-max max-w-max"
                                key={index}
                            >
                                <VoucherCard voucher={voucher}></VoucherCard>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};

export default VoucherList;

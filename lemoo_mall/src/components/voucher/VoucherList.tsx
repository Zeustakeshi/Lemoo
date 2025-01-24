import { Button } from "../ui/button";
import { Carousel, CarouselContent, CarouselItem } from "../ui/carousel";
import VoucherCard from "./VoucherCard";

type Props = {};

const VoucherList = ({}: Props) => {
    return (
        <div>
            <div className="w-full flex justify-between items-center mb-3">
                <h4 className="text-xl font-semibold ">Khuyến mãi cho bạn</h4>
                <Button variant="link">Xem tất cả</Button>
            </div>
            <div className="">
                <Carousel className="w-full ">
                    <CarouselContent className="">
                        {Array.from({ length: 2 }).map((_, index) => (
                            <CarouselItem
                                className="w-max max-w-max"
                                key={index}
                            >
                                <VoucherCard></VoucherCard>
                            </CarouselItem>
                        ))}
                    </CarouselContent>
                </Carousel>
            </div>
        </div>
    );
};

export default VoucherList;

import { createFileRoute } from "@tanstack/react-router";
import VoucherCard from "../../../modules/promotion/voucher/VoucherCard";
export const Route = createFileRoute("/promotion/vouchers/")({
    component: RouteComponent,
});

function RouteComponent() {
    return (
        <div className="p-5 bg-white rounded-md shadow-sm  grid grid-cols-3 gap-2">
            <VoucherCard
                to="/promotion/vouchers/regular"
                name="Mã giảm giá"
                description="Tăng lượng truy cập và doanh số"
                iconUrl="https://gcp-img.slatic.net/lazada/302b4701-ad43-425a-8659-3cacf6a6bf21_SG-60-60.svg"
            />

            <VoucherCard
                to="/promotion/vouchers/store-follower"
                name="Mã giảm giá theo dõi đơn hàng"
                description="Tạo mã giảm giá để tăng lượng người theo dõi cửa hàng của bạn"
                iconUrl="https://gcp-img.slatic.net/lazada/347ecb72-9802-45a9-9e1c-f2610997461c_SG-60-60.svg"
            />

            <VoucherCard
                to="/promotion/vouchers/freeshiping"
                name="Miễn Phí Vận Chuyển"
                description="Tạo khuyến mãi Miễn phí vận chuyển để nổi bật hơn so với các gian hàng khác"
                iconUrl="https://gcp-img.slatic.net/lazada/472fabf0-ade2-4299-934e-9fc80fd37ad1_SG-60-60.svg"
            />
        </div>
    );
}

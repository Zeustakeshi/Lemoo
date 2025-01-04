import AnimatedTyping from "@/components/ui/AnimatedTyping";
import { Feather } from "@expo/vector-icons";
import React from "react";
import { View } from "react-native";

type Props = {};

const searchTextSuggestions = [
    "Tìm kiếm sản phẩm yêu thích của bạn",
    "Khám phá sản phẩm hot hôm nay!",
    "Mua sắm thả ga - không lo về giá",
    "Ưu đãi đặc biệt đang chờ bạn",
    "Sản phẩm làm đẹp bạn không thể bỏ qua",
    "Giải pháp công nghệ thông minh cho ngôi nhà bạn",
    "Đừng bỏ lỡ các ưu đãi giờ vàng!",
    "Thời trang cho mọi phong cách",
    "Hành lý hoàn hảo cho chuyến đi tiếp theo của bạn",
    "Trang trí nhà cửa với phong cách riêng",
    "Gợi ý quà tặng cho người thân yêu",
    "Khám phá siêu phẩm mới nhất",
    "Giảm giá khủng – Mua ngay kẻo lỡ!",
    "Mọi thứ bạn cần, tất cả ở đây!",
    "Thêm niềm vui cho cuộc sống của bạn",
    "Mua sắm thông minh – Tiết kiệm tối đa",
    "Chào mừng bạn đến với thế giới ưu đãi!",
    "Áo polo nam",
    "Bàn phím cơ",
    "Tai nghe không dây",
    "Điện thoại thông minh",
    "Laptop gaming",
    "Chuột không dây",
    "Máy lọc không khí",
    "Đồng hồ thông minh",
    "Tủ lạnh mini",
    "Máy hút bụi robot",
    "Camera hành trình",
    "Giày thể thao nữ",
    "Bình giữ nhiệt",
    "Loa Bluetooth",
    "Balo du lịch",
    "Máy sấy tóc",
    "Máy pha cà phê",
    "Bàn làm việc gỗ",
    "Sách kỹ năng sống",
    "Kính râm thời trang",
    "Bộ dụng cụ sửa chữa",
    "Đèn LED bàn học",
    "Quạt điều hòa",
];

const ProductSearch = ({}: Props) => {
    return (
        <View className="shadow-2xl shadow-slate-500 flex-1 relative  pr-8 rounded-xl bg-slate-50 overflow-hidden">
            <View className="px-4 py-4 rounded-xl bg-slate-50 w-full">
                <AnimatedTyping
                    texts={searchTextSuggestions}
                    animatedTime={50}
                    intervalTime={4000}
                    className="text-sm text-muded line-clamp-1"
                ></AnimatedTyping>
            </View>
            <View className="absolute top-2 right-2 size-10 rounded-xl flex justify-center items-center">
                <Feather
                    name="camera"
                    size={18}
                    className="text-primary"
                    color="#004CFF"
                />
            </View>
        </View>
    );
};

export default ProductSearch;

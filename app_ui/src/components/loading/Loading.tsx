import AnimatedTyping from "@/components/ui/AnimatedTyping";
import LottieView from "lottie-react-native";
import React from "react";
import { View } from "react-native";
import AppWrapper from "../wrapper/AppWrapper";

const loadingTexts = [
    "Đang tải dữ liệu, hãy giữ vững niềm tin!",
    "Hôm nay trời đẹp, chúng tôi đang gắng hết sức!",
    "Nếu bạn đang đợi, chúng tôi cũng đang chạy nước rút!",
    "Chỉ mất vài giây nữa thôi… hoặc lâu hơn chút, ai mà biết được?",
    "Dữ liệu của bạn đang được yêu thương và chăm sóc.",
    "Chờ chút nha, máy chủ cũng cần cà phê sáng!",
    "Bạn có nghe thấy tiếng dữ liệu đang nhảy múa không?",
    "Dữ liệu đang trên đường, tránh xe tải nhé!",
    "Nếu bạn thấy lâu quá, hãy thử một điệu nhảy chờ đợi xem sao!",
    "Mọi thứ đang được gói gọn, chờ chút để ship tới bạn nhé!",
    "Cảm ơn vì kiên nhẫn, bạn chính là người hùng của ngày hôm nay!",
    "Chúng tôi đang đếm ngược: 3… 2… 1… à, chưa đâu, đợi thêm tí nhé!",
    "Dữ liệu đang qua cầu, xin đừng vội bấm F5!",
    "Nếu thấy lâu, thử kể một câu chuyện cười cho người bên cạnh đi!",
    "Dữ liệu đang lạc đường GPS, chờ chút để tìm đúng hướng nhé!",
    "Đang tải dữ liệu, chỉ còn 99% nữa thôi!",
    "Máy chủ nói: 'Lẹ rồi mà!'",
    "Hệ thống đang vắt chân chạy, bạn đừng hối nha!",
    "Đang tìm dữ liệu... Chắc nó đi chơi xa!",
    "Chờ chút nha, code của tụi mình đang tìm ý nghĩa của cuộc sống.",
    "Đừng lo, dữ liệu của bạn chưa bị người ngoài hành tinh bắt cóc đâu!",
    "Đang nhờ chị Google tìm dữ liệu giùm, đợi xíu nha!",
    "Hơi lâu nhưng đáng giá! (Chúng tôi hy vọng thế!)",
    "Tập yoga thở sâu trong lúc chờ, thử chưa?",
    "Dữ liệu đang từ từ bò đến, đừng đánh thức nó nhé!",
    "Đường vào tim dữ liệu hơi xa, đợi chút thôi nha!",
    "Đang kiểm tra tốc độ ánh sáng để tải dữ liệu cho bạn!",
    "Chậm là phong cách, nhưng chúng tôi không cố ý đâu!",
    "Bạn có biết? Chúng tôi đang cố không làm rơi dữ liệu!",
    "Nếu dữ liệu của bạn là pizza, nó sắp tới nơi rồi!",
];

const loadingImagePaths = [
    require("../../assets/images/animations/loader1.json"),
    require("../../assets/images/animations/loader2.json"),
];

const randomImage = () => {
    return loadingImagePaths[
        Math.floor(Math.random() * loadingImagePaths.length)
    ];
};

type Props = {};

const Loading = ({}: Props) => {
    return (
        <AppWrapper className="">
            <View className="flex-1 justify-center items-center">
                <LottieView
                    style={{
                        width: 300,
                        height: 300,
                    }}
                    source={randomImage()}
                    autoPlay
                    loop
                />
                <AnimatedTyping
                    className="text-center text-slate-600 text-sm font-semibold"
                    animatedTime={50}
                    intervalTime={5000}
                    texts={loadingTexts}
                ></AnimatedTyping>
            </View>
        </AppWrapper>
    );
};

export default Loading;

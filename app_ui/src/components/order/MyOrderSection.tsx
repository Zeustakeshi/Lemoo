import React from "react";
import {
    Dimensions,
    Image,
    ImageSourcePropType,
    Text,
    View,
} from "react-native";
import Button from "../ui/Button";

type Props = {};
const { width } = Dimensions.get("screen");

const MyOrderSection = (props: Props) => {
    return (
        <View className="flex-1 px-1">
            <View className="flex-row justify-between items-center mb-8">
                <Text className="font-semibold text-lg">Đơn hàng của tôi</Text>
                <Button size="icon" variant="ghost">
                    <Text className="text-sm text-slate-600">
                        Xem tất cả đơn hàng
                    </Text>
                </Button>
            </View>
            <View className="flex-row justify-center items-center gap-2">
                <OrderItem
                    iconSource={require("@/assets/images/icons/order-wallet.png")}
                    to="/"
                    label="Chờ thanh toán"
                ></OrderItem>

                <OrderItem
                    iconSource={require("@/assets/images/icons/order-time.png")}
                    to="/"
                    label="Chờ vận chuyển"
                ></OrderItem>

                <OrderItem
                    iconSource={require("@/assets/images/icons/order-ship.png")}
                    to="/"
                    label="Chờ giao hàng"
                ></OrderItem>

                <OrderItem
                    iconSource={require("@/assets/images/icons/order-comment.png")}
                    to="/"
                    label="Chưa đánh giá"
                ></OrderItem>
                <OrderItem
                    iconSource={require("@/assets/images/icons/order-return.png")}
                    to="/"
                    label="Trả hàng & Đã hủy"
                ></OrderItem>
            </View>
        </View>
    );
};

type OrderItemProps = {
    label: string;
    to: string;
    iconSource: ImageSourcePropType;
};

const OrderItem = ({ label, to, iconSource }: OrderItemProps) => {
    return (
        <Button className="size-[60] p-2" variant="ghost" size="icon">
            <View className="size-[40]">
                <Image
                    className="w-full h-full"
                    source={iconSource}
                    resizeMode="contain"
                ></Image>
            </View>
            <Text className="text-xs text-center text-slate-500 mt-1 ">
                {label}
            </Text>
        </Button>
    );
};

export default MyOrderSection;

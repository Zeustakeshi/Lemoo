import Avatar, { AvatarImage } from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import React from "react";
import { Dimensions, Text, View } from "react-native";

type Props = {};

const { height } = Dimensions.get("screen");

const ProductFooter = (props: Props) => {
    return (
        <View className="bg-white z-10  left-0 right-0  flex-row gap-3 px-4 py-1 border-t border-slate-100 ">
            <View className=" justify-start items-center  gap-2 flex-row">
                <Button variant="ghost" size="icon">
                    <Avatar size={24}>
                        <AvatarImage
                            source={{
                                uri: "https://img.lazcdn.com/g/ff/kf/S2e59d4473ac34d39821ee87e826565d5a.jpg_720x720q80.jpg_.webp",
                            }}
                        ></AvatarImage>
                    </Avatar>
                    <Text className="text-xs text-slate-700">Cửa hàng</Text>
                </Button>
            </View>
            <View className="flex-1 justify-end items-center gap-2 flex-row">
                <Button
                    variant="ghost"
                    style={{ backgroundColor: "#f43f5e" }}
                    className="!bg-rose-500 flex-1"
                >
                    <Text className="text-white text-sm font-semibold">
                        Mua ngay
                    </Text>
                </Button>
                <Button className="flex-1">
                    <Text className="text-white text-sm font-semibold">
                        Thêm vào giỏ
                    </Text>
                </Button>
            </View>
        </View>
    );
};

export default ProductFooter;

import { cn } from "@/lib/cn";
import { formatMoneyVND } from "@/lib/utils";
import { AntDesign } from "@expo/vector-icons";
import React from "react";
import { Image, Text, View } from "react-native";

type Props = {
    id: string;
    name: string;
    thumbnail: string;
    originPrice: number;
    promotionPrice: number;
    ratting: number;
    rattingCount: number;
    totalSold: number;
    className?: string;
};

const ProductCard = ({
    id,
    name,
    thumbnail,
    originPrice,
    promotionPrice,
    ratting,
    rattingCount,
    totalSold,
    className,
}: Props) => {
    return (
        <View className={cn(" rounded-xl bg-white shadow-xl", className)}>
            <View className="aspect-square w-full max-w-full rounded-md ">
                <Image
                    className="w-full h-full object-cover"
                    source={{
                        uri: "https://img.lazcdn.com/g/p/21655c8edd3c7ad1f14a5ce37c1a5bb3.jpg_720x720q80.jpg_.webp",
                    }}
                ></Image>
            </View>
            <View className="pb-6 pt-3 px-3">
                <Text className="my-1 font-semibold " numberOfLines={1}>
                    {name}
                </Text>
                <Text className="text-primary font-semibold mt-1 mb-2">
                    {formatMoneyVND(promotionPrice)}
                </Text>
                <View className="flex-row w-full justify-between ">
                    <Text className="text-xs text-slate-400 font-semibold ">
                        {ratting}{" "}
                        <AntDesign name="star" size={10} color="#eab308" /> (
                        {rattingCount || 0})
                    </Text>
                    <Text className="text-xs text-slate-400 font-semibold">
                        {totalSold} Đã bán
                    </Text>
                </View>
            </View>
        </View>
    );
};

export default ProductCard;

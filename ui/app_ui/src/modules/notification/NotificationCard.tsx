import { cn } from "@/lib/cn";
import { AntDesign } from "@expo/vector-icons";
import React, { ReactNode } from "react";
import { Dimensions, Image, Text, View } from "react-native";

type Props = {
    icon?: ReactNode;
    iconColor?: string;
    image?: string;
    title: string;
    description: string;
    to: string;
    descriptionLine?: number;
};
const { width } = Dimensions.get("window");
const NotificationCard = ({
    icon,
    title,
    description,
    to,
    descriptionLine = 1,
    iconColor = "#f1f5f9",
    image,
}: Props) => {
    return (
        <View
            style={{ width: width * 0.92 }}
            className=" flex-row justify-start items-start px-2 py-3 gap-x-3 border-b border-b-slate-100  overflow-hidden"
        >
            {icon && (
                <View
                    className={cn(
                        "p-3 flex-row justify-center items-center rounded-md border border-slate-100 "
                    )}
                    style={{
                        borderColor: iconColor,
                    }}
                >
                    {icon}
                </View>
            )}

            {image && (
                <View className="size-[50] rounded-md overflow-hidden">
                    <Image
                        className="w-full h-full object-cover"
                        source={{ uri: image }}
                    ></Image>
                </View>
            )}
            <View className="">
                <Text className=" font-semibold mb-1">{title}</Text>
                <Text
                    style={{ width: width * 0.65 }}
                    className=" text-sm text-muded "
                    numberOfLines={descriptionLine}
                >
                    {description}
                </Text>
            </View>
            <View>
                <AntDesign name="right" size={14} color="#94a3b8" />
            </View>
        </View>
    );
};

export default NotificationCard;

import { cn } from "@/lib/cn";
import { Link } from "expo-router";
import React, { ReactNode } from "react";
import { Dimensions, Text, View } from "react-native";

type Props = {
    children: ReactNode;
    title?: string;
    linkLabel?: string;
    to?: string;
    className?: string;
};

const { width } = Dimensions.get("window");
const NotificationGroup = ({
    children,
    title,
    className,
    linkLabel,
    to,
}: Props) => {
    return (
        <View style={{ width: width * 0.9 }}>
            <View className="flex-row items-center justify-between gap-2">
                {title && (
                    <Text className="font-semibold my-2 mx-1">{title}</Text>
                )}
                {linkLabel && to && (
                    <Link className="text-primary text-sm" href={to as any}>
                        {linkLabel}
                    </Link>
                )}
            </View>
            <View className={cn("my-2", className)}>{children}</View>
        </View>
    );
};

export default NotificationGroup;

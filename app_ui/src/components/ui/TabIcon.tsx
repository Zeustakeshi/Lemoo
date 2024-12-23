import { cn } from "@/lib/cn";
import React from "react";
import { View } from "react-native";
type Props = {
    Icon: any;
    focused: boolean;
    iconName: string;
    label: string;
    color: string;
    size: number;
};

const TabIcon = ({
    Icon,
    focused,
    iconName,
    label,
    color,
    size = 20,
}: Props) => {
    return (
        <View
            className={cn(
                "flex-col justify-center items-center top-[8] absolute rounded-full"
            )}
        >
            <Icon name={iconName} size={size} color={color}></Icon>
        </View>
    );
};

export default TabIcon;

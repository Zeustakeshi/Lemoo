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

const TabIcon = ({ Icon, focused, iconName, label, color, size }: Props) => {
    return (
        <View className="flex-col justify-center items-center">
            <Icon name={iconName} size={size} color={color}></Icon>
        </View>
    );
};

export default TabIcon;

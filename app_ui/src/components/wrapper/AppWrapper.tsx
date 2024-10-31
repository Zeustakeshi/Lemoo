import React, { ReactNode } from "react";
import { View } from "react-native";

type Props = {
    children?: ReactNode;
    className?: string;
};

const AppWrapper = ({ children, className }: Props) => {
    return (
        <View className={`flex-1 bg-white p-4 ${className}`}>{children}</View>
    );
};

export default AppWrapper;

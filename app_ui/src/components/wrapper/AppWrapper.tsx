import React, { ReactNode } from "react";
import { Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
    children?: ReactNode;
    className?: string;
};
const { width } = Dimensions.get("window");
const AppWrapper = ({ children, className }: Props) => {
    return (
        <SafeAreaView
            style={{
                maxWidth: width,
                width,
            }}
            className={`flex-1  bg-white p-4 ${className}`}
        >
            {children}
        </SafeAreaView>
    );
};

export default AppWrapper;

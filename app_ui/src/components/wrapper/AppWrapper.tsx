import { cn } from "@/lib/cn";
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
        <SafeAreaView className={cn("flex-1 bg-white p-4", className)}>
            {children}
        </SafeAreaView>
    );
};

export default AppWrapper;

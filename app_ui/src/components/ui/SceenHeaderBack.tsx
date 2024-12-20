import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import { View } from "react-native";
import Button from "./Button";

type Props = {
    className?: string;
    children: ReactNode;
};

const SceenHeaderBack = ({ className, children }: Props) => {
    return (
        <View
            className={cn(
                "flex-row justify-start items-center gap-2 pb-3 border-b border-b-slate-200",
                className
            )}
        >
            <Button onPress={() => router.back()} variant="link" size="icon">
                <Ionicons name="chevron-back" size={24} color="black" />
            </Button>
            {children}
        </View>
    );
};

export default SceenHeaderBack;

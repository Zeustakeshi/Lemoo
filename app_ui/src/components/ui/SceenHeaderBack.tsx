import { cn } from "@/lib/cn";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { ReactNode } from "react";
import { Text, View } from "react-native";
import Button from "./Button";

type Props = {
    className?: string;
    children: ReactNode;
    showBackButon?: boolean;
};

const SceenHeaderBack = ({
    className,
    children,
    showBackButon = true,
}: Props) => {
    return (
        <View
            className={cn(
                "flex-row justify-start items-center gap-2 pb-3 border-b border-b-slate-200",
                className
            )}
        >
            {showBackButon && (
                <Button
                    onPress={() => router.back()}
                    variant="link"
                    size="icon"
                >
                    <Ionicons name="chevron-back" size={24} color="black" />
                </Button>
            )}
            <Text className="text-xl font-semibold">{children}</Text>
        </View>
    );
};

export default SceenHeaderBack;

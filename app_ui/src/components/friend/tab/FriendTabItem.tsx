import Button from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { router, usePathname } from "expo-router";
import React from "react";
import { Text } from "react-native";

type Props = {
    to: string;
    label: string;
};

const FriendTabItem = ({ to, label }: Props) => {
    const path = usePathname();

    return (
        <Button
            onPress={() => {
                router.push(`/(tabs)/friend${to}` as any);
            }}
            className="flex-1"
            variant={path.includes(to) ? "default" : "secondary"}
            size="sm"
        >
            <Text
                className={cn({
                    "text-primary": !path.includes(to),
                    "text-white": path.includes(to),
                })}
            >
                {label}
            </Text>
        </Button>
    );
};

export default FriendTabItem;

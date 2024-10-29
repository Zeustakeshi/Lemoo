import { cn } from "@/lib/cn";
import { useRouter } from "expo-router";
import React, { ReactNode } from "react";
import { Pressable, PressableProps, View } from "react-native";

type ButtonVariant = "default" | "secondary" | "outline" | "ghost" | "link";
type ButtonSize = "lg" | "md" | "sm" | "icon";

type Props = {
    children?: ReactNode;
    variant?: ButtonVariant;
    size?: ButtonSize;
    className?: string;
} & PressableProps &
    React.RefAttributes<View>;

const Button = ({
    children,
    variant = "default",
    size = "md",
    className,
    disabled,
    ...props
}: Props) => {
    const router = useRouter();

    return (
        <Pressable
            className={cn(
                "rounded-xl px-3 py-5 w-min justify-center items-center",
                {
                    "bg-primary ": variant === "default",
                    "bg-secondary": variant === "secondary",
                    "!px-1 !py-1": size === "icon" || variant === "link",
                    "!bg-primary/70": disabled,
                },
                className
            )}
            {...props}
        >
            {children}
        </Pressable>
    );
};

export default Button;
